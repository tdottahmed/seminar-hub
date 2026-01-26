<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Quiz;
use App\Models\QuizAttempt;
use App\Models\Question;
use App\Models\Answer;
use Inertia\Inertia;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Support\Str;

class QuizController extends Controller
{
    public function show(Quiz $quiz)
    {
        if (!$quiz->is_published) {
            abort(404, 'Quiz not found or not published.');
        }

        // Generate QR Code for this page
        $qrCode = QrCode::size(200)->generate(route('quiz.public.show', $quiz->id));

        return Inertia::render('Public/Quiz/Welcome', [
            'quiz' => $quiz->load('event'),
            'qrCode' => $qrCode, // Pass generated SVG/string to view
        ]);
    }

    public function join(Request $request, Quiz $quiz)
    {
        $validated = $request->validate([
            'participant_name' => 'required|string|max:255',
            'participant_email' => 'required|email',
        ]);

        // Check if user already has an active attempt or completed one?
        // For now, let's create a new attempt
        
        $attempt = $quiz->attempts()->create([
            'participant_name' => $validated['participant_name'],
            'participant_email' => $validated['participant_email'],
            'started_at' => now(),
            'status' => 'in_progress',
        ]);

        return redirect()->route('quiz.public.attempt', ['quiz' => $quiz->id, 'attempt_id' => $attempt->id]);
    }

    public function attempt(Request $request, Quiz $quiz)
    {
        $attemptId = $request->query('attempt_id');
        $attempt = QuizAttempt::findOrFail($attemptId);

        if ($attempt->quiz_id !== $quiz->id) {
            abort(403);
        }

        if ($attempt->status === 'completed') {
            return redirect()->route('quiz.public.result', ['quiz' => $quiz->id, 'attempt_id' => $attempt->id]);
        }

        $questions = $quiz->questions()->orderBy('sort_order')->get()->map(function ($q) {
            return [
                'id' => $q->id,
                'question_text' => $q->question_text,
                'type' => $q->type,
                'options' => json_decode($q->options ?? '[]'),
                'points' => $q->points,
            ];
        });

        return Inertia::render('Public/Quiz/Attempt', [
             'quiz' => $quiz->only(['id', 'title', 'time_limit_minutes']),
             'attempt' => $attempt,
             'questions' => $questions
        ]);
    }

    public function submit(Request $request, Quiz $quiz)
    {
        $attempt = QuizAttempt::findOrFail($request->attempt_id);
        
        if ($attempt->status === 'completed') {
            return redirect()->route('quiz.public.result', ['quiz' => $quiz->id, 'attempt_id' => $attempt->id]);
        }

        $submittedAnswers = $request->answers; // Keyed by question_id
        $totalScore = 0;
        
        $questions = $quiz->questions; // Get all questions to verify answers

        foreach ($questions as $question) {
            $userAnswer = $submittedAnswers[$question->id] ?? null;
            $isCorrect = false;

            if ($question->type === 'multiple_choice' || $question->type === 'true_false') {
                if ($userAnswer === $question->correct_answer) {
                    $isCorrect = true;
                    $totalScore += $question->points;
                }
            }

            // Save Answer
            Answer::create([
                'quiz_attempt_id' => $attempt->id,
                'question_id' => $question->id,
                'answer_text' => $userAnswer,
                'is_correct' => $isCorrect,
                'points_awarded' => $isCorrect ? $question->points : 0
            ]);
        }

        $attempt->update([
            'completed_at' => now(),
            'score' => $totalScore,
            'status' => 'completed'
        ]);

        return redirect()->route('quiz.public.result', ['quiz' => $quiz->id, 'attempt_id' => $attempt->id]);
    }

    public function result(Request $request, Quiz $quiz)
    {
        $attempt = QuizAttempt::findOrFail($request->query('attempt_id'));

        return Inertia::render('Public/Quiz/Result', [
            'quiz' => $quiz->load('event'),
            'attempt' => $attempt,
            'score' => $attempt->score,
            'total_points' => $quiz->questions()->sum('points'),
        ]);
    }
}
