<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Event;
use App\Models\Speaker;
use Inertia\Inertia;
use Illuminate\Support\Str;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::latest()->paginate(10);
        return Inertia::render('Admin/Events/Index', [
            'events' => $events
        ]);
    }

    public function create()
    {
        $speakers = Speaker::all();
        return Inertia::render('Admin/Events/Create', [
            'speakers' => $speakers
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'short_description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'venue' => 'nullable|string',
            'location' => 'nullable|string',
            'meeting_link' => 'nullable|url',
            'max_participants' => 'nullable|integer|min:1',
            'description' => 'nullable|string',
            'topics' => 'nullable|array',
            'outline' => 'nullable|string',
            'banner_image' => 'nullable|string',
            'speaker_ids' => 'nullable|array',
            'speaker_ids.*' => 'exists:speakers,id',
        ]);

        $validated['slug'] = Str::slug($validated['title']) . '-' . Str::random(6);
        $validated['status'] = 'draft';

        $event = Event::create($validated);

        if ($request->has('speaker_ids')) {
            $event->speakers()->sync($request->speaker_ids);
        }

        return redirect()->route('admin.events.index')->with('success', 'Event created successfully.');
    }

    public function edit(Event $event)
    {
        $event->load('speakers');
        $speakers = Speaker::all();
        return Inertia::render('Admin/Events/Edit', [
            'event' => $event,
            'speakers' => $speakers
        ]);
    }

    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'short_description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'venue' => 'nullable|string',
            'location' => 'nullable|string',
            'meeting_link' => 'nullable|url',
            'max_participants' => 'nullable|integer|min:1',
            'description' => 'nullable|string',
            'topics' => 'nullable|array',
            'outline' => 'nullable|string',
            'banner_image' => 'nullable|string',
            'status' => 'required|string',
            'speaker_ids' => 'nullable|array',
            'speaker_ids.*' => 'exists:speakers,id',
        ]);

        $event->update($validated);

        if ($request->has('speaker_ids')) {
            $event->speakers()->sync($request->speaker_ids);
        } else {
            $event->speakers()->detach();
        }

        return redirect()->route('admin.events.index')->with('success', 'Event updated successfully.');
    }

    public function destroy(Event $event)
    {
        $event->delete();
        return redirect()->route('admin.events.index')->with('success', 'Event deleted successfully.');
    }
}
