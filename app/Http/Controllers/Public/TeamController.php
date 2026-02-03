<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Team;
use Inertia\Inertia;

class TeamController extends Controller
{

    public function index()
    {
        $teamLead = Team::active()->teamLead()->first();
        $members = Team::active()->members()->orderBy('order')->orderBy('name')->get();
        return Inertia::render('Public/Team/Index', [
            'teamLead' => $teamLead,
            'members' => $members
        ]);
    }

    public function show($id)
    {
        $team = Team::findOrFail($id);
        
        return Inertia::render('TeamDetails', [
            'team' => $team
        ]);
    }
}
