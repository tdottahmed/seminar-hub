<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::with('speakers')->orderBy('start_date', 'asc')->get();
        return Inertia::render('Public/Events/Index', [
            'events' => $events
        ]);
    }

    public function show($slug)
    {
        $event = Event::where('slug', $slug)
            ->with(['speakers', 'sessions', 'quizzes'])
            ->firstOrFail();

        return Inertia::render('EventDetails', [
            'event' => $event
        ]);
    }
}
