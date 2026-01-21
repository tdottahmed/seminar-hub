<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\FrontendSection;

class FrontendContentSeeder extends Seeder
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
                        'badge' => 'New Seminars Added Weekly',
                        'titlePrefix' => 'Unlock Your',
                        'words' => ['Creative Potential', 'Future Career', 'Hidden Talent', 'Digital Success'],
                        'subtext' => 'Join the premier platform for professional development. Master new skills through immersive, hands-on events and workshops.',
                        'ctaPrimary' => 'Browse Events',
                        'ctaSecondary' => 'Learn More',
                        'images' => [
                            "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000",
                            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2000",
                            "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=2000",
                        ]
                    ],
                    'bn' => [
                        'badge' => 'প্রতি সপ্তাহে নতুন সেমিনার যোগ করা হয়',
                        'titlePrefix' => 'উন্মোচন করুন আপনার',
                        'words' => ['সৃজনশীল সম্ভাবনা', 'ভবিষ্যৎ ক্যারিয়ার', 'সুপ্ত প্রতিভা', 'ডিজিটাল সাফল্য'],
                        'subtext' => 'পেশাগত উন্নয়নের জন্য সেরা প্ল্যাটফর্মে যোগ দিন। হাতে-কলমে শিক্ষা এবং ওয়ার্কশপের মাধ্যমে নতুন দক্ষতা অর্জন করুন।',
                        'ctaPrimary' => 'ইভেন্ট দেখুন',
                        'ctaSecondary' => 'আরও জানুন',
                        'images' => [
                            "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000",
                            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2000",
                            "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=2000",
                        ]
                    ]
                ]
            ],
            [
                'slug' => 'trusted-by',
                'title' => 'Trusted Companies',
                'content' => [
                    'en' => [
                         'title' => 'Trusted By Leading Organizations',
                         'subtitle' => 'Partnering with industry leaders to deliver exceptional learning experiences',
                         'companies' => [
                             ['name' => 'Google', 'logo_url' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png'],
                             ['name' => 'Microsoft', 'logo_url' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png'],
                             ['name' => 'Amazon', 'logo_url' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png'],
                             ['name' => 'Adobe', 'logo_url' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Adobe_Systems_logo_and_wordmark.svg/2560px-Adobe_Systems_logo_and_wordmark.svg.png'],
                             ['name' => 'IBM', 'logo_url' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png'],
                             ['name' => 'Meta', 'logo_url' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/2560px-Meta_Platforms_Inc._logo.svg.png'],
                         ]
                    ],
                    'bn' => [
                         'title' => 'শীর্ষ সংস্থাগুলোর আস্থাভাজন',
                         'subtitle' => 'অসাধারণ শিক্ষার অভিজ্ঞতা প্রদানের জন্য শিল্প নেতাদের সাথে অংশীদারিত্ব',
                         'companies' => [
                             ['name' => 'Google', 'logo_url' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png'],
                             ['name' => 'Microsoft', 'logo_url' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png'],
                             ['name' => 'Amazon', 'logo_url' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png'],
                             ['name' => 'Adobe', 'logo_url' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Adobe_Systems_logo_and_wordmark.svg/2560px-Adobe_Systems_logo_and_wordmark.svg.png'],
                             ['name' => 'IBM', 'logo_url' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png'],
                             ['name' => 'Meta', 'logo_url' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/2560px-Meta_Platforms_Inc._logo.svg.png'],
                         ]
                    ]
                ]
            ],
            [
                'slug' => 'stats',
                'title' => 'Statistics',
                'content' => [
                    'en' => [
                        'title' => 'Our Impact',
                        'stats' => [
                            ['number' => '500+', 'label' => 'Events Hosted', 'icon' => 'Calendar'],
                            ['number' => '10K+', 'label' => 'Participants', 'icon' => 'Users'],
                            ['number' => '50+', 'label' => 'Expert Mentors', 'icon' => 'Award'],
                            ['number' => '95%', 'label' => 'Satisfaction Rate', 'icon' => 'Star'],
                        ]
                    ],
                    'bn' => [
                        'title' => 'আমাদের প্রভাব',
                        'stats' => [
                            ['number' => '৫০০+', 'label' => 'আয়োজিত ইভেন্ট', 'icon' => 'Calendar'],
                            ['number' => '১০হাজার+', 'label' => 'অংশগ্রহণকারী', 'icon' => 'Users'],
                            ['number' => '৫০+', 'label' => 'বিশেষজ্ঞ পরামর্শদাতা', 'icon' => 'Award'],
                            ['number' => '৯৫%', 'label' => 'সন্তুষ্টির হার', 'icon' => 'Star'],
                        ]
                    ]
                ]
            ],
            [
                'slug' => 'about',
                'title' => 'About Section',
                'content' => [
                    'en' => [
                        'title' => 'Why Choose Prochesta IT?',
                        'desc' => 'We curate experiences that go beyond traditional learning. Join thousands who have transformed their careers with us.',
                        'features' => [
                            ['title' => 'Industry Experts Mentors', 'desc' => 'Learn from industry experts with real-world experience.', 'icon' => 'Crown'],
                            ['title' => 'Hands-on Projects', 'desc' => 'Build a portfolio that stands out in the competitive market.', 'icon' => 'Briefcase'],
                            ['title' => 'Global Community', 'desc' => 'Network with peers worldwide and expand your connections.', 'icon' => 'Globe'],
                            ['title' => 'Career Support', 'desc' => 'Get personalized career guidance and job placement assistance.', 'icon' => 'Target'],
                        ]
                    ],
                    'bn' => [
                        'title' => 'কেন Prochesta IT বেছে নেবেন?',
                        'desc' => 'আমরা এমন অভিজ্ঞতা তৈরি করি যা গতানুগতিক শিক্ষার বাইরে। আমাদের সাথে ক্যারিয়ার পরিবর্তনকারী হাজার হাজার মানুষের সাথে যোগ দিন।',
                        'features' => [
                            ['title' => 'বিশ্বমানের মেন্টর', 'desc' => 'বাস্তব অভিজ্ঞতাসম্পন্ন শিল্প বিশেষজ্ঞদের কাছ থেকে শিখুন।', 'icon' => 'Crown'],
                            ['title' => 'হাতে-কলমে প্রজেক্ট', 'desc' => 'প্রতিযোগিতামূলক বাজারে আলাদা করে এমন পোর্টফোলিও তৈরি করুন।', 'icon' => 'Briefcase'],
                            ['title' => 'বৈশ্বিক সম্প্রদায়', 'desc' => 'বিশ্বব্যাপী সমমনাদের সাথে নেটওয়ার্কিং করুন এবং আপনার সংযোগ প্রসারিত করুন।', 'icon' => 'Globe'],
                            ['title' => 'ক্যারিয়ার সহায়তা', 'desc' => 'ব্যক্তিগতকৃত ক্যারিয়ার নির্দেশনা এবং চাকরি প্লেসমেন্ট সহায়তা পান।', 'icon' => 'Target'],
                        ]
                    ]
                ]
            ],
            [
                'slug' => 'programs',
                'title' => 'Programs Section',
                'content' => [
                    'en' => [
                        'title' => 'Featured Learning Paths',
                        'subtitle' => 'Choose a learning path that suits your career goals and interests',
                        'viewAll' => 'View All Programs',
                    ],
                    'bn' => [
                        'title' => 'বিশেষ শিক্ষার পথ',
                        'subtitle' => 'আপনার ক্যারিয়ারের লক্ষ্য এবং আগ্রহ অনুযায়ী একটি শিক্ষার পথ বেছে নিন',
                        'viewAll' => 'সব প্রোগ্রাম দেখুন',
                    ]
                ]
            ],
            [
                'slug' => 'how-it-works',
                'title' => 'How It Works',
                'content' => [
                    'en' => [
                        'title' => 'How It Works',
                        'subtitle' => 'Simple steps to start your learning journey',
                        'steps' => [
                            ['number' => '01', 'title' => 'Explore Programs', 'desc' => 'Browse through our curated collection of events and programs', 'icon' => 'SearchIcon'],
                            ['number' => '02', 'title' => 'Register & Enroll', 'desc' => 'Secure your spot with easy registration process', 'icon' => 'UserPlusIcon'],
                            ['number' => '03', 'title' => 'Learn & Network', 'desc' => 'Attend sessions, connect with peers and mentors', 'icon' => 'Users'],
                            ['number' => '04', 'title' => 'Get Certified', 'desc' => 'Receive certification and career support', 'icon' => 'Award'],
                        ]
                    ],
                    'bn' => [
                        'title' => 'কিভাবে কাজ করে',
                        'subtitle' => 'আপনার শিক্ষার যাত্রা শুরু করার সহজ পদক্ষেপ',
                        'steps' => [
                            ['number' => '০১', 'title' => 'প্রোগ্রাম এক্সপ্লোর করুন', 'desc' => 'আমাদের নির্বাচিত ইভেন্ট এবং প্রোগ্রামের সংগ্রহ ব্রাউজ করুন', 'icon' => 'SearchIcon'],
                            ['number' => '০২', 'title' => 'নিবন্ধন করুন', 'desc' => 'সহজ নিবন্ধন প্রক্রিয়ার মাধ্যমে আপনার স্থান সুরক্ষিত করুন', 'icon' => 'UserPlusIcon'],
                            ['number' => '০৩', 'title' => 'শিখুন ও নেটওয়ার্ক করুন', 'desc' => 'সেশনে অংশ নিন, সহকর্মী এবং পরামর্শদাতাদের সাথে সংযোগ স্থাপন করুন', 'icon' => 'Users'],
                            ['number' => '০৪', 'title' => 'সার্টিফিকেট পান', 'desc' => 'সার্টিফিকেশন এবং ক্যারিয়ার সহায়তা পান', 'icon' => 'Award'],
                        ]
                    ]
                ]
            ],
            [
                'slug' => 'team',
                'title' => 'Team Section',
                'content' => [
                    'en' => [
                        'title' => 'Meet Our Team',
                        'subtitle' => 'The passionate professionals behind Prochesta IT',
                        'viewDetails' => 'View Profile',
                        'teamLead' => 'Team Lead',
                        'members' => 'Team Members',
                    ],
                    'bn' => [
                        'title' => 'আমাদের টিমের সাথে পরিচিত হোন',
                        'subtitle' => 'Prochesta IT এর পেছনের উদ্যমী পেশাদাররা',
                        'viewDetails' => 'প্রোফাইল দেখুন',
                        'teamLead' => 'টিম লিড',
                        'members' => 'টিম সদস্য',
                    ]
                ]
            ],
            [
                'slug' => 'testimonials',
                'title' => 'Testimonials Section',
                'content' => [
                    'en' => [
                        'title' => 'What Our Participants Say',
                        'subtitle' => 'Real stories from real people who transformed their careers',
                    ],
                    'bn' => [
                        'title' => 'আমাদের অংশগ্রহণকারীদের মতামত',
                        'subtitle' => 'যারা তাদের ক্যারিয়ার পরিবর্তন করেছেন তাদের বাস্তব গল্প',
                    ]
                ]
            ],
            [
                 'slug' => 'gallery',
                 'title' => 'Gallery Section',
                 'content' => [
                     'en' => [
                         'title' => 'Captured Moments',
                         'subtitle' => 'Glimpses from our recent events and workshops',
                         'viewAll' => 'View All Photos',
                     ],
                     'bn' => [
                         'title' => 'ধরা পড়া মুহূর্ত',
                         'subtitle' => 'আমাদের সাম্প্রতিক ইভেন্ট এবং কর্মশালার ঝলক',
                         'viewAll' => 'সব ছবি দেখুন',
                     ]
                 ]
            ],
            [
                'slug' => 'faq',
                'title' => 'FAQ Section',
                'content' => [
                    'en' => [
                        'title' => 'Frequently Asked Questions',
                        'subtitle' => 'Find answers to common questions about our platform',
                    ],
                    'bn' => [
                        'title' => 'প্রায়শই জিজ্ঞাসিত প্রশ্ন',
                        'subtitle' => 'আমাদের প্ল্যাটফর্ম সম্পর্কে সাধারণ প্রশ্নের উত্তর খুঁজুন',
                    ]
                ]
            ],
            [
                'slug' => 'cta',
                'title' => 'Call To Action',
                'content' => [
                    'en' => [
                        'title' => 'Ready to Transform Your Career?',
                        'subtitle' => 'Join thousands of successful professionals today',
                        'button' => 'Get Started Free',
                        'secondary' => 'Contact Sales',
                    ],
                    'bn' => [
                        'title' => 'আপনার ক্যারিয়ার পরিবর্তন করার জন্য প্রস্তুত?',
                        'subtitle' => 'আজই হাজার হাজার সফল পেশাদারের সাথে যোগ দিন',
                        'button' => 'বিনামূল্যে শুরু করুন',
                        'secondary' => 'সেলসের সাথে যোগাযোগ করুন',
                    ]
                ]
            ],
            [
                'slug' => 'footer',
                'title' => 'Footer Section',
                'content' => [
                    'en' => [
                        'description' => 'Building a community of lifelong learners and industry leaders. Join us to reshape your future.',
                        'quickLinks' => 'Quick Links',
                        'programs' => 'Programs',
                        'events' => 'Events',
                        'mentors' => 'Mentors',
                        'pricing' => 'Pricing',
                        'company' => 'Company',
                        'about' => 'About Us',
                        'careers' => 'Careers',
                        'blog' => 'Blog',
                        'press' => 'Press',
                        'support' => 'Support',
                        'help' => 'Help Center',
                        'contact' => 'Contact Us',
                        'privacy' => 'Privacy Policy',
                        'terms' => 'Terms of Service',
                        'copyright' => 'All rights reserved',
                        'followUs' => 'Follow Us',
                    ],
                    'bn' => [
                        'description' => 'জীবনব্যাপী শিক্ষার্থী এবং শিল্প নেতাদের সম্প্রদায় গড়ে তোলা। আপনার ভবিষ্যৎ পুনর্নির্মাণ করতে আমাদের সাথে যোগ দিন।',
                        'quickLinks' => 'দ্রুত লিংক',
                        'programs' => 'প্রোগ্রামসমূহ',
                        'events' => 'ইভেন্টসমূহ',
                        'mentors' => 'পরামর্শদাতা',
                        'pricing' => 'মূল্য নির্ধারণ',
                        'company' => 'কোম্পানি',
                        'about' => 'আমাদের সম্পর্কে',
                        'careers' => 'ক্যারিয়ার',
                        'blog' => 'ব্লগ',
                        'press' => 'প্রেস',
                        'support' => 'সহায়তা',
                        'help' => 'সহায়তা কেন্দ্র',
                        'contact' => 'যোগাযোগ করুন',
                        'privacy' => 'গোপনীয়তা নীতি',
                        'terms' => 'সেবার শর্তাবলী',
                        'copyright' => 'সমস্ত অধিকার সংরক্ষিত',
                        'followUs' => 'আমাদের অনুসরণ করুন',
                    ]
                ]
            ]
        ];

        foreach ($sections as $section) {
            FrontendSection::updateOrCreate(
                ['slug' => $section['slug']],
                $section
            );
        }
    }
}
