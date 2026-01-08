<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Team;
use Inertia\Inertia;

class TeamController extends Controller
{
    public function show($id)
    {
        $team = Team::findOrFail($id);
        
        return Inertia::render('TeamDetails', [
            'team' => $team
        ]);
    }
}
