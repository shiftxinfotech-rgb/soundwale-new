<?php

namespace App\Http\Requests\Admin;

use App\Helper\Helper;
use App\Rules\PasswordComplexity;
use Illuminate\Validation\Rule;

class UpdateSellerRequest extends CreateSellerRequest
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
        return array_merge(parent::rules(), [
            'edit_id' => ['required', 'exists:users,id'],
            'email' => ['required', 'email:rfc,dns', 'string', Rule::unique('users', 'email')->ignore(request('edit_id'))],
            'password' => ['nullable', new PasswordComplexity],
            'mobile_number' => [
                'required',
                'numeric',
                Rule::unique('users')->where('country_code', request('country_code'))->ignore(request('edit_id')),
            ],
        ]);
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            //
        ];
    }
}
