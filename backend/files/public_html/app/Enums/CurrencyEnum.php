<?php

namespace App\Enums;

enum CurrencyEnum: string
{
    case USD = 'USD';
    case INR = 'INR';
    case SGD = 'SGD';
    case AED = 'AED';
    case AUD = 'AUD';
    case EUR = 'EUR';

    public function toSymbol()
    {
        return match ($this) {
            self::USD => '$',
            self::INR => '₹',
            self::SGD => 'S$',
            self::AED => 'د.إ',
            self::AUD => 'A$',
            self::EUR => '€',
        };
    }
}
