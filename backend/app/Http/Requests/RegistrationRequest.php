<?php

namespace App\Http\Requests;

use App\Helper\Helper;
use App\Rules\PasswordComplexity;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RegistrationRequest extends FormRequest
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
                'required',
                'image',
                'mimes:jpg,jpeg,png',
                'max:10240',
            ],
            'name' => [
                'required',
                'string',
            ],
            'type' => [
                'required',
                'string',
                'in:1,2',
            ],
            'email' => [
                'required',
                'email:rfc,dns',
                'unique:users',
            ],
            'country_code' => [
                'required',
                'string',
                'integer',
            ],
            'mobile_number' => [
                'required',
                'numeric',
                Rule::unique('users')->where('country_code', request('country_code')),
            ],
            'password' => [
                'required',
                'confirmed',
                new PasswordComplexity,
            ],
            'password_confirmation' => [
                'required',
            ],
            'photo' => [
                'nullable',
                'max:10240',
                'mimetypes:image/jpeg,image/jpg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
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
            'photo.max' => 'The photo field must not be greater than 10MB.',
            'proof.max' => 'The proof field must not be greater than 10MB.',
        ];
    }
}
