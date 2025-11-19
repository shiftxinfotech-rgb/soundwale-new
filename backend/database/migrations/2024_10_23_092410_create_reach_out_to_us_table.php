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
        Schema::create('reach_out_to_us', function (Blueprint $table) {
            $table->id(); // Creates an auto-incrementing ID field
            $table->string('name'); // Creates a 'name' field of type string
            $table->string('email'); // Creates an 'email' field of type string
            $table->text('message'); // Creates a 'message' field of type text
            $table->timestamps(); // Creates 'created_at' and 'updated_at' fields
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reach_out_to_us');
    }
};
