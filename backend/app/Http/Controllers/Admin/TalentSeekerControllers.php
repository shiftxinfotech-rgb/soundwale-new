<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TalentSeeker;
use App\Models\OtherPageData;
use App\Models\AdminNotification;
use DataTables;
use Illuminate\Http\Request;
use App\Helper\Helper;

class TalentSeekerControllers extends Controller
{

    public function list(Request $request)
    {
        if ($request->method() == 'POST' && $request->ajax()) {
            $query = TalentSeeker::select('*');

            if (!$request->has('order')) {
                $query->orderBy('id', 'desc');
            }

            return DataTables::of($query)
                ->addColumn('action', function ($row) {
                    $viewRoute = "<a href='" . route('admin.talent.seeker.view', $row->id) . "' class='btn btn-sm btn-clean btn-icon'  title='View details'><i class='flaticon-eye fa-lg' ></i></a>&nbsp;";
                    $deleteRoute = "<a href='" . route('admin.talent.seeker.delete') . "' data-id='" . $row->id . "' data-title='Delete Record?' data-text='Are you sure you want to delete record?' class='btn btn-sm btn-clean btn-icon delete-record' title='Delete'><i class='flaticon2-trash'></i></a>&nbsp;";

                    return "{$viewRoute}{$deleteRoute}";
                })
                ->rawColumns(['message', 'action'])
                ->make(true);
        }
        $data = OtherPageData::whereIn('key', ['who_we_are_title', 'who_we_are_description', 'who_we_are_image','solution_text','hiring_needs_text','hiring_needs_description'])->pluck('value', 'key');
        return view('admin.talent-seeker.list',compact('data'));
    }


    public function view($id)
    {
        $data = TalentSeeker::select('*')->findOrFail($id);
        $obj = AdminNotification::where('type','talent_seeker')->where('relation_id',$id)->update(['read' => true]);
        return view('admin.talent-seeker.view', compact('data'));
    }

    public function delete(Request $request)
    {
        if (! $request->ajax()) {
            return abort(404);
        }
        try {
            $delete = TalentSeeker::where('id', request('id'))->limit(1)->delete();
            $obj = AdminNotification::where('type','talent_seeker')->where('relation_id', request('id'))->limit(1)->delete();
            return response()->json(['message' => 'Deleted successfully'], 200);
        } catch (\Throwable $th) {
            logger($th->getMessage());

            return response()->json(['message' => 'Oops! something went wrong, Please try again later'], 500);
        }
    }

    public function storeOther(Request $request)
    {
        $request->validate([
            'who_we_are_image' => '|max:2048|' . Helper::mimesFileValidation('image'),
        ], [
            'who_we_are_image.max' => 'The image field must not be greater than 2MB.',
        ]);

        try {
            $validate = $request->only('who_we_are_title','who_we_are_description','solution_text','hiring_needs_text','hiring_needs_description');

            if ($request->hasFile('who_we_are_image')) {
                $validate['who_we_are_image'] = Helper::uploadImage($request->who_we_are_image, OtherPageData::IMAGE_PATH);
            }
            foreach ($validate as $key => $value) {
                OtherPageData::updateOrCreate(
                    ['key' => $key],
                    ['value' => $value]
                );
            }
            return response()->json(['message' => 'Updated successfully'], 200);
        } catch (\Throwable $th) {
            logger($th->getMessage());

            return response()->json(['message' => 'Oops! something went wrong, please try again later'], 500);
        }
    }
}
