<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Team;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $teams = Team::orderBy('is_team_lead', 'desc')
            ->orderBy('order')
            ->orderBy('name')
            ->paginate(15);
        
        return Inertia::render('Admin/Teams/Index', [
            'teams' => $teams
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Teams/Create');
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
            'designation' => 'required|string|max:255',
            'organization' => 'nullable|string|max:255',
            'portfolio_url' => 'nullable|url|max:255',
            'social_links' => 'nullable|array',
            'expertise' => 'nullable|string',
            'is_team_lead' => 'boolean',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
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
            $path = $file->storeAs('teams', $filename, 'public');
            $validated['photo'] = Storage::url($path);
        } elseif ($request->has('photo')) {
            $photoValue = $request->input('photo');
            if (empty($photoValue) || $photoValue === null) {
                $validated['photo'] = null;
            } else {
                $validated['photo'] = $photoValue;
            }
        }

        // If setting as team lead, unset other team leads
        if ($validated['is_team_lead'] ?? false) {
            Team::where('is_team_lead', true)->update(['is_team_lead' => false]);
        }

        Team::create($validated);

        return redirect()->route('admin.teams.index')->with('success', 'Team member created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Team $team)
    {
        return Inertia::render('Admin/Teams/Show', [
            'team' => $team
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Team $team)
    {
        return Inertia::render('Admin/Teams/Edit', [
            'team' => $team
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Team $team)
    {
        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'bio' => 'nullable|string',
            'designation' => 'required|string|max:255',
            'organization' => 'nullable|string|max:255',
            'portfolio_url' => 'nullable|url|max:255',
            'social_links' => 'nullable|array',
            'expertise' => 'nullable|string',
            'is_team_lead' => 'boolean',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
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
            $path = $file->storeAs('teams', $filename, 'public');
            $validated['photo'] = Storage::url($path);

            // Delete old photo if it exists and is stored locally
            if ($team->photo && strpos($team->photo, '/storage/') !== false) {
                $oldPath = str_replace('/storage/', '', parse_url($team->photo, PHP_URL_PATH));
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
                if ($team->photo && strpos($team->photo, '/storage/') !== false) {
                    $oldPath = str_replace('/storage/', '', parse_url($team->photo, PHP_URL_PATH));
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
            $validated['photo'] = $team->photo;
        }

        // If setting as team lead, unset other team leads
        if ($validated['is_team_lead'] ?? false && !$team->is_team_lead) {
            Team::where('is_team_lead', true)->where('id', '!=', $team->id)->update(['is_team_lead' => false]);
        }

        $team->update($validated);

        return redirect()->route('admin.teams.index')->with('success', 'Team member updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Team $team)
    {
        $team->delete();
        return redirect()->route('admin.teams.index')->with('success', 'Team member deleted successfully.');
    }
}
