<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\CourseEnrollment;
use Inertia\Inertia;

class CourseEnrollmentController extends Controller
{
    public function index()
    {
        $enrollments = CourseEnrollment::with('course')
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/CourseEnrollments/Index', [
            'enrollments' => $enrollments
        ]);
    }

    public function update(Request $request, CourseEnrollment $enrollment)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,approved,rejected',
        ]);

        $enrollment->update($validated);

        return back()->with('success', 'Enrollment status updated successfully.');
    }

    public function destroy(CourseEnrollment $enrollment)
    {
        $enrollment->delete();

        return back()->with('success', 'Enrollment deleted successfully.');
    }
}
