<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Doctor extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function appointments()
    {
        return $this->hasMany(Appointment::class, 'doctor_id');
    }
    protected function photo(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => url('uploads/' . $value),
        );
    }
}
