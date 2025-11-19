<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class PropertyDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        $data = parent::toArray($request);

        $data['images'] = ($this->images) ? $this->images : null;
        $data['amenities_details'] = ($this->amenities_details) ? $this->amenities_details : null;
        $data['host_language_details'] = ($this->host_language_details) ? $this->host_language_details : null;
        $data['average_rating'] = number_format($this->averageRating(), 1);
        $data['seller'] = $this->seller;
        $data['seller']['average_rating'] = number_format($this->seller->averagePropertyRating(), 1);
        $data['seller']['total_reviews'] = $this->seller->totalPropertyReviews();

        $data['liked'] = $this->logged_user_id ? optional(User::find($this->logged_user_id))->likedProperties()?->where('property_id', $this->id)->exists() : false;

        return $data;
    }
}
