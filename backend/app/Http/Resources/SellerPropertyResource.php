<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SellerPropertyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        $data = parent::toArray($request);
        $data['images'] = $this->images ? $this->images[0] : null;
        $data['average_rating'] = number_format($this->averageRating(), 1);

        return $data;
    }
}
