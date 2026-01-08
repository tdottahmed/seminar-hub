<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Event;
use App\Models\Registration;
// already imported above
use Inertia\Inertia;

class RegistrationController extends Controller
{
    public function index(Event $event)
    {
        $registrations = $event->registrations()
            ->latest()
            ->paginate(10); // In real app, add search/filters here

        return Inertia::render('Admin/Registrations/Index', [
            'event' => $event,
            'registrations' => $registrations
        ]);
    }

    public function show(Registration $registration)
    {
        return Inertia::render('Admin/Registrations/Show', [
            'registration' => $registration->load(['event', 'quizAttempts.quiz'])
        ]);
    }

    public function update(Request $request, Registration $registration)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,approved,rejected,shortlisted,attended',
        ]);

        $registration->update($validated);

        return redirect()->back()->with('success', 'Registration status updated successfully.');
    }
}
