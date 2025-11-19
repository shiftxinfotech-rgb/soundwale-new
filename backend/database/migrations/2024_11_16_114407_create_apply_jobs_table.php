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
        Schema::create('apply_jobs', function (Blueprint $table) {
            $table->id(); // Auto-increment primary key
            $table->string('job_name'); // Job name
            $table->string('name'); // Applicant's name
            $table->string('email'); // Applicant's email
            $table->string('phone_number', 20); // Applicant's phone number
            $table->string('resume'); // Resume path or filename
            $table->timestamps(); // created_at and updated_at timestamps
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('apply_jobs');
    }
};
