<?php

namespace App\Http\Controllers\Admin;

use App\Helper\Helper;
use App\Http\Controllers\Controller;
use App\Models\DeleteAccountRequest;
use DataTables;
use Illuminate\Http\Request;

class DeleteAccountControllers extends Controller
{
    public function list(Request $request)
    {
        if ($request->method() == 'POST' && $request->ajax()) {
            $query = DeleteAccountRequest::select('delete_account_request.id', 'delete_account_request.created_at', 'delete_account_request.status', 'delete_account_request.user_id', 'register.name as user_name')
            ->join('register', 'delete_account_request.user_id', '=', 'register.id')
            ->latest();
            $query = $query->latest();


            return DataTables::of($query)
                ->addColumn('action', function ($row) {
//                    $viewRoute = "<a href='".route('admin.delete_account_request.view', $row->id)."' class='btn btn-sm btn-clean btn-icon'  title='View details'><i class='flaticon-eye fa-lg'></i></a>";
//                    $editRoute = "<a href='".route('admin.delete_account_request.edit', $row->id)."' class='btn btn-sm btn-clean btn-icon' title='Edit details'><i class='flaticon2-pen'></i></a>";
                    $deleteRoute = "<a href='".route('admin.delete_account_request.delete')."' data-id='".$row->id."' data-title='Delete ?' data-text='Are you sure you want to delete?' class='btn btn-sm btn-clean btn-icon delete-record' title='Delete'><i class='flaticon2-trash'></i></a>";

                    return "{$deleteRoute}";
                })
                ->rawColumns(['action'])
                ->make(true);
        }

        return view('admin.delete_account_request.list');
    }


    public function statusChange(Request $request)
    {
        if (! $request->ajax()) {
            return abort(404);
        }

        $request->validate([
            'id' => 'required|exists:delete_account_request,id',
            'status' => 'required',
        ]);

        try {
            $obj = DeleteAccountRequest::where('id', request('id'))->limit(1)->first();
            if ($obj) {
                $statuss = ($request->status == 'true') ? 1 : 0;
                $obj->status = ($request->status == 'true') ? 1 : 0;
                $obj->save();
//                $objs1 = Category::where('categories_id', request('id'))->update(['status' => $statuss]);
//                $objs2 = SubCategory::where('categories_id', request('id'))->update(['status' => $statuss]);
            }

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
            $obj = DeleteAccountRequest::where('id', request('id'))->limit(1)->first();
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
