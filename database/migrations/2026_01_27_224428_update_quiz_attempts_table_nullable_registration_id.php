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
        Schema::table('quiz_attempts', function (Blueprint $table) {
            $table->unsignedBigInteger('registration_id')->nullable()->change();
            
            $table->string('participant_name')->nullable()->after('quiz_id');
            $table->string('participant_email')->nullable()->after('participant_name');
            $table->string('participant_phone')->nullable()->after('participant_email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('quiz_attempts', function (Blueprint $table) {
            $table->unsignedBigInteger('registration_id')->nullable(false)->change();
            
            $table->dropColumn(['participant_name', 'participant_email', 'participant_phone']);
        });
    }
};
