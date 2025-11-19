<?php

namespace App\Traits;

trait EnumValuesTrait
{
    public static function getValues(): array
    {
        return array_column(static::cases(), 'value');
    }

    public static function getKeys(): array
    {
        return array_column(static::cases(), 'name');
    }

    public static function toArray(): array
    {
        return array_combine(static::getKeys(), static::getValues());
    }
}
