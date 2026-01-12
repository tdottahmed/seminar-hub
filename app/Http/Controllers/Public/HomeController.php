<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Event;
use App\Models\Team;
use App\Models\Gallery;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $upcomingEvents = Event::where('status', 'published')
            ->where('start_date', '>=', now())
            ->orderBy('start_date')
            ->take(5)
            ->get();

        $teamLead = Team::active()->teamLead()->first();
        $teamMembers = Team::active()->members()->orderBy('order')->orderBy('name')->get();
        $galleryItems = Gallery::active()->ordered()->take(12)->get();

        return Inertia::render('Welcome', [
            'upcomingEvents' => $upcomingEvents,
            'teamLead' => $teamLead,
            'teamMembers' => $teamMembers,
            'galleryItems' => $galleryItems,
            'canLogin' => \Illuminate\Support\Facades\Route::has('login'),
            'canRegister' => \Illuminate\Support\Facades\Route::has('register'),
        ]);
    }
}
