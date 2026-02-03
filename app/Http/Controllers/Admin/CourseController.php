<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $courses = Course::orderBy('created_at', 'desc')->paginate(10);
        return Inertia::render('Admin/Courses/Index', [
            'courses' => $courses
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Courses/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|array',
            'description' => 'required|array',
            'duration' => 'nullable|array',
            'level' => 'required|string',
            'price' => 'nullable|numeric',
            'thumbnail' => 'nullable|string', // Assuming URL or path input for now
            'outline' => 'nullable|array',
            'is_active' => 'boolean',
        ]);

        // Generate slug from English title if available, else random string
        $slugSource = $validated['title']['en'] ?? Str::random(10);
        $validated['slug'] = Str::slug($slugSource);

        Course::create($validated);

        return redirect()->route('admin.courses.index')->with('success', 'Course created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Course $course)
    {
        return Inertia::render('Admin/Courses/Edit', [
            'course' => $course
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Course $course)
    {
        $validated = $request->validate([
            'title' => 'required|array',
            'description' => 'required|array',
             'duration' => 'nullable|array',
            'level' => 'required|string',
            'price' => 'nullable|numeric',
            'thumbnail' => 'nullable|string',
            'outline' => 'nullable|array',
            'is_active' => 'boolean',
        ]);

        // Update slug if title changed? Optional. Let's keep slug stable for now unless explicitly requested.
        
        $course->update($validated);

        return redirect()->route('admin.courses.index')->with('success', 'Course updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        $course->delete();
        return redirect()->route('admin.courses.index')->with('success', 'Course deleted successfully.');
    }
}
