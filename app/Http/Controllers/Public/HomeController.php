<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Event;
// already imported above
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $upcomingEvents = Event::where('status', 'published') // Assuming using 'published' status
            ->where('start_date', '>=', now())
            ->orderBy('start_date')
            ->take(5)
            ->get();

        return Inertia::render('Welcome', [
            'upcomingEvents' => $upcomingEvents,
            'canLogin' => \Illuminate\Support\Facades\Route::has('login'),
            'canRegister' => \Illuminate\Support\Facades\Route::has('register'),
        ]);
    }
}
