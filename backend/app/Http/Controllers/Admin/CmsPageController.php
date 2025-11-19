<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CmsPages;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Yajra\DataTables\DataTables;
use Illuminate\Validation\Rule;

class CmsPageController extends Controller
{
    public function list(Request $request)
    {
        if ($request->method() == 'POST' && $request->ajax()) {
            $query = CmsPages::select('id', 'title', 'description');

            $query = $query->latest();

            return DataTables::of($query)
                ->editColumn('description', function ($row) {
                    return mb_strimwidth(strip_tags($row->description), 0, 100, '...');
                })
                ->addColumn('action', function ($row) {
                    $editRoute   = "<a href='".route('admin.cms.page.edit',$row->id)."' class='btn btn-icon btn-outline-brand btn-sm' title='Edit details'><i class='la la-edit'></i></a>&nbsp";
                    
                    return "{$editRoute}";
                })
                ->rawColumns(['description', 'action'])
                ->make(true);
        }

        return view('admin.cms-page.list');
    }

    public function add($id = null)
    {
        $cmspage = null;
        if ($id) {
            $cmspage = CmsPages::select('id', 'title', 'description')->findOrFail($id);
        }
        return view('admin.cms-page.add', compact('cmspage'));
    }

    public function store(Request $request)
    {
        // dd($request->edit_id);
        $request->validate([
            // "title"       => "nullable|unique:cms_pages,title.$request->edit_id",
            'title' => [
                'required',
                Rule::unique('cms_pages')->ignore($request->edit_id),
            ],
            'description' => 'required|string',
        ]);

        try {
            $validate = $request->only('title', 'description');

            $obj = ($request->edit_id) ? CmsPages::where('id', $request->edit_id)->first() : new CmsPages;
            $obj->fill($validate);
            $obj->save();

            Cache::forget('cmspages');

            return response()->json(['message' => ($request->edit_id) ? 'CMS page update successfully' : 'CMS page added successfully'], 200);
        } catch (\Throwable $th) {
            logger($th->getMessage());

            return response()->json(['message' => 'Oops! something went wrong, Please try again later'], 500);
        }
    }

    public function delete(Request $request)
    {
        if (! $request->ajax()) {
            return abort(404);
        }

        try {
            $delete = CmsPages::where('id', request('id'))->limit(1)->delete();
            Cache::forget('cmspages');

            return response()->json(['message' => 'CMS Page Deleted successfully'], 200);
        } catch (\Throwable $th) {
            logger($th->getMessage());

            return response()->json(['message' => 'Oops! something went wrong, Please try again later'], 500);
        }
    }
}
