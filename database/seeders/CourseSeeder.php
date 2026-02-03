<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $courses = [
            [
                'title' => [
                    'en' => 'Full Stack Web Development',
                    'bn' => 'ফুল স্ট্যাক ওয়েব ডেভেলপমেন্ট'
                ],
                'description' => [
                    'en' => '<p>Become a full-stack developer with this comprehensive course covering React, Laravel, and more.</p>',
                    'bn' => '<p>React, Laravel এবং আরও অনেক কিছু কভার করে এই বিস্তারিত কোর্সের মাধ্যমে একজন ফুল-স্ট্যাক ডেভেলপার হন।</p>'
                ],
                'duration' => [
                    'en' => '6 Months',
                    'bn' => '৬ মাস'
                ],
                'level' => 'Beginner',
                'price' => 12000.00,
                'thumbnail' => '/assets/courses/web-dev.jpg',
                'outline' => [
                    [
                        'title' => ['en' => 'HTML & CSS Basics', 'bn' => 'এইচটিএমএল এবং সিএসএস বেসিক'],
                        'lessons' => [
                            ['title' => ['en' => 'Introduction to HTML', 'bn' => 'এইচটিএমএল পরিচিতি']],
                            ['title' => ['en' => 'CSS Styling', 'bn' => 'সিএসএস স্টাইলিং']]
                        ]
                    ],
                    [
                        'title' => ['en' => 'JavaScript Programming', 'bn' => 'জাভাস্ক্রিপ্ট প্রোগ্রামিং'],
                        'lessons' => [
                            ['title' => ['en' => 'Variables and Functions', 'bn' => 'ভেরিয়েবল এবং ফাংশন']],
                            ['title' => ['en' => 'DOM Manipulation', 'bn' => 'DOM ম্যানিপুলেশন']]
                        ]
                    ]
                ]
            ],
            [
                'title' => [
                    'en' => 'Graphic Design Masterclass',
                    'bn' => 'গ্রাফিক ডিজাইন মাস্টারক্লাস'
                ],
                'description' => [
                    'en' => '<p>Master Adobe Photoshop and Illustrator to create stunning visuals.</p>',
                    'bn' => '<p>অসাধারণ ভিজ্যুয়াল তৈরি করতে অ্যাডোবি ফটোশপ এবং ইলাস্ট্রেটর আয়ত্ত করুন।</p>'
                ],
                'duration' => [
                    'en' => '3 Months',
                    'bn' => '৩ মাস'
                ],
                'level' => 'Beginner',
                'price' => 8000.00,
                'thumbnail' => '/assets/courses/graphic.jpg',
                'outline' => [
                    [
                        'title' => ['en' => 'Photoshop Basics', 'bn' => 'ফটোশপ বেসিক'],
                        'lessons' => [
                            ['title' => ['en' => 'Interface Overview', 'bn' => 'ইন্টারফেস পরিচিতি']],
                            ['title' => ['en' => 'Layers and Masking', 'bn' => 'লেয়ার এবং মাস্কিং']]
                        ]
                    ]
                ]
            ],
             [
                'title' => [
                    'en' => 'Digital Marketing Strategy',
                    'bn' => 'ডিজিটাল মার্কেটিং স্ট্র্যাটেজি'
                ],
                'description' => [
                    'en' => '<p>Learn how to grow businesses using SEO, Social Media, and Ads.</p>',
                    'bn' => '<p>এসইও, সোশ্যাল মিডিয়া এবং বিজ্ঞাপন ব্যবহার করে কীভাবে ব্যবসা বাড়ানো যায় তা শিখুন।</p>'
                ],
                'duration' => [
                    'en' => '4 Months',
                    'bn' => '৪ মাস'
                ],
                'level' => 'Intermediate',
                'price' => 10000.00,
                'thumbnail' => '/assets/courses/marketing.jpg',
                'outline' => []
            ]
        ];

        foreach ($courses as $courseData) {
            $slug = Str::slug($courseData['title']['en']);
            
            // Avoid duplicates
            if (Course::where('slug', $slug)->exists()) {
                continue;
            }

            $courseData['slug'] = $slug;
            Course::create($courseData);
        }
    }
}
