<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Event;
use App\Models\Team;
use App\Models\Gallery;
use Inertia\Inertia;

use App\Models\FrontendSection;

class HomeController extends Controller
{
    public function index()
    {
        $heroSection = FrontendSection::where('slug', 'hero')->first();
        $statsSection = FrontendSection::where('slug', 'stats')->first();
        $aboutSection = FrontendSection::where('slug', 'about')->first();
        $testimonialsSection = FrontendSection::where('slug', 'testimonials')->first();
        $programsSection = FrontendSection::where('slug', 'programs')->first();
        $howItWorksSection = FrontendSection::where('slug', 'how-it-works')->first();
        $teamSection = FrontendSection::where('slug', 'team')->first();
        $gallerySection = FrontendSection::where('slug', 'gallery')->first();
        $faqSection = FrontendSection::where('slug', 'faq')->first();
        
        $upcomingEvents = Event::where('status', 'published')
            ->where('start_date', '>=', now())
            ->orderBy('start_date')
            ->get(); // Removed take(5) to show all future events as requested by "one by one" focus

        $testimonials = \App\Models\Testimonial::where('is_active', true)
            ->orderBy('created_at', 'desc')
            ->get();

        $programs = \App\Models\Program::where('is_active', true)
            ->orderBy('title')
            ->get();

        $faqs = \App\Models\Faq::where('is_active', true)->get();

        $teamLead = Team::active()->teamLead()->first();
        $teamMembers = Team::active()->members()->orderBy('order')->orderBy('name')->get();
        $galleryItems = Gallery::active()->ordered()->take(12)->get();

        return Inertia::render('Welcome', [
            'heroSection' => $heroSection,
            'statsSection' => $statsSection,
            'aboutSection' => $aboutSection,
            'testimonialsSection' => $testimonialsSection,
            'testimonials' => $testimonials,
            'programsSection' => $programsSection,
            'howItWorksSection' => $howItWorksSection,
            'gallerySection' => $gallerySection,
            'programs' => $programs,
            'upcomingEvents' => $upcomingEvents,
            'teamLead' => $teamLead,
            'teamMembers' => $teamMembers,
            'teamSection' => $teamSection,
            'galleryItems' => $galleryItems,
            'faqSection' => $faqSection,
            'faqs' => $faqs,
            'canLogin' => \Illuminate\Support\Facades\Route::has('login'),
            'canRegister' => \Illuminate\Support\Facades\Route::has('register'),
        ]);
    }
}
