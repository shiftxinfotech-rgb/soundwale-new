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
        Schema::table('settings', function (Blueprint $table) {
            $table->string('t1')->nullable();
            $table->string('c1')->nullable();
            $table->string('t2')->nullable();
            $table->string('c2')->nullable();
            $table->string('t3')->nullable();
            $table->string('c3')->nullable();
            $table->string('t4')->nullable();
            $table->string('c4')->nullable();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('settings', function (Blueprint $table) {
            //
        });
    }
};
