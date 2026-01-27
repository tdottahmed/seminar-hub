<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use App\Models\Question;

class ImportQuestions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:questions {file=public/assets/ai-quiz-questions.json} {--quiz_id= : Override the quiz_id in the file}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import questions from a JSON file';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $fileArg = $this->argument('file');
        // Handle absolute vs relative path
        $filePath = str_starts_with($fileArg, '/') ? $fileArg : base_path($fileArg);
        
        if (!File::exists($filePath)) {
            $this->error("File not found: $filePath");
            return 1;
        }

        $json = File::get($filePath);
        $questions = json_decode($json, true);

        if (!$questions) {
            $this->error("Invalid JSON format");
            return 1;
        }

        $count = count($questions);
        $this->info("Found $count questions.");
        
        if ($this->option('quiz_id')) {
            $this->info("Overriding quiz_id with: " . $this->option('quiz_id'));
        }

        if (!$this->confirm("Do you want to import these $count questions?", true)) {
            return 0;
        }

        $bar = $this->output->createProgressBar($count);
        $bar->start();

        foreach ($questions as $data) {
            $quizId = $this->option('quiz_id') ?? $data['quiz_id'];
            
            try {
                Question::create([
                    'quiz_id' => $quizId,
                    'type' => $data['type'],
                    'level' => $data['level'] ?? 'medium', // Default to medium if not present
                    'question_text' => $data['question_text'],
                    'options' => $data['options'],
                    'correct_answer' => $data['correct_answer'],
                    'points' => $data['points'] ?? 1,
                    'sort_order' => $data['sort_order'] ?? 0,
                ]);
            } catch (\Exception $e) {
                // Log but continue? Or just fail?
                // Using error output allowing user to see issues
                $this->line(''); // New line to break progress bar
                $this->error("Failed to import question: '{$data['question_text']}'. Error: " . $e->getMessage());
            }

            $bar->advance();
        }

        $bar->finish();
        $this->info("\nImport completed successfully.");
        return 0;
    }
}
