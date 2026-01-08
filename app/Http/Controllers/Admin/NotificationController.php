<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Event;
use App\Models\EventNotification;
// already imported above
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function index(Event $event)
    {
        $notifications = $event->notifications()->latest()->get();

        return Inertia::render('Admin/Notifications/Index', [
            'event' => $event,
            'notifications' => $notifications
        ]);
    }

    public function create(Event $event)
    {
        return Inertia::render('Admin/Notifications/Create', [
            'event' => $event
        ]);
    }

    public function store(Request $request, Event $event)
    {
        $validated = $request->validate([
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
            'scheduled_at' => 'nullable|date|after:now',
            'status' => 'required|in:draft,scheduled',
        ]);
        
        // For simplicity, we default channels and recipients for now
        $validated['channels'] = ['email'];
        $validated['recipients_criteria'] = ['all_registrants'];

        $event->notifications()->create($validated);

        return redirect()->route('admin.events.notifications.index', $event->id)->with('success', 'Notification saved successfully.');
    }
}
