<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    /**
     * Display a listing of courses.
     */
    public function index()
    {
        // Fetch active courses
        $courses = Course::where('is_active', true)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Public/Courses/Index', [
            'courses' => $courses
        ]);
    }

    /**
     * Display the specified course.
     */
    public function show($slug)
    {
        $course = Course::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return Inertia::render('Public/Courses/Show', [
            'course' => $course
        ]);
    }
}
