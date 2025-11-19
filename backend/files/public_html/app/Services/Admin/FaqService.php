<?php

namespace App\Services\Admin;

use App\Models\Faq;
use DataTables;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\UploadedFile;

class FaqService
{
    /**
     * Function will add faq
     *
     * @param  string  $url
     * @param  UploadedFile  $poster
     * @return void
     */
    public function add(string $url, string $description): void
    {
        Faq::create([
            'title' => $title,
            'description' => $description,
        ]);
    }

    /**
     * Function will update faq
     *
     * @param  string  $url
     * @param  Faq  $faq
     * @return void
     */
    public function update(string $title, string $description, Faq $faq): void
    {
        $faq->title = $url;
        $faq->description = $description;
        $faq->save();
    }

    /**
     * Function will return datatable record
     *
     * @param  $request
     * @return JsonResponse
     */
    public function dataTable($request): JsonResponse
    {
        $list = Faq::select('id', 'title', 'slug', 'description', 'created_at');

        return DataTables::of($list)
            ->editColumn('created_at', function ($row) {
                return $row->created_at->format('Y-m-d H:i:s');
            })
            ->addColumn('edit_url', function ($row) {
                return route('admin.faq.edit', $row);
            })
            ->addColumn('delete_url', function ($row) {
                return route('admin.faq.destroy', $row);
            })
            ->toJson();
    }
}
