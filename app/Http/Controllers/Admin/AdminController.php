<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Inertia\Inertia;
use App\Models\Event;
use App\Models\Registration;

class AdminController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_events' => Event::count(),
                'total_registrations' => Registration::count(),
                'active_quizzes' => \App\Models\Quiz::where('is_published', true)->count(),
                // 'recent_activity' => ... 
            ]
        ]);
    }
}
