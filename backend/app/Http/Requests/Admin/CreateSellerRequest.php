<?php

namespace App\Http\Requests\Admin;

use App\Helper\Helper;
use App\Rules\PasswordComplexity;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateSellerRequest extends FormRequest
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
                'max:2048',
                'mimes:jpg,jpeg,png',
            ],
            'name' => [
                'required',
                'string',
                'max:150',
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
                new PasswordComplexity,
            ],
            'gender' => [
                'required',
                'string',
                'in:Male,Female,Other',
            ],
            'age' => [
                'nullable',
                'numeric',
            ],
            'proof' => [
                'nullable',
                'max:5120',
                'mimetypes:image/jpeg,image/jpg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            ],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages()
    {
        return [
            'photo.max' => 'The image field must not be greater than 2MB.',
            'proof.max' => 'The proof field must not be greater than 5MB.',
        ];
    }
}
