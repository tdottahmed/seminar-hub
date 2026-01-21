<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use Illuminate\Http\Request;

class FaqController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return \Inertia\Inertia::render('Admin/Faqs/Index', [
            'faqs' => Faq::orderBy('order')->latest()->paginate(10)
        ]);
    }

    public function create()
    {
        return \Inertia\Inertia::render('Admin/Faqs/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'question' => 'required|array',
            'answer' => 'required|array',
            'order' => 'integer',
            'is_active' => 'boolean',
        ]);

        Faq::create($validated);

        return redirect()->route('admin.faqs.index')->with('success', 'FAQ created successfully.');
    }

    public function edit(Faq $faq)
    {
        return \Inertia\Inertia::render('Admin/Faqs/Edit', [
            'faq' => $faq
        ]);
    }

    public function update(Request $request, Faq $faq)
    {
        $validated = $request->validate([
            'question' => 'required|array',
            'answer' => 'required|array',
            'order' => 'integer',
            'is_active' => 'boolean',
        ]);

        $faq->update($validated);

        return redirect()->route('admin.faqs.index')->with('success', 'FAQ updated successfully.');
    }

    public function destroy(Faq $faq)
    {
        $faq->delete();
        return redirect()->route('admin.faqs.index')->with('success', 'FAQ deleted successfully.');
    }
}
