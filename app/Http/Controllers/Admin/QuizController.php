<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Event;
use App\Models\Quiz;
// already imported above
use Inertia\Inertia;

class QuizController extends Controller
{
    public function index(Event $event)
    {
        $quizzes = $event->quizzes()
            ->withCount('questions')
            ->latest()
            ->paginate(10);
        return Inertia::render('Admin/Quizzes/Index', [
            'event' => $event,
            'quizzes' => $quizzes
        ]);
    }

    public function all(Request $request)
    {
        $quizzes = \App\Models\Quiz::with('event')
            ->withCount('questions')
            ->latest()
            ->when($request->search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%");
            })
            ->paginate(15);
        
        return Inertia::render('Admin/Quizzes/All', [
            'quizzes' => $quizzes,
            'filters' => $request->only(['search'])
        ]);
    }

    public function results(Quiz $quiz)
    {
        $quiz->load('event');
        
        // Analytics
        $totalAttempts = $quiz->attempts()->where('status', 'completed')->count();
        $averageScore = $quiz->attempts()->where('status', 'completed')->avg('score') ?? 0;
        
        // Max score is based on the number of questions in an attempt (assuming 1 point per question)
        // If question points vary, this needs to be more complex, but for now we assume 1 point or standard count.
        // User requested: "show this form quiz->total_questions"
        $maxQuestionsCount = $quiz->total_questions ?? $quiz->time_limit_minutes ?? 10;
        $maxScore = $maxQuestionsCount; 

        $passCount = $quiz->attempts()->where('status', 'completed')
            ->where('score', '>=', $maxScore * 0.4) // Assuming 40% is pass
            ->count();
            
        $analytics = [
            'total_attempts' => $totalAttempts,
            'average_score' => round($averageScore, 1),
            'max_possible_score' => $maxScore,
            'pass_rate' => $totalAttempts > 0 ? round(($passCount / $totalAttempts) * 100, 1) : 0,
        ];
        
        // Leaderboard (completed attempts only)
        $attempts = $quiz->attempts()
            ->where('status', 'completed')
            ->orderByDesc('score')
            ->orderBy('completed_at') // Tie-breaker: earlier completion
            ->paginate(20)
            ->withQueryString();
            
        return Inertia::render('Admin/Quizzes/Results', [
            'quiz' => $quiz,
            'stats' => $analytics,
            'attempts' => $attempts
        ]);
    }

    public function create(Event $event)
    {
        return Inertia::render('Admin/Quizzes/Create', [
            'event' => $event
        ]);
    }

    public function store(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'time_limit_minutes' => 'nullable|integer|min:1',
            'total_questions' => 'nullable|integer|min:1',
            'is_published' => 'boolean',
        ]);

        $event->quizzes()->create($validated);

        return redirect()->route('admin.events.quizzes.index', $event->id)->with('success', 'Quiz created successfully.');
    }

    public function edit(Event $event, Quiz $quiz)
    {
        return Inertia::render('Admin/Quizzes/Edit', [
            'event' => $event,
            'quiz' => $quiz
        ]);
    }

    public function update(Request $request, Event $event, Quiz $quiz)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'time_limit_minutes' => 'nullable|integer|min:1',
            'total_questions' => 'nullable|integer|min:1',
            'is_published' => 'boolean',
        ]);

        $quiz->update($validated);

        return redirect()->route('admin.events.quizzes.index', $event->id)->with('success', 'Quiz updated successfully.');
    }

    public function destroy(Event $event, Quiz $quiz)
    {
        $quiz->delete();
        return redirect()->route('admin.events.quizzes.index', $event->id)->with('success', 'Quiz deleted successfully.');
    }
}
