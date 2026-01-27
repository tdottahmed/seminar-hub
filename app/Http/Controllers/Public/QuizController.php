<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Quiz;
use App\Models\QuizAttempt;
use App\Models\Question;
use App\Models\Answer;
use Inertia\Inertia;
use Illuminate\Support\Str;

class QuizController extends Controller
{
    public function show(Quiz $quiz)
    {
        if (!$quiz->is_published) {
            abort(404, 'Quiz not found or not published.');
        }

        return Inertia::render('Public/Quiz/Welcome', [
            'quiz' => $quiz->load('event'),
            'quizUrl' => route('quiz.public.show', $quiz->id),
        ]);
    }

    public function join(Request $request, Quiz $quiz)
    {
        $validated = $request->validate([
            'participant_name' => 'required|string|max:255',
            'participant_email' => 'required|email|max:255',
            'participant_phone' => 'nullable|string|max:20',
        ]);

        // Check if user already has an active attempt
        $existingAttempt = $quiz->attempts()
            ->where('participant_email', $validated['participant_email'])
            ->where('status', 'in_progress')
            ->first();

        if ($existingAttempt) {
            return redirect()->route('quiz.public.attempt', ['quiz' => $quiz->id, 'attempt_id' => $existingAttempt->id]);
        }
        
        // Check if user already completed an attempt (if we want to limit to 1)
        // For now, allow re-attempts or handle based on logic. 
        // User said "Anyone can attempt once", so let's enforce single completion per email.
        $completedAttempt = $quiz->attempts()
            ->where('participant_email', $validated['participant_email'])
            ->where('status', 'completed')
            ->first();

        if ($completedAttempt) {
             return redirect()->route('quiz.public.result', ['quiz' => $quiz->id, 'attempt_id' => $completedAttempt->id])
                ->with('info', 'You have already completed this quiz.');
        }

        $attempt = $quiz->attempts()->create([
            'participant_name' => $validated['participant_name'],
            'participant_email' => $validated['participant_email'],
            'participant_phone' => $validated['participant_phone'] ?? null,
            'started_at' => now(),
            'status' => 'in_progress',
            'registration_id' => null, // Explicitly null for guest
        ]);

        // Logic to select questions based on total_questions config or time limit
        $totalQuestions = $quiz->total_questions ?? $quiz->time_limit_minutes ?? 10; // Default to 10 if nothing set
        
        $difficultyRatio = [
            'Easy' => 0.4,
            'Medium' => 0.3, 
            'Hard' => 0.3
        ];
        
        $selectedQuestionIds = collect();

        foreach ($difficultyRatio as $level => $ratio) {
            $count = round($totalQuestions * $ratio);
            $questions = $quiz->questions()
                ->where('level', $level)
                ->inRandomOrder()
                ->limit($count)
                ->pluck('id');
            
            $selectedQuestionIds = $selectedQuestionIds->merge($questions);
        }

        // If we extracted less than total (due to rounding or lack of questions), fill up with random others
        if ($selectedQuestionIds->count() < $totalQuestions) {
            $remainingCount = $totalQuestions - $selectedQuestionIds->count();
            $remainingQuestions = $quiz->questions()
                ->whereNotIn('id', $selectedQuestionIds)
                ->inRandomOrder()
                ->limit($remainingCount)
                ->pluck('id');
            
            $selectedQuestionIds = $selectedQuestionIds->merge($remainingQuestions);
        }
        
        // If still fewer (e.g. database has fewer questions than time limit), that's fine, we take what we have.
        // Or we could inadvertently have duplicates if we aren't careful, but pluck IDs ensures uniqueness in merge if doing right.
        // Actually merge on collection appends. Use unique().
        $selectedQuestionIds = $selectedQuestionIds->unique();

        $attempt->questions()->attach($selectedQuestionIds);

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

        // Fetch questions associated with this attempt
        $questions = $attempt->questions()->orderBy('sort_order')->get();

        // Fallback for legacy attempts or if something went wrong
        if ($questions->isEmpty()) {
             $questions = $quiz->questions()->orderBy('sort_order')->get();
        }

        $questions = $questions->map(function ($q) {
            return [
                'id' => $q->id,
                'question_text' => $q->question_text,
                'type' => $q->type,
                'options' => is_string($q->options) ? json_decode($q->options) : ($q->options ?? []),
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
        
        // Use questions from the attempt
        $questions = $attempt->questions; 
        
        // Fallback
        if ($questions->isEmpty()) {
            $questions = $quiz->questions;
        }

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
        
        // Calculate total points based on attempt's questions (or all if legacy)
        $questions = $attempt->questions;
        $totalPoints = $questions->isEmpty() 
            ? $quiz->questions()->sum('points') 
            : $questions->sum('points');

        return Inertia::render('Public/Quiz/Result', [
            'quiz' => $quiz->load('event'),
            'attempt' => $attempt,
            'score' => $attempt->score,
            'total_points' => $totalPoints,
        ]);
    }
}
