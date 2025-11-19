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
        Schema::create('advantages', function (Blueprint $table) {
            $table->id();
            $table->string('image')->nullable();        // Field for storing image paths
            $table->string('title');                    // Field for title
            $table->text('description')->nullable();    // Field for description
            $table->integer('sequence')->default(0);    // Field for sequence/order
            $table->tinyInteger('status')->default(0)->comment('0: Inactive, 1: Active');
            $table->timestamps();                       // Laravel's created_at and updated_at timestamps
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('advantages');
    }
};
