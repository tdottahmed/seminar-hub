<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiService
{
    protected string $apiKey;
    protected string $baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent';

    public function __construct()
    {
        $this->apiKey = config('services.gemini.api_key', env('GEMINI_API_KEY'));
    }

    /**
     * Generate quiz questions based on a topic or context.
     *
     * @param string $prompt
     * @param int $count
     * @param string $difficulty
     * @return array
     */
    public function generateQuestions(string $topic, int $count = 5, string $difficulty = 'medium'): array
    {
        if (empty($this->apiKey)) {
            throw new \Exception('Gemini API key is not configured.');
        }

        $systemInstruction = "You are a quiz generator. Generate {$count} multiple-choice questions about '{$topic}' at a '{$difficulty}' difficulty level. 
        Return ONLY a raw JSON array (no markdown, no code blocks) with the following structure for each question:
        [
            {
                \"question_text\": \"The question string\",
                \"options\": [\"Option 1\", \"Option 2\", \"Option 3\", \"Option 4\"],
                \"correct_answer\": \"The correct option string (must be one of the options)\",
                \"points\": 1
            }
        ]";

        try {
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
            ])->post("{$this->baseUrl}?key={$this->apiKey}", [
                'contents' => [
                    [
                        'parts' => [
                            ['text' => $systemInstruction]
                        ]
                    ]
                ],
                'generationConfig' => [
                    'temperature' => 0.7,
                    'topK' => 40,
                    'topP' => 0.95,
                    'maxOutputTokens' => 8192,
                    'responseMimeType' => 'application/json',
                ]
            ]);

            if ($response->failed()) {
                Log::error('Gemini API Error', ['response' => $response->body()]);
                throw new \Exception('Failed to communicate with AI service.');
            }

            $data = $response->json();
            
            // Extract the text content
            $content = $data['candidates'][0]['content']['parts'][0]['text'] ?? '[]';
            
            // Parse JSON
            $questions = json_decode($content, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                Log::error('Gemini API JSON Parse Error', ['content' => $content, 'error' => json_last_error_msg()]);
                // Try to clean up markdown if present despite instructions
                $content = preg_replace('/^```json\s*|\s*```$/', '', $content);
                $questions = json_decode($content, true);
                
                if (json_last_error() !== JSON_ERROR_NONE) {
                    throw new \Exception('Failed to parse AI response.');
                }
            }

            return $questions;

        } catch (\Exception $e) {
            Log::error('Gemini Service Exception', ['message' => $e->getMessage()]);
            throw $e;
        }
    }
}
