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
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->date('appointment_date');
            $table->foreignId('doctor_id')->constrained(table: 'doctors')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('patient_id')->constrained(table: 'patients')->onUpdate('cascade')->onDelete('cascade');
            $table->string('doctor_fee');
            $table->string('shift')->nullable();
            $table->string('priority')->default('normal');
            $table->string('status')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
