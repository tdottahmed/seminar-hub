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
        Schema::table('teams', function (Blueprint $table) {
            $table->string('portfolio_url')->nullable()->after('photo');
        });

        Schema::table('speakers', function (Blueprint $table) {
            $table->string('portfolio_url')->nullable()->after('photo');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('teams', function (Blueprint $table) {
            $table->dropColumn('portfolio_url');
        });

        Schema::table('speakers', function (Blueprint $table) {
            $table->dropColumn('portfolio_url');
        });
    }
};
