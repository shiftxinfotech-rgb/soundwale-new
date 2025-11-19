<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PropertyListRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    // public function authorize(): bool
    // {
    //     return true;
    // }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'current_page' => ['int'],
            'limit' => ['int'],
            'latitude' => ['required'],
            'longitude' => ['required'],
            'q_bedroom_lock' => ['nullable', 'in:Yes,No'],
            'q_amenities' => ['nullable', 'array'],
            'q_host_lang' => ['nullable', 'array'],
            'q_instant_book' => ['nullable', 'in:Yes,No'],
            'q_self_check_in' => ['nullable', 'in:Yes,No'],
            'q_allow_pet' => ['nullable', 'in:Yes,No'],
            'availability_date' => ['nullable', 'date', 'date_format:Y-m-d'],
        ];
    }

    public function attributes(): array
    {
        return [
            'q_bedroom_lock' => 'Bedroom lock',
            'q_amenities' => 'Amenities',
            'q_host_lang' => 'Host language',
            'q_instant_book' => 'Instant book',
            'q_self_check_in' => 'Self check in',
            'q_allow_pet' => 'Allow pet',
        ];
    }
}
