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
        Schema::table('about_us', function (Blueprint $table) {
            $table->string('what_we_do_image')->nullable();
            $table->text('what_we_do_description')->nullable();
            $table->string('our_vision_image')->nullable();
            $table->text('our_vision_description')->nullable();
            $table->string('our_mission_image')->nullable();
            $table->text('our_mission_description')->nullable();
        });
    }

    public function down()
    {
        Schema::table('about_us', function (Blueprint $table) {
            $table->dropColumn([
                'what_we_do_image',
                'what_we_do_description',
                'our_vision_image',
                'our_vision_description',
                'our_mission_image',
                'our_mission_description'
            ]);
        });
    }
};
