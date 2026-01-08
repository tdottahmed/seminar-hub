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
            ->paginate(10);

        return Inertia::render('Admin/Registrations/Index', [
            'event' => $event,
            'registrations' => $registrations
        ]);
    }

    public function all(Request $request)
    {
        $registrations = Registration::with('event')
            ->latest()
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->when($request->status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->when($request->event_id, function ($query, $eventId) {
                $query->where('event_id', $eventId);
            })
            ->paginate(15);

        $events = \App\Models\Event::select('id', 'title')->orderBy('title')->get();

        return Inertia::render('Admin/Registrations/All', [
            'registrations' => $registrations,
            'events' => $events,
            'filters' => $request->only(['search', 'status', 'event_id'])
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
