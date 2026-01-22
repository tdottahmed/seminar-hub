<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $hero = \App\Models\FrontendSection::where('slug', 'hero')->first();
        if ($hero) {
            $content = $hero->content;
            $images = [
                "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000",
                "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2000",
                "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=2000",
            ];

            // Add images to 'en' content
            if (isset($content['en'])) {
                $content['en']['images'] = $images;
            } else {
                 $content['en'] = ['images' => $images];
            }

            // Add images to 'bn' content
            if (isset($content['bn'])) {
                $content['bn']['images'] = $images;
             } else {
                 $content['bn'] = ['images' => $images];
            }

            $hero->update(['content' => $content]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $hero = \App\Models\FrontendSection::where('slug', 'hero')->first();
        if ($hero) {
            $content = $hero->content;
            
            if (isset($content['en']['images'])) {
                unset($content['en']['images']);
            }
            if (isset($content['bn']['images'])) {
                unset($content['bn']['images']);
            }

            $hero->update(['content' => $content]);
        }
    }
};
