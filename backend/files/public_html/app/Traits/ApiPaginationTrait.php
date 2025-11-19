<?php

namespace App\Traits;

trait ApiPaginationTrait
{
    public static $DEFAULT_PER_PAGE = 20;

    protected function getPaginationInformation($currentPage, $recordPerPage)
    {
        return [
            'page' => $currentPage ?? 1,
            'limit' => $recordPerPage ?? self::$DEFAULT_PER_PAGE,
        ];
    }

    protected function makeMetaFromPagination(array $paginatedData)
    {
        return [
            'current_page' => $paginatedData['current_page'] ?? 1,
            'per_page' => $paginatedData['per_page'] ?? self::$DEFAULT_PER_PAGE,
            'next_page_url' => $paginatedData['next_page_url'] ?? null,
            'have_more_records' => array_key_exists('next_page_url', $paginatedData) ? (bool) $paginatedData['next_page_url'] : false,
        ];
    }
}
