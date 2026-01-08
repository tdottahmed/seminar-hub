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
        Schema::dropIfExists('event_sessions');
        
        Schema::create('event_sessions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('event_id');
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('speaker_name')->nullable();
            $table->text('speaker_bio')->nullable(); // Or link to a Speaker model if needed later
            $table->time('start_time')->nullable();
            $table->time('end_time')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
            
            $table->foreign('event_id')
                  ->references('id')
                  ->on('events')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_sessions');
    }
};
