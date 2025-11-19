<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up()
    {
        // Create the roles table
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('guard_name');
            $table->timestamps();
        });

        // Create the permissions table
        Schema::create('permissions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('guard_name');
            $table->timestamps();
        });

        // Create the model_has_roles table
        Schema::create('model_has_roles', function (Blueprint $table) {
            $table->id();
            $table->morphs('model');
            $table->foreignId('role_id')->constrained();
            $table->timestamps();
        });

        // Create the model_has_permissions table
        Schema::create('model_has_permissions', function (Blueprint $table) {
            $table->id();
            $table->morphs('model');
            $table->foreignId('permission_id')->constrained();
            $table->timestamps();
        });

        // Create the role_has_permissions table
        Schema::create('role_has_permissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('role_id')->constrained();
            $table->foreignId('permission_id')->constrained();
            $table->timestamps();
        });
    }

    public function down()
    {
        // Drop all tables on rollback
        Schema::dropIfExists('role_has_permissions');
        Schema::dropIfExists('model_has_permissions');
        Schema::dropIfExists('model_has_roles');
        Schema::dropIfExists('permissions');
        Schema::dropIfExists('roles');
    }
    
};
