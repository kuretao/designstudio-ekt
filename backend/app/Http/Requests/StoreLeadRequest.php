<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreLeadRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'source' => ['nullable', 'string', 'max:120'],
            'channel' => ['nullable', 'string', 'max:120'],
            'name' => ['nullable', 'string', 'max:190'],
            'contact' => ['required', 'string', 'max:190'],
            'service' => ['nullable', 'string', 'max:190'],
            'message' => ['nullable', 'string', 'max:5000'],
            'payload' => ['nullable', 'array'],
        ];
    }
}
