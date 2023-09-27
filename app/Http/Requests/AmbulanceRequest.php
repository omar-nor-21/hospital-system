<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AmbulanceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'driver_name' => 'required',
            'driver_license' => 'required',
            'driver_phone' => 'required',
            'vehicle_year_made' => 'required',
            'vehicle_model' => 'required',
            'vehicle_type' => 'required',

        ];
    }
}
