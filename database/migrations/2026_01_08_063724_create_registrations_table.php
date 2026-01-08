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
        Schema::create('registrations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('organization')->nullable();
            $table->string('designation')->nullable();
            $table->string('status')->default('pending'); // pending, approved, rejected, shortlisted, attended
            $table->json('custom_answers')->nullable(); // Answers to dynamic event questions
            $table->string('email_token')->nullable()->unique(); // For accessing quizzes without login
            $table->timestamps();
            
            $table->unique(['event_id', 'email']); // Prevent duplicate registration for same event
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registrations');
    }
};
