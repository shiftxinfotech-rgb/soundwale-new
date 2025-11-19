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
        Schema::create('location', function (Blueprint $table) {
            $table->id(); // Creates an auto-incrementing ID field
            $table->string('name'); // Name field
            $table->boolean('status')->default(0);
            $table->timestamps(); // Creates 'created_at' and 'updated_at' fields
        });
    }

    public function down()
    {
        Schema::dropIfExists('location');
    }
};
