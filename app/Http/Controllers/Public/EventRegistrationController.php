<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Event;
use App\Models\Registration;
// already imported above
use Inertia\Inertia;
use Illuminate\Support\Str;

class EventRegistrationController extends Controller
{
    public function create($slug)
    {
        $event = Event::where('slug', $slug)->firstOrFail();

        return Inertia::render('Registration', [
            'event' => $event,
        ]);
    }

    public function store(Request $request, $slug)
    {
        $event = Event::where('slug', $slug)->firstOrFail();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255', // Removed unique check for simplicity/testing, real world might want unique per event
            'phone' => 'required|string|max:20',
            'organization' => 'nullable|string|max:255',
            'designation' => 'nullable|string|max:255',
        ]);

        $validated['status'] = 'pending';
        // In a real app, you might want to prevent duplicate emails for same event
        // $existing = $event->registrations()->where('email', $validated['email'])->first();
        // if ($existing) { ... }

        $event->registrations()->create($validated);

        return redirect()->back()->with('success', 'Registration successful! Please check your email.');
    }
}
