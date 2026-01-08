<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Inertia\Inertia;

class EventController extends Controller
{
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
