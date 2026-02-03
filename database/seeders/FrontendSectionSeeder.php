<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FrontendSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sections = [
            [
                'slug' => 'hero',
                'title' => 'Hero Section',
                'content' => [
                    'en' => [
                        'badge' => "New Seminars Added Weekly",
                        'titlePrefix' => "Unlock Your",
                        'words' => ["Creative Potential", "Future Career", "Hidden Talent"],
                        'subtext' => "Join the premier platform for professional development. Master new skills through immersive, hands-on events and workshops.",
                        'ctaPrimary' => "Browse Events",
                        'ctaSecondary' => "Learn More"
                    ],
                    'bn' => [
                        'badge' => "প্রতি সপ্তাহে নতুন সেমিনার যোগ করা হয়",
                        'titlePrefix' => "উন্মোচন করুন আপনার",
                        'words' => ["সৃজনশীল সম্ভাবনা", "ভবিষ্যৎ ক্যারিয়ার", "সুপ্ত প্রতিভা"],
                        'subtext' => "পেশাগত উন্নয়নের জন্য সেরা প্ল্যাটফর্মে যোগ দিন। হাতে-কলমে শিক্ষা এবং ওয়ার্কশপের মাধ্যমে নতুন দক্ষতা অর্জন করুন।",
                        'ctaPrimary' => "ইভেন্ট দেখুন",
                        'ctaSecondary' => "আরও জানুন"
                    ]
                ]
            ],
            [
                'slug' => 'about',
                'title' => 'About / Why Choose Us',
                'content' => [
                    'en' => [
                        'title' => "Why Choose SeminarHub?",
                        'desc' => "We curate experiences that go beyond traditional learning.",
                        'features' => [
                            ['title' => "Industry Experts Mentors", 'desc' => "Learn from industry experts with real-world experience."],
                            ['title' => "Hands-on Projects", 'desc' => "Build a portfolio that stands out."],
                            ['title' => "Global Community", 'desc' => "Network with peers worldwide."]
                        ]
                    ],
                    'bn' => [
                        'title' => "কেন SeminarHub বেছে নেবেন?",
                        'desc' => "আমরা এমন অভিজ্ঞতা তৈরি করি যা গতানুগতিক শিক্ষার বাইরে।",
                        'features' => [
                            ['title' => "বিশ্বমানের মেন্টর", 'desc' => "ইন্ডাস্ট্রি বিশেষজ্ঞদের কাছ থেকে শিখুন।"],
                            ['title' => "হাতে-কলমে প্রজেক্ট", 'desc' => "এমন পোর্টফোলিও তৈরি করুন যা আপনাকে আলাদা করবে।"],
                            ['title' => "গ্লোবাল কমিউনিটি", 'desc' => "বিশ্বব্যাপী সমমনাদের সাথে নেটওয়ার্কিং করুন।"]
                        ]
                    ]
                ]
            ],
            [
                'slug' => 'programs',
                'title' => 'Featured Programs',
                'content' => [
                    'en' => [
                        'title' => "Featured Tracks",
                        'subtitle' => "Choose a learning path that suits your career goals."
                    ],
                    'bn' => [
                        'title' => "আমাদের প্রোগ্রামসমূহ",
                        'subtitle' => "আপনার ক্যারিয়ারের লক্ষ্য পূরণের জন্য একটি পথ বেছে নিন।"
                    ]
                ]
            ],
            [
                'slug' => 'events',
                'title' => 'Events Section',
                'content' => [
                    'en' => [
                        'title' => "Upcoming Events",
                        'subtitle' => "Book your seat for the next big thing.",
                        'register' => "Register Now",
                        'viewAll' => "View All Events"
                    ],
                    'bn' => [
                        'title' => "আসন্ন ইভেন্টসমূহ",
                        'subtitle' => "পরবর্তী বড় ইভেন্টের জন্য আপনার সিট বুক করুন।",
                        'register' => "রেজিস্ট্রেশন করুন",
                        'viewAll' => "সব ইভেন্ট দেখুন"
                    ]
                ]
            ],
            [
                'slug' => 'quotes',
                'title' => 'Quotes Section',
                'content' => [
                    'en' => ['title' => "Daily Inspiration"],
                    'bn' => ['title' => "প্রতিদিনের অনুপ্রেরণা"]
                ]
            ],
            [
                'slug' => 'newsletter',
                'title' => 'Newsletter Section',
                'content' => [
                    'en' => [
                        'title' => "Stay in the Loop",
                        'subtitle' => "Subscribe for exclusive updates.",
                        'placeholder' => "Enter your email",
                        'button' => "Subscribe"
                    ],
                    'bn' => [
                        'title' => "আপডেট থাকুন",
                        'subtitle' => "এক্সক্লুসিভ আপডেটের জন্য সাবস্ক্রাইব করুন।",
                        'placeholder' => "আপনার ইমেইল দিন",
                        'button' => "সাবস্ক্রাইব"
                    ]
                ]
            ],
            [
                'slug' => 'about_us',
                'title' => 'About Us Page Content',
                'content' => [
                    'title' => "About SeminarHub",
                    'description' => "SeminarHub is a premier event management platform dedicated to bridging the gap between industry experts and eager learners. Founded in 2026, we have organized over 500 events globally.",
                    'mission' => "To democratize access to professional knowledge.",
                    'vision' => "A world where learning never stops."
                ]
            ]
        ];

        foreach ($sections as $section) {
            \App\Models\FrontendSection::updateOrCreate(
                ['slug' => $section['slug']],
                $section
            );
        }
    }
}
