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
        if (Schema::hasTable('pharmacies')) return;
        Schema::create('pharmacies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->constrained(table: 'patients')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('medicine_id')->constrained(table: 'medicines')->onUpdate('cascade')->onDelete('cascade');
            $table->string('price');
            $table->string('quantity');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pharmacies');
    }
};
