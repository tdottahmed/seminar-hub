<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Course;
use App\Models\CourseEnrollment;

class CourseEnrollmentController extends Controller
{
    public function store(Request $request, Course $course)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'message' => 'nullable|string|max:1000',
        ]);

        $enrollment = $course->enrollments()->create($validated);

        return back()->with('success', 'Enrollment request submitted successfully! We will contact you shortly.');
    }
}
