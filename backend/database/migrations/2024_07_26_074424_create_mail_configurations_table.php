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
        Schema::create('mail_configurations', function (Blueprint $table) {
            $table->id();
            $table->string('mail_mailer')->default('smtp'); // e.g., smtp, mail, sendmail, etc.
            $table->string('mail_host')->nullable(); // e.g., smtp.mailtrap.io
            $table->integer('mail_port')->nullable(); // e.g., 587
            $table->string('mail_username')->nullable();
            $table->string('mail_password')->nullable();
            $table->string('mail_encryption')->nullable(); // e.g., tls, ssl
            $table->string('mail_from_address')->nullable(); // e.g., noreply@example.com
            $table->string('mail_from_name')->nullable(); // e.g., Your App Name
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
        Schema::dropIfExists('mail_configurations');
    }
};
