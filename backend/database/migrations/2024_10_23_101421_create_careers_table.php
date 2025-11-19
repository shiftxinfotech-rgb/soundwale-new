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
        Schema::create('careers', function (Blueprint $table) {
            $table->id(); // Creates an auto-incrementing ID field
            $table->string('full_name')->nullable(); // Full Name field
            $table->string('address')->nullable(); // Address field
            $table->string('city')->nullable(); // City field
            $table->string('state')->nullable(); // State field
            $table->string('zip_code')->nullable(); // Zip Code field
            $table->string('email_address')->nullable(); // Email Address field
            $table->string('phone_number')->nullable(); // Phone Number field
            $table->string('full_time')->nullable(); // Full-time willingness field
            $table->string('license')->nullable(); // Driver's license field
            $table->string('different_shifts')->nullable(); // Shift scheduling field
            $table->string('fluent_in_english')->nullable(); // English fluency field
            $table->text('other_languages')->nullable(); // Other languages field
            $table->string('trained_with_first_aid')->nullable(); // First Aid training field
            $table->string('cpr_certified')->nullable(); // CPR certification field
            $table->text('previous_experience')->nullable(); // Previous experience field
            $table->string('available_start_date')->nullable(); // Availability start date
            $table->string('resume_path')->nullable(); // Path to the attached resume
            $table->timestamps(); // Creates 'created_at' and 'updated_at' fields
        });
    }

    public function down()
    {
        Schema::dropIfExists('careers');
    }
};
