<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Speaker;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class SpeakerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $speakers = Speaker::latest()->paginate(15);
        return Inertia::render('Admin/Speakers/Index', [
            'speakers' => $speakers
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Speakers/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'bio' => 'nullable|string',
            'designation' => 'nullable|string|max:255',
            'organization' => 'nullable|string|max:255',
            'portfolio_url' => 'nullable|url|max:255',
            'social_links' => 'nullable|array',
            'expertise' => 'nullable|string',
        ];

        // Add photo validation - handle file uploads or string URLs
        if ($request->hasFile('photo')) {
            $rules['photo'] = 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120';
        } else {
            $rules['photo'] = 'nullable';
        }

        $validated = $request->validate($rules);

        // Handle photo upload
        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('speakers', $filename, 'public');
            $validated['photo'] = Storage::url($path);
        } elseif ($request->has('photo')) {
            $photoValue = $request->input('photo');
            if (empty($photoValue) || $photoValue === null) {
                $validated['photo'] = null;
            } else {
                $validated['photo'] = $photoValue;
            }
        }

        Speaker::create($validated);

        return redirect()->route('admin.speakers.index')->with('success', 'Speaker created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Speaker $speaker)
    {
        $speaker->load('events');
        return Inertia::render('Admin/Speakers/Show', [
            'speaker' => $speaker
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Speaker $speaker)
    {
        return Inertia::render('Admin/Speakers/Edit', [
            'speaker' => $speaker
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Speaker $speaker)
    {
        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'bio' => 'nullable|string',
            'designation' => 'nullable|string|max:255',
            'organization' => 'nullable|string|max:255',
            'portfolio_url' => 'nullable|url|max:255',
            'social_links' => 'nullable|array',
            'expertise' => 'nullable|string',
        ];

        // Add photo validation - handle file uploads or string URLs
        if ($request->hasFile('photo')) {
            $rules['photo'] = 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120';
        } else {
            $rules['photo'] = 'nullable';
        }

        $validated = $request->validate($rules);

        // Handle photo upload/update
        if ($request->hasFile('photo')) {
            // New file uploaded - store it
            $file = $request->file('photo');
            $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('speakers', $filename, 'public');
            $validated['photo'] = Storage::url($path);

            // Delete old photo if it exists and is stored locally
            if ($speaker->photo && strpos($speaker->photo, '/storage/') !== false) {
                $oldPath = str_replace('/storage/', '', parse_url($speaker->photo, PHP_URL_PATH));
                if (Storage::disk('public')->exists($oldPath)) {
                    Storage::disk('public')->delete($oldPath);
                }
            }
        } elseif ($request->has('photo')) {
            // photo field is present in request
            $photoValue = $request->input('photo');

            if (empty($photoValue) || $photoValue === null) {
                // Photo was removed - clear it
                $validated['photo'] = null;

                // Delete old photo if it exists and is stored locally
                if ($speaker->photo && strpos($speaker->photo, '/storage/') !== false) {
                    $oldPath = str_replace('/storage/', '', parse_url($speaker->photo, PHP_URL_PATH));
                    if (Storage::disk('public')->exists($oldPath)) {
                        Storage::disk('public')->delete($oldPath);
                    }
                }
            } else {
                // It's a URL string (either existing or new external URL) - use it as is
                $validated['photo'] = $photoValue;
            }
        } else {
            // photo not in request - keep existing value
            $validated['photo'] = $speaker->photo;
        }

        $speaker->update($validated);

        return redirect()->route('admin.speakers.index')->with('success', 'Speaker updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Speaker $speaker)
    {
        $speaker->delete();
        return redirect()->route('admin.speakers.index')->with('success', 'Speaker deleted successfully.');
    }
}
