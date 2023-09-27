<?php

namespace App\Http\Requests\finance;

use Illuminate\Foundation\Http\FormRequest;

class IncomeRequest extends FormRequest
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
            'income_head' => 'required',
            'invoice_number' => 'required',
            'name' => 'required',
            'amount' => 'required',
        ];
    }
}
