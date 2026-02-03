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
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->json('title'); // Bilingual
            $table->string('slug')->unique();
            $table->json('description'); // Bilingual (Rich Text)
            $table->string('thumbnail')->nullable();
            $table->decimal('price', 10, 2)->nullable(); // Null = Free
            $table->json('duration')->nullable(); // Bilingual string e.g. "4 Weeks"
            $table->string('level')->default('Beginner'); // Beginner, Intermediate, Advanced
            $table->json('outline')->nullable(); // JSON Array of modules/lessons
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
