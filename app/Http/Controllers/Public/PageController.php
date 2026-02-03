<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\FrontendSection;
use Inertia\Inertia;

class PageController extends Controller
{

    public function about()
    {
        $aboutSection = FrontendSection::where('slug', 'about_us')->first();
        $founderSection = FrontendSection::where('slug', 'founder')->first();
        return Inertia::render('Public/About', [
            'aboutSection' => $aboutSection,
            'founderSection' => $founderSection
        ]);
    }

    public function goals()
    {
        $goalsSection = FrontendSection::where('slug', 'our_goals')->first();
        return Inertia::render('Public/Goals', [
            'goalsSection' => $goalsSection
        ]);
    }
}
