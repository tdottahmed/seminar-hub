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
        $quizzes = $event->quizzes()->latest()->paginate(10);
        return Inertia::render('Admin/Quizzes/Index', [
            'event' => $event,
            'quizzes' => $quizzes
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
