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
        return $this->belongsTo(Patient::class, 'id');
    }

    public function doctors()
    {
        return $this->belongsTo(Doctor::class, 'id');
    }
}
