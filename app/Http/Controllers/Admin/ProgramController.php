<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Program;
use Illuminate\Http\Request;

class ProgramController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return \Inertia\Inertia::render('Admin/Programs/Index', [
            'programs' => Program::orderBy('order')->latest()->paginate(10)
        ]);
    }

    public function create()
    {
        return \Inertia\Inertia::render('Admin/Programs/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|array',
            'description' => 'required|array',
            'icon' => 'nullable|string',
            'color_class' => 'nullable|string',
            'count_label' => 'nullable|array',
            'order' => 'integer',
            'is_active' => 'boolean',
        ]);

        Program::create($validated);

        return redirect()->route('admin.programs.index')->with('success', 'Program created successfully.');
    }

    public function edit(Program $program)
    {
        return \Inertia\Inertia::render('Admin/Programs/Edit', [
            'program' => $program
        ]);
    }

    public function update(Request $request, Program $program)
    {
        $validated = $request->validate([
            'title' => 'required|array',
            'description' => 'required|array',
            'icon' => 'nullable|string',
            'color_class' => 'nullable|string',
            'count_label' => 'nullable|array',
            'order' => 'integer',
            'is_active' => 'boolean',
        ]);

        $program->update($validated);

        return redirect()->route('admin.programs.index')->with('success', 'Program updated successfully.');
    }

    public function destroy(Program $program)
    {
        $program->delete();
        return redirect()->route('admin.programs.index')->with('success', 'Program deleted successfully.');
    }
}
