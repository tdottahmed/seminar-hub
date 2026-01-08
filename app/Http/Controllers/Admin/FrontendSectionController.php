<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FrontendSection;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FrontendSectionController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Frontend/Index', [
            'sections' => FrontendSection::all(),
        ]);
    }

    public function edit(FrontendSection $section)
    {
        return Inertia::render('Admin/Frontend/Edit', [
            'section' => $section,
        ]);
    }

    public function update(Request $request, FrontendSection $section)
    {
        $validated = $request->validate([
            'content' => 'required|array',
            'is_active' => 'boolean',
        ]);

        $section->update($validated);

        return redirect()->route('admin.frontend.index')->with('success', 'Section updated successfully.');
    }
}
