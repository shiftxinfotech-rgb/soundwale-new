<?php

namespace App\Http\Controllers\API;

use App\Helper\Helper;
use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Register;
use App\Models\Role;
use App\Models\Category;
use App\Models\MailConfiguration;
use App\Models\Notifications;
use App\Models\Models;
use App\Models\RegisterWorkingWithApproval;
use App\Models\Categories;
use App\Models\BusinessCompany;
use App\Models\Parts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Mail;
use App\Mail\AccountDeletedMail;
use Illuminate\Validation\Rule;

class SidebarController extends Controller {

    public function working_with_approval_add(Request $request) {
        $user = auth()->user();

        $validator = Validator::make($request->all(), [
                    'register_id' => 'required',
                    'register_name' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }

        $exists = Register::where('id', $user->id)->first();
        if ($exists) {

            $register_working_with_exists = RegisterWorkingWithApproval::where('user_id', $user->id)->where('register_id', $request->register_id)->where('register_name', $request->register_name)->where('status', '!=', 2)->first();
            if ($register_working_with_exists) {
                return response()->json(['message' => 'Request already exists', 'status' => false], 404);
            } else {
                $send_notification_flag = isset($request->register_id) ? $request->register_id : 0;
                if ($send_notification_flag == 0) {
//                    Admin
                    $notification = [
                        'title' => "Working With Request",
                        'body' => "New User Request For Working With",
                        'type' => "working_with",
                        'modules_type' => "register",
                        'relation_id' => $user->id,
                        'user_id' => "0",
                        'categories_id' => NULL,
                    ];

                    $userNotification = Notifications::create($notification);
                } else {
//                    User
                    $notification_title = "Working With Request";
                    $notification_body = "New User Request For Working With";
                    $notification_type = "working_with";
                    $notification_modules_type = "register";
                    $notification_relation_id = $user->id;
                    $notification_user_id = $request->register_id;
                    $notification_token_user_id = $request->register_id;
                    //        Notification Code Start
                    try {
                        Helper::notifyToUser($notification_title, $notification_body, $notification_type, $notification_modules_type, $notification_relation_id, $notification_user_id, $notification_token_user_id, NULL);
                    } catch (\Throwable $th) {
                        
                    }
                    //        Notification Code End
                }

                RegisterWorkingWithApproval::create([
                    'user_id' => isset($user->id) ? $user->id : '',
                    'register_id' => isset($request->register_id) ? $request->register_id : '',
                    'register_name' => isset($request->register_name) ? $request->register_name : '',
                    'status' => 0
                ]);

                return response()->json(['message' => 'Added successfully.', 'status' => true], 200);
            }


//            $exists->update($updateData);
//
//            $user = Register::select('*')->where('id', $request->user_id)->first();
//            $role_data = array();
//            if (isset($user)) {
//                $role_data = Role::select('*')->whereIn('id', explode(',', $user->role_id))->get();
//            }
//            $user['roles'] = $role_data;
//            return response()->json(['message' => 'Added successfully.', 'status' => true, 'user' => $user], 200);
        } else {
            return response()->json(['message' => 'User not found.', 'status' => false], 404);
        }
    }

    public function get_working_with_by_user_id(Request $request) {
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
                    'type' => 'required',
                        ], [
                    'type.required' => 'The user id field is required.',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }

        try {

            if ($request->type == "sender") {
                $data = RegisterWorkingWithApproval::select('register_working_with.*', 'register.name as user_name', 'role.name as role_name', 'register.image as user_image')
                        ->leftjoin('register', 'register_working_with.register_id', '=', 'register.id')
                        ->leftjoin('role', 'register.role_id', '=', 'role.id')
                        ->where('register_working_with.status', '=', 0)
                        ->where('register_working_with.user_id', $user->id)
                        ->get();
                $data->transform(function ($item) {
                    if ($item->user_image) {
                        $item->user_image = asset('storage/app/register/' . $item->user_image);
                    } else {
                        $item->user_image = "https://soundwale.in/demo/public/admin-asset/images/profile_default_image.png";
                    }
                    return $item;
                });
            }else if ($request->type == "approved") {
                $data = RegisterWorkingWithApproval::select('register_working_with.*', 'register.name as user_name', 'role.name as role_name', 'register.image as user_image')
                        ->leftjoin('register', 'register_working_with.register_id', '=', 'register.id')
                        ->leftjoin('role', 'register.role_id', '=', 'role.id')
                        ->where('register_working_with.status', '=', 1)
                        ->where('register_working_with.user_id', $user->id)
                        ->get();
                $data->transform(function ($item) {
                    if ($item->user_image) {
                        $item->user_image = asset('storage/app/register/' . $item->user_image);
                    } else {
                        $item->user_image = "https://soundwale.in/demo/public/admin-asset/images/profile_default_image.png";
                    }
                    return $item;
                });
            } else if ($request->type == "receiver") {
                $data = RegisterWorkingWithApproval::select('register_working_with.*', 'register.name as user_name', 'role.name as role_name', 'register.image as user_image')
                        ->leftjoin('register', 'register_working_with.user_id', '=', 'register.id')
                        ->leftjoin('role', 'register.role_id', '=', 'role.id')
                        ->where('register_working_with.status', '!=', 2)
                        ->where('register_working_with.register_id', $user->id)
                        ->get();
                $data->transform(function ($item) {
                    if ($item->user_image) {
                        $item->user_image = asset('storage/app/register/' . $item->user_image);
                    } else {
                        $item->user_image = "https://soundwale.in/demo/public/admin-asset/images/profile_default_image.png";
                    }
                    return $item;
                });
            }

            if ($data->isEmpty()) {
                return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
            } else {
                return response()->json(['status' => true, 'data' => $data], 200);
            }
        } catch (\Throwable $th) {
            \Log::error(request()->path() . "\n" . $th->getMessage());
            return response()->json(['status' => false, 'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        }
    }

    public function working_with_approval_request_by_id(Request $request) {
        $user = auth()->user();

        $validator = Validator::make($request->all(), [
                    'id' => 'required',
                    'status' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }

        $exists = RegisterWorkingWithApproval::where('id', $request->id)->first();
        if ($exists) {

            if ($request->status) {
                $updateData['status'] = $request->status;
            }
            if ($request->reject_reason) {
                $updateData['reject_reason'] = $request->reject_reason;
            }

            if ($updateData['status'] == 1) {
//                approved
                if ($exists->register_id != 0) {
                    $notification_title = "Working With Request";
                    $notification_body = "Working With Request Approved";
                    $notification_type = "working_with";
                    $notification_modules_type = "register";
                    $notification_relation_id = $user->register_id;
                    $notification_user_id = $exists->user_id;
                    $notification_token_user_id = $exists->user_id;
                    //        Notification Code Start
                    try {
                        Helper::notifyToUser($notification_title, $notification_body, $notification_type, $notification_modules_type, $notification_relation_id, $notification_user_id, $notification_token_user_id, NULL);
                    } catch (\Throwable $th) {
                        
                    }
                    //        Notification Code End
                }
            } else if ($updateData['status'] == 2) {
//                rejected
                if ($exists->register_id != 0) {
                    $notification_title = "Working With Request Rejected";
                    $notification_body = "Working With Request Rejected -".$request->reject_reason;
                    $notification_type = "working_with";
                    $notification_modules_type = "register";
                    $notification_relation_id = $user->register_id;
                    $notification_user_id = $exists->user_id;
                    $notification_token_user_id = $exists->user_id;
                    //        Notification Code Start
                    try {
                        Helper::notifyToUser($notification_title, $notification_body, $notification_type, $notification_modules_type, $notification_relation_id, $notification_user_id, $notification_token_user_id, NULL);
                    } catch (\Throwable $th) {
                        
                    }
                    //        Notification Code End
                }
            }

            $exists->update($updateData);

            return response()->json(['message' => 'Updated successfully.', 'status' => true], 200);
        } else {
            return response()->json(['message' => 'ID not found.', 'status' => false], 404);
        }
    }

    public function update_json_data_by_user_id(Request $request) {
        $user = auth()->user();

        $validator = Validator::make($request->all(), [
                    'data' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }

        $exists = Register::where('id', $user->id)->first();
        if ($exists) {
            $updateData = array();

            $rawData = $request->data;
            $data = json_decode($rawData, true);
            $key = $data['key'];
            $value = $data['value'];

            if ($key == "mixer_names_info") {
                $mixer_names_info = $value;
                $mixer_names_info_new = array();
                if ($value == "" || $value == "[]") {
                    $updateData['mixer_names_info'] = NULL;
                } else if ($value != "" && $value != "[]") {
                    $model_id = "";
                    $company_id = "";
                    foreach ($mixer_names_info as $mixer_names_info_row) {
                        if ($mixer_names_info_row['model_id'] == "0" || $mixer_names_info_row['model_id'] == "") {
                            $model_data = Models::firstOrCreate([
                                        'name' => $mixer_names_info_row['model_name'],
                                        'user_id' => $user->id,
                                        'status' => 0,
                            ]);
                            $model_id = $model_data->id;
                        } else {
                            $model_id = $mixer_names_info_row['model_id'];
                        }
                        if ($mixer_names_info_row['company_id'] == "0" || $mixer_names_info_row['company_id'] == "") {
                            $company_data = Categories::firstOrCreate([
                                        'name' => $mixer_names_info_row['company_name'],
                                        'user_id' => $user->id,
                                        'status' => 0,
                            ]);
                            $company_id = $company_data->id;
                        } else {
                            $company_id = $mixer_names_info_row['company_id'];
                        }

                        $mixer_names_info_new[] = [
                            'model_id' => (string) $model_id,
                            'model_name' => (string) $mixer_names_info_row['model_name'],
                            'company_id' => (string) $company_id,
                            'company_name' => (string) $mixer_names_info_row['company_name'],
                        ];
                    }
                    $updateData['mixer_names_info'] = json_encode($mixer_names_info_new);
                }
            } else if ($key == "sound_inventory") {
                if ($value == "" || $value == "[]") {
                    $updateData['sound_inventory'] = NULL;
                } else if ($value != "" && $value != "[]") {
                    $updateData['sound_inventory'] = json_encode($value);
                }
            } else if ($key == "dealer_of_company") {
                $dealer_of_company_info = $value;
                $dealer_of_company_info_new = array();
                if ($value == "" || $value == "[]") {
                    $updateData['dealer_of_company'] = NULL;
                } else if ($value != "" && $value != "[]") {
                    $company_id = "";
                    foreach ($dealer_of_company_info as $dealer_of_company_info_row) {
                        if ($dealer_of_company_info_row['company_id'] == "0" || $dealer_of_company_info_row['company_id'] == "") {
                            $company_data = Categories::firstOrCreate([
                                        'name' => $dealer_of_company_info_row['company_name'],
                                        'user_id' => $user->id,
                                        'status' => 0,
                            ]);
                            $company_id = $company_data->id;
                        } else {
                            $company_id = $dealer_of_company_info_row['company_id'];
                        }

                        $dealer_of_company_info_new[] = [
                            'company_id' => (string) $company_id,
                            'company_name' => (string) $dealer_of_company_info_row['company_name'],
                        ];
                    }
                    $updateData['dealer_of_company'] = json_encode($dealer_of_company_info_new);
                }
            } else if ($key == "distributor_of_company") {

                $distributor_of_company_info = $value;
                $distributor_of_company_info_new = array();
                if ($value == "" || $value == "[]") {
                    $updateData['distributor_of_company'] = NULL;
                } else if ($value != "" && $value != "[]") {
                    $company_id = "";
                    foreach ($distributor_of_company_info as $distributor_of_company_info_row) {
                        if ($distributor_of_company_info_row['company_id'] == "0" || $distributor_of_company_info_row['company_id'] == "") {
                            $company_data = Categories::firstOrCreate([
                                        'name' => $distributor_of_company_info_row['company_name'],
                                        'user_id' => $user->id,
                                        'status' => 0,
                            ]);
                            $company_id = $company_data->id;
                        } else {
                            $company_id = $distributor_of_company_info_row['company_id'];
                        }

                        $distributor_of_company_info_new[] = [
                            'company_id' => (string) $company_id,
                            'company_name' => (string) $distributor_of_company_info_row['company_name'],
                        ];
                    }
                    $updateData['distributor_of_company'] = json_encode($distributor_of_company_info_new);
                }
            } else if ($key == "importer_of_company") {

                $importer_of_company_info = $value;
                $importer_of_company_info_new = array();
                if ($value == "" || $value == "[]") {
                    $updateData['importer_of_company'] = NULL;
                } else if ($value != "" && $value != "[]") {
                    $company_id = "";
                    foreach ($importer_of_company_info as $importer_of_company_info_row) {
                        if ($importer_of_company_info_row['company_id'] == "0" || $importer_of_company_info_row['company_id'] == "") {
                            $company_data = Categories::firstOrCreate([
                                        'name' => $importer_of_company_info_row['company_name'],
                                        'user_id' => $user->id,
                                        'status' => 0,
                            ]);
                            $company_id = $company_data->id;
                        } else {
                            $company_id = $importer_of_company_info_row['company_id'];
                        }

                        $importer_of_company_info_new[] = [
                            'company_id' => (string) $company_id,
                            'company_name' => (string) $importer_of_company_info_row['company_name'],
                        ];
                    }
                    $updateData['importer_of_company'] = json_encode($importer_of_company_info_new);
                }
            } else if ($key == "product_info") {
                $product_info = $value;
                $product_info_new = array();
                if ($value == "" || $value == "[]") {
                    $updateData['product_info'] = NULL;
                } else if ($value != "" && $value != "[]") {
                    $product_id = "";
                    $company_id = "";
                    $model_id = "";
                    foreach ($product_info as $product_info_row) {
                        if ($product_info_row['product_id'] == "") {
                            $product_data = Category::firstOrCreate([
                                        'name' => $product_info_row['product_name'],
                                        'user_id' => $user->id,
                                        'status' => 0,
                            ]);
                            $product_id = $product_data->id;
                        } else {
                            $product_id = $product_info_row['product_id'];
                        }
                        if ($product_info_row['company_id'] == "") {
                            $company_data = Categories::firstOrCreate([
                                        'name' => $product_info_row['company_name'],
                                        'user_id' => $user->id,
                                        'status' => 0,
                            ]);
                            $company_id = $company_data->id;
                        } else {
                            $company_id = $product_info_row['company_id'];
                        }

                        if ($product_info_row['model_id'] == "") {
                            $model_data = Models::firstOrCreate([
                                        'name' => $product_info_row['model_name'],
                                        'user_id' => $user->id,
                                        'status' => 0,
                            ]);
                            $model_id = $model_data->id;
                        } else {
                            $model_id = $product_info_row['model_id'];
                        }

                        $product_info_new[] = [
                            'product_id' => (string) $product_id,
                            'company_id' => (string) $company_id,
                            'model_id' => (string) $model_id,
                            'product_name' => (string) $product_info_row['product_name'],
                            'company_name' => (string) $product_info_row['company_name'],
                            'model_name' => (string) $product_info_row['model_name'],
                        ];
                    }
                    $updateData['product_info'] = json_encode($product_info_new);
                }
            } else if ($key == "spare_part_info") {
                $spare_part_info = $value;
                $parts_info_new = array();
                if ($value == "" || $value == "[]") {
                    $updateData['spare_part_info'] = NULL;
                } else if ($value != "" && $value != "[]") {
                    $parts_id = "";
                    $company_id = "";
                    foreach ($spare_part_info as $spare_part_info_row) {
                        if ($spare_part_info_row['parts_id'] == "0" || $spare_part_info_row['parts_id'] == "") {
                            $parts_data = Parts::firstOrCreate([
                                        'name' => $spare_part_info_row['parts_name'],
                                        'user_id' => $user->id,
                                        'status' => 0,
                            ]);
                            $parts_id = $parts_data->id;
                        } else {
                            $parts_id = $spare_part_info_row['parts_id'];
                        }
                        if ($spare_part_info_row['company_id'] == "0" || $spare_part_info_row['company_id'] == "") {
                            $company_data = Categories::firstOrCreate([
                                        'name' => $spare_part_info_row['company_name'],
                                        'user_id' => $user->id,
                                        'status' => 0,
                            ]);
                            $company_id = $company_data->id;
                        } else {
                            $company_id = $spare_part_info_row['company_id'];
                        }

                        $parts_info_new[] = [
                            'parts_id' => (string) $parts_id,
                            'parts_name' => (string) $spare_part_info_row['parts_name'],
                            'company_id' => (string) $company_id,
                            'company_name' => (string) $spare_part_info_row['company_name'],
                            'details' => (string) $spare_part_info_row['details'],
                        ];
                    }
                    $updateData['spare_part_info'] = json_encode($parts_info_new);
                }
            } else if ($key == "service_center_info") {
                $service_center_info = $value;
                $service_center_info_new = array();
                if ($value == "" || $value == "[]") {
                    $updateData['service_center_info'] = NULL;
                } else if ($value != "" && $value != "[]") {
                    $company_id = "";
                    foreach ($service_center_info as $service_center_info_row) {
                        if ($service_center_info_row['company_id'] == "0" || $service_center_info_row['company_id'] == "") {
                            $company_data = Categories::firstOrCreate([
                                        'name' => $service_center_info_row['company_name'],
                                        'user_id' => $user->id,
                                        'status' => 0,
                            ]);
                            $company_id = $company_data->id;
                        } else {
                            $company_id = $service_center_info_row['company_id'];
                        }

                        $service_center_info_new[] = [
                            'company_id' => (string) $company_id,
                            'company_name' => (string) $service_center_info_row['company_name'],
                            'location' => (string) $service_center_info_row['location'],
                            'latitude' => (string) $service_center_info_row['latitude'],
                            'longitude' => (string) $service_center_info_row['longitude'],
                            'center_name' => (string) $service_center_info_row['center_name'],
                            'mobile_number' => (string) $service_center_info_row['mobile_number'],
                            'code_sort' => (string) $service_center_info_row['code_sort'],
                            'code' => (string) $service_center_info_row['code'],
                        ];
                    }
                    $updateData['service_center_info'] = json_encode($service_center_info_new);
                }
            } else if ($key == "manufacturing_product_info") {

                $manufacturing_product_info = $value;
                $manufacturing_product_info_new = array();
                if ($value == "" || $value == "[]") {
                    $updateData['manufacturing_product_info'] = NULL;
                } else if ($value != "" && $value != "[]") {
                    $product_id = "";
                    foreach ($manufacturing_product_info as $manufacturing_product_info_row) {
                        if ($manufacturing_product_info_row['product_id'] == "0" || $manufacturing_product_info_row['product_id'] == "") {
                            $product_data = Category::firstOrCreate([
                                        'name' => $manufacturing_product_info_row['product_name'],
                                        'user_id' => $user->id,
                                        'status' => 0,
                            ]);
                            $product_id = $product_data->id;
                        } else {
                            $product_id = $manufacturing_product_info_row['product_id'];
                        }

                        $manufacturing_product_info_new[] = [
                            'product_id' => (string) $product_id,
                            'product_name' => (string) $manufacturing_product_info_row['product_name'],
                        ];
                    }
                    $updateData['manufacturing_product_info'] = json_encode($manufacturing_product_info_new);
                }
            } else if ($key == "product_info_dealer_importer") {

                $companiesJson = $value['companies_id'];
                $categoriesJson = $value['category_id'];

                $companiesJsonArrayNew = array();

                if ($companiesJson == "" || $companiesJson == "[]") {
                    $updateData['companies_info'] = NULL;
                } else if ($companiesJson != "" && $companiesJson != "[]") {
                    $companies_id = "";
                    foreach ($companiesJson as $companiesJsonRow) {
                        if ($companiesJsonRow['companies_id'] == "0" || $companiesJsonRow['companies_id'] == "") {
                            $companies_data = Categories::firstOrCreate([
                                        'name' => $companiesJsonRow['companies_name'],
                                        'user_id' => $user->id,
                                        'status' => 0,
                            ]);
                            $companies_id = $companies_data->id;
                        } else {
                            $companies_id = $companiesJsonRow['companies_id'];
                        }

                        $companiesJsonArrayNew[] = [
                            'companies_id' => (string) $companies_id,
                            'companies_name' => (string) $companiesJsonRow['companies_name'],
                        ];
                    }
                    $updateData['companies_info'] = json_encode($companiesJsonArrayNew);
                }

                $categoriesJsonArrayNew = array();
                if ($categoriesJson == "" || $categoriesJson == "[]") {
                    $updateData['category_info'] = NULL;
                } else if ($categoriesJson != "" && $categoriesJson != "[]") {
                    $category_id = "";
                    foreach ($categoriesJson as $categoriesJsonRow) {
                        if ($categoriesJsonRow['category_id'] == "0" || $categoriesJsonRow['category_id'] == "") {
                            $category_data = Category::firstOrCreate([
                                        'name' => $categoriesJsonRow['category_name'],
                                        'user_id' => $user->id,
                                        'status' => 0,
                            ]);
                            $category_id = $category_data->id;
                        } else {
                            $category_id = $categoriesJsonRow['category_id'];
                        }

                        $categoriesJsonArrayNew[] = [
                            'category_id' => (string) $category_id,
                            'category_name' => (string) $categoriesJsonRow['category_name'],
                        ];
                    }
                    $updateData['category_info'] = json_encode($categoriesJsonArrayNew);
                }
            }

            $exists->update($updateData);

            return response()->json(['message' => 'Updated successfully.', 'status' => true], 200);
        } else {
            return response()->json(['message' => 'User not found.', 'status' => false], 404);
        }
    }

    public function Profile(Request $request) {
        $user = auth()->user();

        $validator = Validator::make($request->all(), [
                    'user_id' => 'required',
                        ], [
                    'user_id.required' => 'The user id field is required.',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }

        try {

            $user = Register::select('register.*', 'country.country_name as country_name', 'state.state_name as state_name', 'city.city_name as city_name')
                    ->leftJoin('country', 'register.country_id', '=', 'country.id')
                    ->leftJoin('state', 'register.state_id', '=', 'state.id')
                    ->leftJoin('city', 'register.city_id', '=', 'city.id')
                    ->where('register.id', $request->user_id)
                    ->first();

            $role_data = array();
            if (isset($user)) {
                $role_data = Role::select('*')->whereIn('id', explode(',', $user->role_id))->get();
            }
            $user['roles'] = $role_data;
            if (!$user) {
                return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
            } else {
                return response()->json(['status' => true, 'user' => $user], 200);
            }
        } catch (\Throwable $th) {
            \Log::error(request()->path() . "\n" . $th->getMessage());
            return response()->json(['status' => false, 'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        }
    }

    public function get_username_search(Request $request) {
        $user = auth()->user();

        $validator = Validator::make($request->all(), [
                    'search' => 'required',
                        ], [
                    'search.required' => 'The search field is required.',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }

        try {
            $search = $request->search;
            $user = Register::select('register.id', 'register.name', 'register.personal_name','register.image')
                    ->where('register.id', '!=', $user->id) // Exclude current user
                    ->where(function ($query) use ($search) {
                        $query->where('register.name', 'like', "%{$search}%")
                        ->orWhere('register.personal_name', 'like', "%{$search}%");
                    })
                    ->get();


            if ($user->isEmpty()) {
                return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
            } else {
                return response()->json(['status' => true, 'data' => $user], 200);
            }
        } catch (\Throwable $th) {
            \Log::error(request()->path() . "\n" . $th->getMessage());
            return response()->json(['status' => false, 'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        }
    }

    public function add_business_pdf_and_names(Request $request) {
        $user = auth()->user();

        $rules = [
            'company_names_pdf' => 'required',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }

        $companypdfRecords = [];
        if ($request->hasFile('company_names_pdf')) {
            $companyNames = $request->input('company_names');
            foreach ($request->file('company_names_pdf') as $index => $file1) {
                $path = Helper::uploadImage($file1, BusinessCompany::IMAGE_PATH);
                $companypdfRecords[] = [
                    'user_id' => $user->id,
                    'name' => $companyNames[$index] ?? null,
                    'business_id' => null,
                    'file_name' => $file1->getClientOriginalName(),
                    'image' => $path,
                ];
            }
            if (!empty($companypdfRecords)) {
                BusinessCompany::insert($companypdfRecords);
            }
        }

        return response()->json(['message' => 'Added successfully.', 'status' => true], 200);
    }

    public function delete_business_pdf_and_names(Request $request) {
        $user = auth()->user();
        $validator = Validator::make($request->all(), [
                    'id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 400);
        }

        $obj = BusinessCompany::where('id', $request->id);
        if ($obj) {
            $delete = $obj->delete();
        }

        return response()->json([
                    'status' => true,
                    'message' => 'Removed successfully'
                        ], 200);
    }

    public function get_business_pdf_and_names(Request $request) {

        $user = auth()->user();

        try {

            $data = BusinessCompany::select('*')->where('user_id', '=', $user->id)->get();
            if ($data->isEmpty()) {
                return response()->json(['status' => false, 'message' => 'Details not found.'], 404);
            } else {
                return response()->json(['status' => true, 'data' => $data], 200);
            }
        } catch (\Throwable $th) {
            \Log::error(request()->path() . "\n" . $th->getMessage());
            return response()->json(['status' => false, 'message' => 'Oops! Something went wrong. Please try again later.'], 500);
        }
    }

}
