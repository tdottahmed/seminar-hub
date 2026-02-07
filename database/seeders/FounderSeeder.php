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
                'en' => [
                    'name' => "Tanbir Ahmed",
                    'title' => "Founder & CEO",
                    'bio' => "Tanbir is a visionary entrepreneur with a passion for education and technology. With over 10 years of experience in EdTech, he founded SeminarHub to make professional development accessible to all.",
                    'image' => "/images/founder.jpg",
                    'portfolio_link' => "https://tanbir.me"
                ],
                'bn' => [
                    'name' => "তানবীর আহমেদ",
                    'title' => "প্রতিষ্ঠাতা ও প্রধান নির্বাহী",
                    'bio' => "তানবীর একজন দূরদর্শী উদ্যোক্তা যার শিক্ষা ও প্রযুক্তির প্রতি গভীর অনুরাগ রয়েছে। এডটেক খাতে ১০ বছরেরও বেশি অভিজ্ঞতার সাথে, তিনি পেশাগত উন্নয়ন সবার কাছে পৌঁছে দেওয়ার জন্য সেমিনারহাব প্রতিষ্ঠা করেন।",
                    'image' => "/images/founder.jpg",
                    'portfolio_link' => "https://tanbir.me"
                ]
            ]
        ];

        FrontendSection::updateOrCreate(
            ['slug' => $section['slug']],
            $section
        );
    }
}
