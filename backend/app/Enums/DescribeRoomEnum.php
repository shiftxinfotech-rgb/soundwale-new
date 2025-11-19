<?php

namespace App\Enums;

use App\Traits\EnumValuesTrait;

enum DescribeRoomEnum: string
{
    use EnumValuesTrait;

    case RARE = 'Rare';
    case RUSTIC = 'Rustic';
    case INNATURE = 'In nature';
    case MEMORABLE = 'Memorable';
}
