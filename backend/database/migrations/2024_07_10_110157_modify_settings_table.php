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
            $table->string('header_logo')->after('id')->nullable();
            $table->string('footer_logo')->after('header_logo')->nullable();
            $table->text('registered_address')->after('footer_logo')->nullable();
            $table->text('factory_address')->after('registered_address')->nullable();
            $table->string('email')->after('factory_address')->nullable();
            $table->string('phone_number')->after('email')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('settings', function (Blueprint $table) {
            $table->dropColumn([
                'header_logo',
                'footer_logo',
                'registered_address',
                'factory_address',
                'email',
                'phone_number'
            ]);
        });
    }
};
