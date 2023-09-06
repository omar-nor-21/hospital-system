<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function patients()
    {
        return $this->hasMany(Patient::class, 'patient_id');
    }

    public function doctors()
    {
        return $this->hasMany(Doctor::class, 'doctor_id');
    }
}
