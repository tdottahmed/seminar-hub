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
                'en' => [
                    'title' => "Our Strategic Goals",
                    'goals' => [
                        ['title' => "Expand Global Reach", 'description' => "Connect with 1 million learners by 2028."],
                        ['title' => "Innovate Learning", 'description' => "Integrate AI and VR into our seminar experiences."],
                        ['title' => "Empower Experts", 'description' => "Provide a state-of-the-art platform for speakers to share their wisdom."]
                    ]
                ],
                'bn' => [
                    'title' => "আমাদের কৌশলগত লক্ষ্য",
                    'goals' => [
                        ['title' => "বৈশ্বিক প্রসার", 'description' => "২০২৮ সালের মধ্যে ১ মিলিয়ন শিক্ষার্থীর সাথে সংযোগ স্থাপন।"],
                        ['title' => "শিক্ষায় উদ্ভাবন", 'description' => "আমাদের সেমিনার অভিজ্ঞতায় এআই এবং ভিআর যুক্ত করা।"],
                        ['title' => "বিশেষজ্ঞদের ক্ষমতায়ন", 'description' => "স্পিকারদের জ্ঞান শেয়ার করার জন্য একটি আধুনিক প্ল্যাটফর্ম প্রদান করা।"]
                    ]
                ]
            ]
        ];

        FrontendSection::updateOrCreate(
            ['slug' => $section['slug']],
            $section
        );
    }
}
