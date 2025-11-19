<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class PropertyResource extends JsonResource
{
    /**
     * The logged-in user's ID.
     *
     * @var int|null
     */
    protected static $loggedUserId;

    /**
     * Set the logged-in user's ID.
     *
     * @param  int|null  $loggedUserId
     */
    public static function setLoggedUserId(?int $loggedUserId)
    {
        self::$loggedUserId = $loggedUserId;
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'address' => $this->address,
            'price' => $this->price,
            'is_sold' => $this->is_sold,
            'images' => $this->images ? $this->images[0] : null,
            'average_rating' => number_format($this->averageRating(), 1),
            'liked' => self::$loggedUserId ? optional(User::find(self::$loggedUserId))->likedProperties()?->where('property_id', $this->id)->exists() : false,
        ];
    }
}
