<?php

namespace App\Http\Requests;

use App\Enums\DescribeRoomEnum;
use App\Enums\PropertyTypeEnum;
use App\Models\Property;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class PropertyCreateRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $step = $this->input('step');

        switch ($step) {
            case 1:
                return [
                    'title' => [
                        'required',
                        'max:150',
                        'string',
                        Rule::unique('property')->where(function ($query) {
                            return $query->where('user_id', auth()->id());
                        })->ignore($this->property_id),
                    ],
                    'description' => 'required|string',
                    'price' => 'required|decimal:0,9999',
                    'property_id' => [
                        'nullable',
                        'integer',
                        'exists:property,id',
                        function ($attribute, $value, $fail) {
                            if (! Property::where('id', $value)->where('user_id', auth()->id())->exists()) {
                                $fail('The selected property does not belong to you.');
                            }
                        },
                    ],

                ];
            case 2:
                return [
                    'property_id' => [
                        'required',
                        'integer',
                        'exists:property,id',
                        function ($attribute, $value, $fail) {
                            if (! Property::where('id', $value)->where('user_id', auth()->id())->exists()) {
                                $fail('The selected property does not belong to you.');
                            }
                        },
                    ],
                    'address' => 'required|string',
                    'latitude' => 'required|numeric',
                    'longitude' => 'required|numeric',
                ];
            case 3:
                return [
                    'property_id' => [
                        'required',
                        'integer',
                        'exists:property,id',
                        function ($attribute, $value, $fail) {
                            if (! Property::where('id', $value)->where('user_id', auth()->id())->exists()) {
                                $fail('The selected property does not belong to you.');
                            }
                        },
                    ],
                    'country' => 'required|string',
                    'house' => 'nullable',
                    'street_address' => 'nullable',
                    'landmark' => 'nullable',
                    'district' => 'required',
                    'city' => 'required',
                    'state' => 'required',
                    'pincode' => 'required',
                ];
            case 4:
                return [
                    'property_id' => [
                        'required',
                        'integer',
                        'exists:property,id',
                        function ($attribute, $value, $fail) {
                            if (! Property::where('id', $value)->where('user_id', auth()->id())->exists()) {
                                $fail('The selected property does not belong to you.');
                            }
                        },
                    ],
                    'guests' => 'required|integer',
                    'bedrooms' => 'required|integer',
                    'beds' => 'required|integer',
                    'bedroom_lock' => ['required', 'string', 'in:Yes,No'],
                    'types' => [new Enum(PropertyTypeEnum::class)],
                    'amenities' => ['required', 'array'],
                    'amenities.*' => ['exists:amenities,id'],
                    'describe_room' => ['required', 'array'],
                    'describe_room.*' => ['string', Rule::in(array_values(DescribeRoomEnum::toArray()))],
                    'instant_book' => ['required', 'string', 'in:Yes,No'],
                    'self_check_in' => ['required', 'string', 'in:Yes,No'],
                    'allow_pet' => ['required', 'string', 'in:Yes,No'],
                    'host_language' => ['required', 'array'],
                    'host_language.*' => ['exists:host_language,id'],
                ];
            case 5:
                return [
                    'property_id' => [
                        'required',
                        'integer',
                        'exists:property,id',
                        function ($attribute, $value, $fail) {
                            if (! Property::where('id', $value)->where('user_id', auth()->id())->exists()) {
                                $fail('The selected property does not belong to you.');
                            }
                        },
                    ],
                    'rules' => 'required|string',
                    'availability' => 'required|date',
                    'about_you' => 'required|string',
                ];
            case 6:
                return [
                    'property_id' => [
                        'required',
                        'integer',
                        'exists:property,id',
                        function ($attribute, $value, $fail) {
                            if (! Property::where('id', $value)->where('user_id', auth()->id())->exists()) {
                                $fail('The selected property does not belong to you.');
                            }
                        },
                    ],
                    'images' => 'nullable|array',
                    'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:10240',
                    'images_remove' => 'nullable|array|',
                    'images_remove.*' => 'integer',
                ];
            default:
                return [
                    'step' => 'required|integer|min:1|max:6',
                ];
        }
    }

    public function messages()
    {
        return [
            'images.required' => 'At least 3 images are required.',
            'images.array' => 'The images must be an array.',
            'images.min' => 'At least 3 images are required.',
            'images.*.required' => 'Each image is required.',
            'images.*.image' => 'Each file must be an image.',
            'images.*.mimes' => 'Each image must be a file of type: jpeg, png, jpg.',
            'images.*.max' => 'Each image must not be greater than 10MB.',
        ];
    }

    // protected function failedValidation(Validator $validator)
    // {
    //     // Get all error messages
    //     $allErrors = $validator->errors()->toArray();
    //     $errors = $validator->errors()->all();

    //     // Retrieve the first error message
    //     $firstErrorMessage = $errors[0];

    //     $response = [
    //         'message' => $firstErrorMessage,
    //         'errors' => $allErrors,
    //     ];

    //     throw new HttpResponseException(response()->json($response, 422));
    // }
}
