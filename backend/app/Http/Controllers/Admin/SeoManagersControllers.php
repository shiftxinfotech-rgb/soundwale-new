<?php

namespace App\Http\Controllers\Admin;

use App\Helper\Helper;
use App\Http\Controllers\Controller;
use App\Models\SeoManagers;
use DataTables;
use Illuminate\Http\Request;

class SeoManagersControllers extends Controller
{
    public function list(Request $request)
    {
        if ($request->method() == 'POST' && $request->ajax()) {
            $query = SeoManagers::select('id', 'menu', 'seo_title', 'meta_keyword', 'meta_description');

            if (! $request->has('order')) {
                $query->orderBy('id', 'desc');
            }

            return DataTables::of($query)
                ->editColumn('menu', function ($row) {
                    return ucwords(str_replace('_', ' ', strtolower($row->menu)));
                })
                ->addColumn('action', function ($row) {
                    $viewRoute = "<a href='".route('admin.seo.managers.view', $row->id)."' class='btn btn-sm btn-clean btn-icon'  title='View details'><i class='flaticon-eye fa-lg'></i></a>";
                    $editRoute = "<a href='".route('admin.seo.managers.edit', $row->id)."' class='btn btn-sm btn-clean btn-icon' title='Edit details'><i class='flaticon2-pen'></i></a>";
                    $deleteRoute = "<a href='".route('admin.seo.managers.delete')."' data-id='".$row->id."' data-title='Delete?' data-text='Are you sure you want to delete?' class='btn btn-sm btn-clean btn-icon delete-record' title='Delete'><i class='flaticon2-trash'></i></a>";

                    return "{$editRoute}{$viewRoute}{$deleteRoute}";
                })
                ->rawColumns(['action'])
                ->make(true);
        }

        return view('admin.seo-managers.list');
    }

    public function add($id = null)
    {
        $data = null;
        if ($id) {
            $data = SeoManagers::select('id', 'menu', 'seo_title', 'meta_keyword', 'meta_description')->findOrFail($id);
        }

        return view('admin.seo-managers.add', compact('data'));
    }

    public function store(Request $request)
    {
        $request->validate([

        ]);

        try {
            $validate = $request->only('menu', 'seo_title', 'meta_keyword', 'meta_description');

            $obj = ($request->edit_id) ? SeoManagers::where('id', $request->edit_id)->first() : new SeoManagers;
            $obj->fill($validate);
            $obj->save();

            return response()->json(['message' => ($request->edit_id) ? 'Update successfully' : 'Added successfully'], 200);
        } catch (\Throwable $th) {
            logger($th->getMessage());

            return response()->json(['message' => 'Oops! something went wrong, Please try again later'], 500);
        }
    }

    public function view($id)
    {
        $data = SeoManagers::findOrFail($id);

        return view('admin.seo-managers.view', compact('data'));
    }

    public function delete(Request $request)
    {
        if (! $request->ajax()) {
            return abort(404);
        }
        try {
            $obj = SeoManagers::where('id', request('id'))->limit(1)->first();
            if ($obj) {
                $delete = $obj->delete();
            }

            return response()->json(['message' => 'Deleted successfully'], 200);
        } catch (\Throwable $th) {
            logger($th->getMessage());

            return response()->json(['message' => 'Oops! something went wrong, Please try again later'], 500);
        }
    }
}
