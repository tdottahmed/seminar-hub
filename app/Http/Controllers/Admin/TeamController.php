<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Team;
use Inertia\Inertia;
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
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'bio' => 'nullable|string',
            'designation' => 'required|string|max:255',
            'organization' => 'nullable|string|max:255',
            'photo' => 'nullable|string',
            'portfolio_url' => 'nullable|url|max:255',
            'social_links' => 'nullable|array',
            'expertise' => 'nullable|string',
            'is_team_lead' => 'boolean',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

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
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'bio' => 'nullable|string',
            'designation' => 'required|string|max:255',
            'organization' => 'nullable|string|max:255',
            'photo' => 'nullable|string',
            'portfolio_url' => 'nullable|url|max:255',
            'social_links' => 'nullable|array',
            'expertise' => 'nullable|string',
            'is_team_lead' => 'boolean',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

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
