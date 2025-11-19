<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('talent_seeker', function (Blueprint $table) {
            $table->id(); // Primary key

            $table->string('name');
            $table->string('designation')->nullable();
            $table->string('company_name');
            $table->string('mobile_no')->nullable();
            $table->string('work_email')->unique();
            $table->string('skype')->nullable();
            $table->string('company_website')->nullable();
            $table->string('city')->nullable();
            $table->text('job_description')->nullable();

            $table->timestamps(); // Adds created_at and updated_at columns
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('talent_seeker');
    }
};
