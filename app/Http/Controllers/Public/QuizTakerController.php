<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Event;
use App\Models\Quiz;
use App\Models\QuizAttempt;
use App\Models\Answer;
// already imported above
use Inertia\Inertia;

class QuizTakerController extends Controller
{
    public function show($slug, Quiz $quiz)
    {
        $event = Event::where('slug', $slug)->firstOrFail();
        
        if (!$quiz->is_published) {
            abort(404);
        }

        // Eager load questions but hide correct answers to prevent cheating
        $quiz->load(['questions' => function ($query) {
            $query->orderBy('sort_order');
        }]);

        // Hide correct answers
        $quiz->questions->makeHidden(['correct_answer']);

        return Inertia::render('QuizTaker', [
            'event' => $event,
            'quiz' => $quiz,
        ]);
    }

    public function store(Request $request, $slug, Quiz $quiz)
    {
        $validated = $request->validate([
            'answers' => 'required|array',
            'answers.*.question_id' => 'required|exists:questions,id',
            'answers.*.answer' => 'nullable', 
        ]);

        // Calculate score
        $score = 0;
        $totalPoints = 0;
        
        // We need to re-fetch questions with correct answers
        $questions = $quiz->questions()->get()->keyBy('id');

        foreach ($validated['answers'] as $submittedAnswer) {
            $question = $questions[$submittedAnswer['question_id']] ?? null;
            if ($question) {
                $isCorrect = false;
                // Simple string comparison for now. 
                // In real app, handle multiple choice vs text normalization.
                if ($question->correct_answer == $submittedAnswer['answer']) {
                    $score += $question->points;
                    $isCorrect = true;
                }
                $totalPoints += $question->points;
            }
        }

        // Store attempt (Linking to a dummy registration for now or user if logged in)
        // For this demo, we might skip full DB storage relation if user not logged in, 
        // or just return the score.
        // Let's just return the score for the frontend to display.

        return response()->json([
            'score' => $score,
            'total_points' => $totalPoints,
            'percentage' => $totalPoints > 0 ? ($score / $totalPoints) * 100 : 0
        ]);
    }
}
