<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function appointments()
    {
        return $this->hasMany(Appointment::class, 'patient_id');
    }

    public function pharmacies()
    {
        return $this->hasMany(Pharmacy::class, 'patient_id');
    }
}
