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
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('has_deletion_request')->default(false);
            $table->longText('deletion_reason')->nullable();
            $table->longText('admin_deletion_reason')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user', function (Blueprint $table) {
            $table->dropColumn('has_deletion_request');
            $table->dropColumn('deletion_reason');
            $table->dropColumn('admin_deletion_reason');
        });
    }
};
