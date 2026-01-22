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
            'host_name' => 'nullable|string|max:255',
            'host_logo' => 'nullable', // Allow file or string
            'speaker_ids' => 'nullable|array',
            'speaker_ids.*' => 'exists:speakers,id',
            'slug' => 'nullable|string|max:255|unique:events,slug',
        ]);

        // Handle Image Upload
        if ($request->hasFile('banner_image')) {
            $file = $request->file('banner_image');
            $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('events', $filename, 'public');
            $validated['banner_image'] = Storage::url($path);
        }

        // Handle Host Logo Upload
        if ($request->hasFile('host_logo')) {
            $file = $request->file('host_logo');
            $filename = Str::uuid() . '_host.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('events/hosts', $filename, 'public');
            $validated['host_logo'] = Storage::url($path);
        }

        if (!empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['slug']);
        } else {
            $validated['slug'] = Str::slug($validated['title']) . '-' . Str::random(6);
        }

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
            'slug' => 'nullable|string|max:255|unique:events,slug,' . $event->id,
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

        if ($request->hasFile('host_logo')) {
            $rules['host_logo'] = 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048';
        } else {
            $rules['host_logo'] = 'nullable';
        }
        
        $rules['host_name'] = 'nullable|string|max:255';

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

        // Handle Host Logo Upload/Update
        if ($request->hasFile('host_logo')) {
            $file = $request->file('host_logo');
            $filename = Str::uuid() . '_host.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('events/hosts', $filename, 'public');
            $validated['host_logo'] = Storage::url($path);

            if ($event->host_logo && strpos($event->host_logo, '/storage/') !== false) {
                $oldPath = str_replace('/storage/', '', parse_url($event->host_logo, PHP_URL_PATH));
                if (Storage::disk('public')->exists($oldPath)) {
                    Storage::disk('public')->delete($oldPath);
                }
            }
        } elseif ($request->has('host_logo')) {
            $hostLogo = $request->input('host_logo');
            if (empty($hostLogo) || $hostLogo === null) {
                $validated['host_logo'] = null;
                if ($event->host_logo && strpos($event->host_logo, '/storage/') !== false) {
                    $oldPath = str_replace('/storage/', '', parse_url($event->host_logo, PHP_URL_PATH));
                    if (Storage::disk('public')->exists($oldPath)) {
                        Storage::disk('public')->delete($oldPath);
                    }
                }
            } else {
                $validated['host_logo'] = $hostLogo;
            }
        } else {
            $validated['host_logo'] = $event->host_logo;
        }

        if (array_key_exists('slug', $validated)) {
            if (!empty($validated['slug'])) {
                $validated['slug'] = Str::slug($validated['slug']);
            } else {
                // If slug is cleared/empty, regenerate from title
                $validated['slug'] = Str::slug($validated['title']) . '-' . Str::random(6);
            }
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
