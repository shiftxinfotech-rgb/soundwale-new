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
        Schema::create('free_estimate', function (Blueprint $table) {
            $table->id(); // Creates an auto-incrementing ID field
            $table->string('location')->nullable(); // Location field
            $table->string('transport_type')->nullable(); // Transport Type field
            $table->string('first_name')->nullable(); // First Name field
            $table->string('last_name')->nullable(); // Last Name field
            $table->string('email_address')->nullable(); // Email Address field
            $table->string('phone_number')->nullable(); // Phone Number field
            $table->string('relationship_to_patient')->nullable(); // Relationship to Patient field
            $table->string("patients_name")->nullable(); // Patient's Name field
            $table->text('transport_time')->nullable(); // Transport Time field
            $table->text('transport_date')->nullable(); // Transport Date field
            $table->string('pickup_address')->nullable(); // Pick up Address field
            $table->string('destination_address')->nullable(); // Destination Address field
            $table->boolean('roundtrip')->nullable(); // Roundtrip field
            $table->text('additional_information')->nullable()->nullable(); // Additional Information field
            $table->timestamps(); // Creates 'created_at' and 'updated_at' fields
        });
    }

    public function down()
    {
        Schema::dropIfExists('free_estimate');
    }
};
