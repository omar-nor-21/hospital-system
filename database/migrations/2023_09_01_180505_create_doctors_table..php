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
        Schema::create('doctors', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('father_name')->nullable();
            $table->string('mother_name')->nullable();
            $table->string('phone');
            $table->string('sex');
            $table->string('blood_group');
            $table->string('marital_status');
            $table->date('dob');
            $table->date('doj');
            $table->string('photo')->nullable();
            $table->string('emergency_contact')->nullable();
            $table->string('email')->nullable();
            $table->string('qualification')->nullable();
            $table->string('work_experience')->nullable();
            $table->string('specialization')->nullable();
            $table->timestamps();
        });    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('doctors');

    }
};
