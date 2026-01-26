<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\GeminiService;


use App\Models\Quiz;
use App\Models\Question;
// already imported above
use Inertia\Inertia;

class QuestionController extends Controller
{
    public function index(Quiz $quiz)
    {
        $questions = $quiz->questions()->orderBy('sort_order')->get();
        return Inertia::render('Admin/Questions/Index', [
            'quiz' => $quiz->load('event'),
            'questions' => $questions
        ]);
    }

    public function create(Quiz $quiz)
    {
        return Inertia::render('Admin/Questions/Create', [
            'quiz' => $quiz->load('event')
        ]);
    }

    public function edit(Quiz $quiz, Question $question)
    {
        return Inertia::render('Admin/Questions/Edit', [
            'quiz' => $quiz->load('event'),
            'question' => $question
        ]);
    }

    public function store(Request $request, Quiz $quiz)
    {
        $validated = $request->validate([
            'question_text' => 'required|string',
            'type' => 'required|in:multiple_choice,true_false,short_answer',
            'options' => 'nullable|array',
            'correct_answer' => 'nullable|string',
            'points' => 'required|integer|min:1',
        ]);

        $quiz->questions()->create($validated);

        return redirect()->back()->with('success', 'Question added successfully.');
    }

    public function update(Request $request, Quiz $quiz, Question $question)
    {
         $validated = $request->validate([
            'question_text' => 'required|string',
            'type' => 'required|in:multiple_choice,true_false,short_answer',
            'options' => 'nullable|array',
            'correct_answer' => 'nullable|string',
            'points' => 'required|integer|min:1',
        ]);

        $question->update($validated);

        return redirect()->back()->with('success', 'Question updated successfully.');
    }

    public function destroy(Quiz $quiz, Question $question)
    {
        $question->delete();
        return redirect()->back()->with('success', 'Question deleted successfully.');
    }
    
    public function reorder(Request $request, Quiz $quiz)
    {
        $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|exists:questions,id',
            'items.*.sort_order' => 'required|integer',
        ]);
        
        foreach($request->items as $item) {
             $quiz->questions()->where('id', $item['id'])->update(['sort_order' => $item['sort_order']]);
        }
        
        return redirect()->back()->with('success', 'Questions reordered successfully.');
    }

    public function generate(Request $request, Quiz $quiz, GeminiService $gemini)
    {
        $request->validate([
            'topic' => 'required|string',
            'count' => 'required|integer|min:1|max:20',
            'difficulty' => 'required|in:easy,medium,hard',
        ]);

        try {
            $questions = $gemini->generateQuestions(
                $request->topic, 
                $request->count, 
                $request->difficulty
            );

            foreach ($questions as $q) {
                $quiz->questions()->create([
                    'type' => 'multiple_choice',
                    'question_text' => $q['question_text'],
                    'options' => json_encode($q['options']),
                    'correct_answer' => $q['correct_answer'],
                    'points' => $q['points'] ?? 1,
                    'sort_order' => 0
                ]);
            }

            return redirect()->back()->with('success', count($questions) . ' questions generated successfully.');

        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to generate questions: ' . $e->getMessage());
        }
    }
}
