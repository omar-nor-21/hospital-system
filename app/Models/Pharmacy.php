<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pharmacy extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function patients()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }
    public function medicines()
    {
        return $this->belongsTo(Medicine::class, 'medicine_id');
    }
}
