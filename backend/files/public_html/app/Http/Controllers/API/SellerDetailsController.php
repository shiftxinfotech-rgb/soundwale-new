<?php

namespace App\Http\Controllers\API;

use App\Helper\Helper;
use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Register;
use App\Models\Role;
use App\Models\States;
use App\Models\Category;
use App\Models\Manufacturer;
use App\Models\SellerDetails;
use App\Models\SellerDetailsLike;
use App\Models\SellerDetailsImages;
use App\Models\MailConfiguration;
use App\Models\Notifications;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Mail;
use App\Mail\AccountDeletedMail;
use Illuminate\Validation\Rule;

class SellerDetailsController extends Controller {

    public function seller_list_get(Request $request) {

        $user = Auth::user();

        $perPage = (int) $request->get('limit', config('app.API_PER_PAGE'));
        $page = (int) $request->get('page', 1);
        $offset = ($page - 1) * $perPage;

        $search = $request->search;
        $role_id = $request->role_id;
        $state_id = $request->state_id;
        $state_name = $request->state_name;
        $manufacturer_id = $request->manufacturer_id;
        $requirment_id = $request->requirment_id;
        $product_ids = $request->product_ids;

        $query = SellerDetails::select('seller_details.*', SellerDetails::raw("IF(seller_details_likes.status = 1, 1, 0) as is_like"),SellerDetails::raw("IF(like_likes.status = 1, 1, 0) as is_user_liked"), 'manufacturer.name as manufacturer_name', 'category.name as product_name', 'register.name as user_name', 'role.name as user_role_name', 'register.image as user_image', 'role.slug as user_role_slug', 'register.code as user_code', 'register.mobile_number as user_mobile_number', 'register.marketing_code as user_marketing_code', 'register.marketing_mobile_number as user_marketing_mobile_number')
                ->join('register', 'seller_details.user_id', '=', 'register.id')
                ->join('role', 'register.role_id', '=', 'role.id')
                ->leftjoin('manufacturer', 'seller_details.manufacturer_id', '=', 'manufacturer.id')
                ->leftjoin('category', 'seller_details.product_ids', '=', 'category.id')
                ->with('images')
                ->withCount(['total_likes as total_likes' => function ($query) {
                        $query->where('type', 'seller');
                    }])
                ->withCount(['comments as total_comments' => function ($query) {
//                $query->where('status', 1); // Only count active likes
                    }])
                ->leftJoin('seller_details_likes', function ($join) use ($user) {
                    $join->on('seller_details.id', '=', 'seller_details_likes.seller_details_id')
                    ->where('seller_details_likes.user_id', '=', $user->id);
                })
                ->leftJoin('like_likes', function ($join) use ($user) {
                    $join->on('seller_details.id', '=', 'like_likes.type_id')
                    ->where('like_likes.user_id', '=', $user->id)
                    ->where('like_likes.type', '=', "seller");
                });
//                ->whereRaw('FIND_IN_SET(?, seller_details.role_id)', [$user->role_id]);
//        ->where('seller_details.user_id', '!=', $user->id);

        if (isset($search) && $search != "") {
            $query->where(function ($q) use ($search) {
                $q->orWhere('seller_details.description', 'LIKE', "%{$search}%");
            });
        }
        if (!empty($role_id)) {
            $roles_id = array_filter(explode(",", $role_id)); // remove empty values
            if (!empty($roles_id)) {
                $query->where(function ($q) use ($roles_id) {
                    foreach ($roles_id as $roles_idd) {
                        $q->orWhereRaw("FIND_IN_SET(?, seller_details.role_id) > 0", [$roles_idd]);
                    }
                });
            }
        }else {
            $query->whereRaw('FIND_IN_SET(?, seller_details.role_id)', [$user->role_id]);
        }
        if ($state_name != "") {
            $StateExists = States::where('state_name', $state_name)->first();
            if ($StateExists) {
                $state_id = $StateExists->id;
            }
        }
        if (!empty($state_id)) {
            $states_id = array_filter(explode(",", $state_id));
            if (!empty($states_id)) {
                $query->where(function ($q) use ($states_id) {
                    foreach ($states_id as $stateId) {
                        $q->orWhereRaw("FIND_IN_SET(?, seller_details.state_id) > 0", [$stateId]);
                    }
                });
            }
        }else {
            $query->whereRaw('FIND_IN_SET(?, seller_details.state_id)', [$user->state_id]);
        }
        if (!empty($manufacturer_id)) {
            $manufacturers_id = array_filter(explode(",", $manufacturer_id));
            if (!empty($manufacturers_id)) {
                $query->where(function ($q) use ($manufacturers_id) {
                    foreach ($manufacturers_id as $manufacturerId) {
                        $q->orWhereRaw("FIND_IN_SET(?, seller_details.manufacturer_id) > 0", [$manufacturerId]);
                    }
                });
            }
        }
        if (!empty($product_ids)) {
            $products_ids = array_filter(explode(",", $product_ids));
            if (!empty($products_ids)) {
                $query->where(function ($q) use ($products_ids) {
                    foreach ($products_ids as $products_idds) {
                        $q->orWhereRaw("FIND_IN_SET(?, seller_details.product_ids) > 0", [$products_idds]);
                    }
                });
            }
        }
        if (isset($requirment_id) && $requirment_id != "") {
            $query->where(function ($q) use ($requirment_id) {
                $q->orWhere('seller_details.requirment_id', '=', $requirment_id);
            });
        }

        $data = $query->orderBy('seller_details.id', 'desc')->get();

        $data->transform(function ($item) {
            if ($item->user_image) {
                $item->user_image = asset('storage/app/register/' . $item->user_image);
            } else {
                $item->user_image = "https://developerwork.in/soundwale/public/admin-asset/images/profile_default_image.png";
//              $item->user_image = "https://soundwale.in/demo/public/admin-asset/images/profile_default_image.png";                
            }
            // Home list images
            if ($item->images && count($item->images)) {
                
            }
            $state_Ids = explode(',', $item->state_id);
            $statess = States::whereIn('id', $state_Ids)->get(['id', 'state_name']);
            $statessNames = $statess->map(function ($statess1) {
                return [
                    'id' => $statess1->id,
                    'value' => $statess1->state_name,
                ];
            });
            $item['states'] = $statessNames;
            $manufacturer_Ids = explode(',', $item->manufacturer_id);
            $manufacturer = Manufacturer::whereIn('id', $manufacturer_Ids)->get(['id', 'name']);
            $manufacturerNames = $manufacturer->map(function ($manufacturer1) {
                return [
                    'id' => $manufacturer1->id,
                    'value' => $manufacturer1->name,
                ];
            });
            $item['manufacturer'] = $manufacturerNames;
            return $item;
        });

        if ($data->isEmpty()) {
            return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
        }
        $total = $data->count();
        $data = $data->slice($offset, $perPage)->values();

        $meta = array();
        $meta['current_page'] = $page;
        $meta['per_page'] = $perPage;
        $meta['next_page_url'] = $total > ($offset + $perPage) ? url()->current() . '?page=' . ($page + 1) . '&limit=' . $perPage : null;
        $meta['have_more_records'] = $total > ($offset + $perPage);
        $meta['total'] = $total;
        return response()->json(['status' => true, 'data' => ['data' => $data, 'meta' => $meta]], 200);
    }

    public function add(Request $request) {
        $user = auth()->user();

        $validator = Validator::make($request->all(), [
                    'role_id' => 'required',
//                    'requirment_id' => 'required',
                    'product_ids' => 'required',
                    'state_id' => 'required',
                    'description' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }

        $id = $request->id ?? null;
        $data = [
            'user_id' => isset($user->id) ? $user->id : '',
            'role_id' => isset($request->role_id) ? $request->role_id : '',
            'manufacturer_id' => isset($request->manufacturer_id) ? $request->manufacturer_id : null,
            'state_id' => isset($request->state_id) ? $request->state_id : null,
            'requirment_id' => isset($request->requirment_id) ? $request->requirment_id : null,
            'product_ids' => isset($request->product_ids) ? $request->product_ids : null,
            'description' => isset($request->description) ? $request->description : '',
            'status' => 1
        ];
        
        $category_id = $request->product_ids;
        if (isset($category_id)) {
            if (is_numeric($category_id)) {
                $category_id = $category_id;
            } else {
                $category_data = Category::firstOrCreate([
                            'name' => $category_id,
                            'user_id' => $user->id,
                            'status' => 0,
                ]);
                $category_id = $category_data->id;
            }
        }
        $data['product_ids'] = $category_id;
        
        if ($id) {
            // Update case
            $list = SellerDetails::find($id);
            if (!$list) {
                return response()->json(['message' => 'Record not found for update.', 'status' => false], 404);
            }
            $list->fill($data);
            $list->save();
            $list_inserted_Id = $list->id;
//            SellerDetailsImages::where('seller_details_id', $list_inserted_Id)->delete();
        } else {
            // Insert case
            $list = new SellerDetails($data);
            $list->save();
            $list_inserted_Id = $list->id;
        }
        $imageRecords = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $path = Helper::uploadImage($file, SellerDetailsImages::IMAGE_PATH);
                $imageRecords[] = [
                    'user_id' => $user->id,
                    'seller_details_id' => $list_inserted_Id,
                    'image' => $path,
                    'status' => 1
                ];
            }
            if (!empty($imageRecords)) {
                SellerDetailsImages::insert($imageRecords);
            }
        }
        $message = $id ? 'Updated successfully' : 'Added successfully';
        return response()->json(['message' => $message, 'status' => true], 200);
    }

    public function seller_like_unlike(Request $request) {

        $user = auth()->user();

        $validator = Validator::make($request->all(), [
                    'seller_id' => 'required',
                        ], [
                    'seller_id.required' => 'The buyer id field is required.',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }
        try {
            $data = $request->only('user_id', 'seller_details_id', 'status');
            $data['status'] = 1;
            $data['user_id'] = $user->id;
            $data['seller_details_id'] = $request->seller_id;

            $exists = SellerDetailsLike::where('user_id', $user->id)->where('seller_details_id', $request->seller_id)->exists();
            if ($exists) {
                $obj = SellerDetailsLike::where('user_id', $user->id)->where('seller_details_id', $request->seller_id);
                if ($obj) {
                    $delete = $obj->delete();
                }
                return response()->json([
                            'status' => true,
                            'message' => 'Like removed successfully'
                                ], 200);
            } else {
                $dataa = new SellerDetailsLike($data);
                if ($dataa->save()) {
                    return response()->json([
                                'status' => true,
                                'message' => 'Like added successfully'
                                    ], 200);
                }
            }
        } catch (\Throwable $th) {
            \Log::error(request()->path() . "\n" . $th->getMessage());
            return response()->json(['status' => false, 'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        }
    }

}
