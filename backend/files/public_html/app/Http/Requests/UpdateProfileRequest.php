<?php

namespace App\Http\Requests;

use App\Helper\Helper;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation()
    {
        $this->merge(['mobile_number' => Helper::removeLeadingZeroFromMobileNumber(request('mobile_number'))]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'photo' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png',
                'max:2048',
            ],
            'name' => [
                'required',
                'string',
            ],
            'email' => [
                'required',
                'email:rfc,dns',
                Rule::unique('users')->ignore(Auth::user()),
            ],
            'country_code' => [
                'required',
                'string',
                'integer',
            ],
            'mobile_number' => [
                'required',
                'numeric',
                Rule::unique('users')->where('country_code', request('country_code'))->ignore(Auth::user()),
            ],
            'gender' => [
                'required',
                'string',
                'in:Male,Female,Other',
            ],
            'age' => [
                'required',
                'numeric',
            ],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'photo.max' => 'The photo field must not be greater than 2MB.',
        ];
    }
}
