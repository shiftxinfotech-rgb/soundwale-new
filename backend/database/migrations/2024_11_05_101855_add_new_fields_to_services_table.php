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
        Schema::table('services', function (Blueprint $table) {
            $table->text('short_content')->nullable()->after('image');
            $table->text('location')->nullable()->after('short_content');
            $table->text('work_type')->nullable()->after('location');
            $table->text('salary')->nullable()->after('work_type');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn(['short_content', 'location', 'work_type', 'salary']);
        });
    }
};
