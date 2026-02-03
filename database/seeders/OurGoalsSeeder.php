<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\FrontendSection;

class OurGoalsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $section = [
            'slug' => 'our_goals',
            'title' => 'Our Goals Section',
            'content' => [
                'title' => "Our Strategic Goals",
                'goals' => [
                    ['title' => "Expand Global Reach", 'description' => "Connect with 1 million learners by 2028."],
                    ['title' => "Innovate Learning", 'description' => "Integrate AI and VR into our seminar experiences."],
                    ['title' => "Empower Experts", 'description' => "Provide a state-of-the-art platform for speakers to share their wisdom."]
                ]
            ]
        ];

        FrontendSection::updateOrCreate(
            ['slug' => $section['slug']],
            $section
        );
    }
}
