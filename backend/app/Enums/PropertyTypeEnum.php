<?php

namespace App\Enums;

use App\Traits\EnumValuesTrait;

enum PropertyTypeEnum: string
{
    use EnumValuesTrait;

    case HOUSE = 'House';
    case APARTMENT = 'Apartment';
    case GUESTHOUSE = 'Guesthouse';
    case HOTEL = 'Hotel';
}
