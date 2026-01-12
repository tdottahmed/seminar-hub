<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Event;
use App\Models\Speaker;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

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
            'banner_image' => 'nullable', // Allow file or string
            'speaker_ids' => 'nullable|array',
            'speaker_ids.*' => 'exists:speakers,id',
        ]);

        // Handle Image Upload
        if ($request->hasFile('banner_image')) {
            $file = $request->file('banner_image');
            $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('events', $filename, 'public');
            $validated['banner_image'] = Storage::url($path);
        }

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
        // Validate separately for banner_image to handle both file and string
        $rules = [
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
            'status' => 'required|string',
            'speaker_ids' => 'nullable|array',
            'speaker_ids.*' => 'exists:speakers,id',
        ];

        // Add banner_image validation - handle file uploads, URLs, or null/empty
        if ($request->hasFile('banner_image')) {
            // File upload
            $rules['banner_image'] = 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120';
        } else {
            // Not a file - could be URL string, empty string, null, or File object (from Inertia)
            // Make it fully nullable - don't validate as URL unless it's clearly a URL
            $rules['banner_image'] = 'nullable';
        }

        $validated = $request->validate($rules);

        // Handle Image Upload/Update
        if ($request->hasFile('banner_image')) {
            // New file uploaded - store it
            $file = $request->file('banner_image');
            $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('events', $filename, 'public');
            $validated['banner_image'] = Storage::url($path);

            // Delete old image if it exists and is stored locally
            if ($event->banner_image && strpos($event->banner_image, '/storage/') !== false) {
                $oldPath = str_replace('/storage/', '', parse_url($event->banner_image, PHP_URL_PATH));
                if (Storage::disk('public')->exists($oldPath)) {
                    Storage::disk('public')->delete($oldPath);
                }
            }
        } elseif ($request->has('banner_image')) {
            // banner_image field is present in request
            $bannerImage = $request->input('banner_image');

            if (empty($bannerImage) || $bannerImage === null) {
                // Image was removed - clear it
                $validated['banner_image'] = null;

                // Delete old image if it exists and is stored locally
                if ($event->banner_image && strpos($event->banner_image, '/storage/') !== false) {
                    $oldPath = str_replace('/storage/', '', parse_url($event->banner_image, PHP_URL_PATH));
                    if (Storage::disk('public')->exists($oldPath)) {
                        Storage::disk('public')->delete($oldPath);
                    }
                }
            } else {
                // It's a URL string (either existing or new external URL) - use it as is
                $validated['banner_image'] = $bannerImage;
            }
        } else {
            // banner_image not in request - keep existing value
            $validated['banner_image'] = $event->banner_image;
        }

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
