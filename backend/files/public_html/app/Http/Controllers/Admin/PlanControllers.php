<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Yajra\DataTables\DataTables;
use Illuminate\Validation\Rule;
use App\Helper\Helper;

class PlanControllers extends Controller
{
    public function list(Request $request)
    {
        if ($request->method() == 'POST' && $request->ajax()) {
            $query = Plan::select('id','name');

            if (! $request->has('order')) {
                $query->orderBy('id', 'asc');
            }

            return DataTables::of($query)
                ->addColumn('action', function ($row) {
                    $editRoute = "<a href='".route('admin.plans.edit', $row->id)."' class='btn btn-icon btn-outline-brand btn-sm' title='Edit details'><i class='la la-edit'></i></a>&nbsp";
                    $deleteRoute = "<a href='".route('admin.plans.delete')."' data-id='".$row->id."' data-title='Delete?' data-text='Are you sure you want to delete?' class='delete-record btn btn-icon btn-outline-danger btn-sm' title='Delete'><i class='la la-trash'></i></a>&nbsp;";

                    return "{$editRoute}{$deleteRoute}";
                })
                ->rawColumns(['action', 'image'])
                ->make(true);
        }

        return view('admin.plan.list');
    }

    public function add($id = null)
    {
        $data = null;
        if ($id) {
            $data = Plan::select('id','name','amount','plan_type','leads_count')->findOrFail($id);
        }

        return view('admin.plan.add', compact('data'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'amount' => 'required',
            'plan_type' => 'required',
            'leads_count' => 'required',
        ]);
        try {
            $validate = $request->only('name','amount','plan_type','leads_count');

            $obj = ($request->edit_id) ? Plan::where('id', $request->edit_id)->first() : new Plan;
            $obj->fill($validate);
            $obj->save();

            Cache::forget('plan');

            return response()->json(['message' => ($request->edit_id) ? 'Update successfully' : 'Added successfully'], 200);
        } catch (\Throwable $th) {
            logger($th->getMessage());

            return response()->json(['message' => 'Oops! something went wrong, Please try again later'], 500);
        }
    }

    public function statusChange(Request $request)
    {
        if (! $request->ajax()) {
            return abort(404);
        }

        $request->validate([
            'id' => 'required|exists:plans,id',
            'status' => 'required',
        ]);

        try {
            $obj = Plan::where('id', request('id'))->limit(1)->first();
            if ($obj) {
                $obj->status = ($request->status == 'true') ? 1 : 0;
                $obj->save();
            }
            Cache::forget('plan');

            return response()->json(['message' => 'Status update successfully'], 200);
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
            $obj = Plan::where('id', request('id'))->limit(1)->first();
            if ($obj) {
                $delete = $obj->delete();
            }
            Cache::forget('plan');

            return response()->json(['message' => 'Deleted successfully'], 200);
        } catch (\Throwable $th) {
            logger($th->getMessage());

            return response()->json(['message' => 'Oops! something went wrong, Please try again later'], 500);
        }
    }
}
