<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Speaker;
use Inertia\Inertia;

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
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'bio' => 'nullable|string',
            'designation' => 'nullable|string|max:255',
            'organization' => 'nullable|string|max:255',
            'photo' => 'nullable|string',
            'portfolio_url' => 'nullable|url|max:255',
            'social_links' => 'nullable|array',
            'expertise' => 'nullable|string',
        ]);

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
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'bio' => 'nullable|string',
            'designation' => 'nullable|string|max:255',
            'organization' => 'nullable|string|max:255',
            'photo' => 'nullable|string',
            'portfolio_url' => 'nullable|url|max:255',
            'social_links' => 'nullable|array',
            'expertise' => 'nullable|string',
        ]);

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
