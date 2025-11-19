<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class PasswordComplexity implements Rule
{
    public function passes($attribute, $value)
    {
        $passwordValidator = Validator::make(
            [$attribute => $value],
            [$attribute => ['required', Password::min(8)->mixedCase()->letters()->numbers()->symbols()]]
        );

        return $passwordValidator->passes();
    }

    public function message()
    {
        return 'The password field must be at least 8 characters long, contain at least one uppercase and one lowercase letter, one number, and one symbol.';
    }
}
