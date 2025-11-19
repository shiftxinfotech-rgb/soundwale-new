<?php

namespace Modules\Banner\Services\API;

use Illuminate\Database\Eloquent\Collection;
use Modules\Banner\Models\Banner;

class BannerService
{
    /**
     * Function will return banner list
     *
     * @return Collection
     */
    public function getBanners(): Collection
    {
        return Banner::select('id', 'poster', 'url')
            ->orderBy('id', 'desc')
            ->get();
    }
}
