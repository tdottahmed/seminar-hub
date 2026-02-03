<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\FrontendSection;

class FounderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $section = [
            'slug' => 'founder',
            'title' => 'Founder Section',
            'content' => [
                'name' => "Tanbir Ahmed",
                'title' => "Founder & CEO",
                'bio' => "Tanbir is a visionary entrepreneur with a passion for education and technology. With over 10 years of experience in EdTech, he founded SeminarHub to make professional development accessible to all.",
                'image' => "/images/founder.jpg" // Placeholder
            ]
        ];

        FrontendSection::updateOrCreate(
            ['slug' => $section['slug']],
            $section
        );
    }
}
