<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return \Inertia\Inertia::render('Admin/Testimonials/Index', [
            'testimonials' => Testimonial::orderBy('order')->latest()->paginate(10)
        ]);
    }

    public function create()
    {
        return \Inertia\Inertia::render('Admin/Testimonials/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|array',
            'company' => 'required|array',
            'content' => 'required|array',
            'avatar_path' => 'nullable|string',
            'rating' => 'required|integer|min:1|max:5',
            'order' => 'integer',
            'is_active' => 'boolean',
        ]);

        Testimonial::create($validated);

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial created successfully.');
    }

    public function edit(Testimonial $testimonial)
    {
        return \Inertia\Inertia::render('Admin/Testimonials/Edit', [
            'testimonial' => $testimonial
        ]);
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|array',
            'company' => 'required|array',
            'content' => 'required|array',
            'avatar_path' => 'nullable|string',
            'rating' => 'required|integer|min:1|max:5',
            'order' => 'integer',
            'is_active' => 'boolean',
        ]);

        $testimonial->update($validated);

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial updated successfully.');
    }

    public function destroy(Testimonial $testimonial)
    {
        $testimonial->delete();
        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial deleted successfully.');
    }
}
