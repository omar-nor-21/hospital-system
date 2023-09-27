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
        if (Schema::hasTable('ambulances')) return;
        Schema::create('ambulances', function (Blueprint $table) {
            $table->id();
            $table->string('driver_name');
            $table->string('driver_license');
            $table->string('driver_phone');
            $table->string('vehicle_model');
            $table->string('vehicle_year_made');
            $table->string('vehicle_type');
            $table->string('note')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ambulances');
    }
};
