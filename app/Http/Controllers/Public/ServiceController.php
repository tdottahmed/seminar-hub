<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Service;
use Inertia\Inertia;

class ServiceController extends Controller
{

    public function index()
    {
        return Inertia::render('Public/Services/Index', [
            'services' => Service::where('is_active', true)->latest()->get()
        ]);
    }
}
