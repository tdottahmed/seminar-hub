<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class SitemapController extends Controller
{
    public function index()
    {
        $events = Event::where('is_active', true)->get();

        $content = view('sitemap', [
            'events' => $events,
        ])->render();

        return Response::make($content, 200, [
            'Content-Type' => 'application/xml',
        ]);
    }
}
