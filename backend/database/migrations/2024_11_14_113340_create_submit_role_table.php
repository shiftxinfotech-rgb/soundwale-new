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
        Schema::create('submit_role', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->string('job');
            $table->unsignedInteger('hires')->default(1);
            $table->text('job_description');
            $table->enum('time', ['Full-Time', 'Part-Time', 'Contract', 'Temporary'])->default('Full-Time');
            $table->string('location');
            $table->decimal('salary', 10, 2);
            $table->date('start_date');
            $table->string('name');
            $table->string('business');
            $table->string('email')->unique();
            $table->string('phone_number')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('submit_role');
    }
};
