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
        Schema::create('book_services', function (Blueprint $table) {
            $table->id(); // Auto-incrementing primary key
            $table->string('name'); // Auto-incrementing primary key
            $table->string('email'); // User's email address
            $table->string('phone'); // User's phone number
            $table->foreignId('service_id')->constrained('services'); // Foreign key to services table
            $table->text('message')->nullable(); // Optional message field
            $table->timestamps(); // Created at and updated at timestamps
        });
    }

    public function down()
    {
        Schema::dropIfExists('book_services');
    }
};
