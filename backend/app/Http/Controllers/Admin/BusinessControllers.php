<?php

namespace App\Http\Controllers\Admin;

use App\Helper\Helper;
use App\Http\Controllers\Controller;
use App\Models\Register;
use App\Models\Business;
use App\Models\Companies;
use DataTables;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class BusinessControllers extends Controller
{
    public function list(Request $request)
    {
        if ($request->method() == 'POST' && $request->ajax()) {
            $query = Business::select('business.id', 'business.image','business.status','business.created_at', 'register.name as user_name')
            ->join('register', 'business.user_id', '=', 'register.id')
            ->latest();
            $query = $query->latest();
            
            return DataTables::of($query)
                ->addColumn('action', function ($row) {
                    $editRoute = "<a href='".route('admin.business.edit', $row->id)."'class='btn btn-sm btn-clean btn-icon' title='Edit details'><i class='flaticon2-pen'></i></a>";
                    $deleteRoute = "<a href='".route('admin.business.delete')."' data-id='".$row->id."' data-title='Delete ?' data-text='Are you sure you want to delete ?' class='btn btn-sm btn-clean btn-icon delete-record' title='Delete'><i class='flaticon2-trash'></i></a>";

                    return "{$editRoute}{$deleteRoute}";
                })
                ->rawColumns(['action'])
                ->make(true);
        }

        return view('admin.business.list');
    }

    public function add($id = null)
    {
        $data = null;
        $companies = Companies::select('id', 'name')->where('status', 1)->latest()->get();
        $register = Register::select('id', 'name')->where('status', 1)->latest()->get();
        if ($id) {
            $data = Business::select('id','image','name','user_id','companies_id','address','status','company_website','gst_number','establishment_year','annual_turnover')->findOrFail($id);
        }

        return view('admin.business.add', compact('data','companies','register'));
    }

    public function store(Request $request)
    {
        $request->validate([], []);

        try {
            $validate = $request->only('image','name','user_id','address','companies_id','status','company_website','gst_number','establishment_year','annual_turnover');
            if ($request->hasFile('image')) {
                $validate['image'] = Helper::uploadImage($request->image, Business::IMAGE_PATH);
            }
            $validate['status'] = $request->has('status') ? $request->get('status') : 1;
            $obj = ($request->edit_id) ? Business::where('id', $request->edit_id)->first() : new Business;
            $obj->fill($validate);
            $obj->save();

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
            'id' => 'required|exists:business,id',
            'status' => 'required',
        ]);

        try {
            $obj = Business::where('id', request('id'))->limit(1)->first();
            if ($obj) {
                $obj->status = ($request->status == 'true') ? 1 : 0;
                $obj->save();
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
            $obj = Business::where('id', request('id'))->limit(1)->first();
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
