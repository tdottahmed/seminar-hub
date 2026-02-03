<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\OurGoalsSeeder;
use Database\Seeders\FounderSeeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@mail.com',
            'password'=>Hash::make('12345678'),
            'user_type' => 'admin',
        ]);

        $event = \App\Models\Event::create([
            'title' => 'Laravel Global Summit 2024',
            'slug' => 'laravel-global-summit-2024',
            'short_description' => 'The biggest gathering of Laravel developers.',
            'description' => 'Join us for a day of learning and networking with the best in the community.',
            'start_date' => now()->addDays(30),
            'end_date' => now()->addDays(30)->addHours(8),
            'venue' => 'Online',
            'status' => 'published',
            'max_participants' => 500,
        ]);

        $event->sessions()->create([
            'title' => 'Keynote: The Future of PHP',
            'speaker_name' => 'Taylor Otwell',
            'start_time' => '09:00:00',
            'end_time' => '10:00:00',
            'sort_order' => 1,
        ]);

        $quiz = $event->quizzes()->create([
            'title' => 'Laravel Knowledge Check',
            'is_published' => true,
            'time_limit_minutes' => 15,
        ]);

        $quiz->questions()->create([
            'question_text' => 'What is the latest version of Laravel?',
            'type' => 'multiple_choice',
            'options' => json_encode(['10', '11', '12', '9']),
            'correct_answer' => '11',
        ]);

        $event->registrations()->create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'status' => 'pending',
        ]);

        $event->registrations()->create([
            'name' => 'Jane Smith',
            'email' => 'jane@example.com',
            'status' => 'approved',
        ]);

        $this->call([
            UserSeeder::class,
            FrontendSectionSeeder::class,
            OurGoalsSeeder::class,
            FounderSeeder::class,
        ]);
    }
}
