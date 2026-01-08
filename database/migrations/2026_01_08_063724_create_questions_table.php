<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Drop table if it exists (from previous failed migration)
        Schema::dropIfExists('questions');
        
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('quiz_id');
            $table->string('type')->default('multiple_choice'); // multiple_choice, true_false, short_answer
            $table->text('question_text');
            $table->json('options')->nullable(); // For MCQ
            $table->text('correct_answer')->nullable(); // Store key or text
            $table->integer('points')->default(1);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
            
            $table->foreign('quiz_id')
                  ->references('id')
                  ->on('quizzes')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
