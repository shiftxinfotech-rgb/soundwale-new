@extends('admin.layouts.default')
@section('title', 'Users & Directory')
@section('content')
<script src="https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyCv-uB5dpDKCHhXsCaXcmHtI5TYhB2wlSA&sensor=false&libraries=geometry,places&ext=.js"></script>
<style>

    .wrapper {
        display: grid;
        grid-template-columns: 300px 300px 100px;
        grid-gap: 7px;
        background-color: #fff;
        color: #444;
        padding-top: 1%;
    }

    .box {
        border-radius: 5px;
        padding: 2px;
        font-size: 150%;
    }

    .wrapper_view {
        display: grid;
        grid-template-columns: 300px 300px 100px;
        background-color: #fff;
        color: #444;
    }

    .box_view {
        border-radius: 5px;
        padding: 5px;
        font-size: 150%;
    }
    .select2-container--default .select2-selection--multiple {
        min-width: 250px !important; /* Set a default height */
        padding: 4px 8px;
        border: 1px solid #ced4da;
        border-radius: 4px;
    }
</style>
<style>
    table {
        width: 80%;
        border-collapse: collapse;
        margin: 20px auto;
        font-family: Arial, sans-serif;
    }
    h1 {
        text-align: center;
        font-family: Arial, sans-serif;
    }
    th, td {
        border: 1px solid #999;
        padding: 10px;
        text-align: left;
    }
    th {
        background-color: #eee;
    }
    .no-records {
        text-align: center;
        font-style: italic;
        color: #555;
    }
</style>
<style>
  .pac-container{
    z-index: 999999;
  }
</style>
<!-- begin:: Subheader -->
<div class="kt-subheader kt-grid__item" id="kt_subheader">
    <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">Users & Directory</h3>
        <div class="kt-subheader__breadcrumbs">
            <a href="javascript:history.back()" class="kt-subheader__breadcrumbs-link" title="Back">List</a>
            <span class="kt-subheader__breadcrumbs-separator"></span>
            <a href="javascript:;" class="kt-subheader__breadcrumbs-link" title="Back">View</a>
        </div>
    </div>
</div>
<!-- end:: Subheader -->
<!-- begin:: Content -->
<div class="kt-content kt-grid__item kt-grid__item--fluid" id="kt_content">
    @include('admin.layouts.flash-message')
    <div class="kt-portlet kt-portlet--mobile">
        <div class="kt-portlet__head kt-portlet__head--lg">
            <div class="kt-portlet__head-label">
                <span class="kt-portlet__head-icon">
                    <i class="kt-font-brand flaticon-user-settings"></i>
                </span>
                <h3 class="kt-portlet__head-title">
                    Users & Directory
                </h3>
            </div>
            <div class="kt-portlet__head-toolbar">
                <div class="kt-portlet__head-wrapper">
                    <a onclick="window.history.back()"class="btn btn-clean btn-icon-sm">
                        <i class="la la-long-arrow-left"></i>
                        Back
                    </a>

                </div>
            </div>
        </div>
        <!--begin::Portlet-->

        <div class="kt-portlet__body">
            <div class="row">
                <div class="col-lg-6">
                    <label><strong>Role:</strong></label>
                    <p>{{ $data->role->name ?? 'N/A' }}</p>
                </div>
                <?php if ($data->role_id == "6") { ?>
                    <div class="col-lg-6">
                        <label><strong>Your Shop Name:</strong></label>
                        <p>{{ !empty($data->personal_name) ? $data->personal_name : 'N/A' }}</p>
                    </div>
                <?php } else { ?>
                    <div class="col-lg-6">
                        <label><strong id="common_name_title">Name:</strong></label>
                        <p>{{ $data->name ?? 'N/A' }}</p>
                    </div>
                <?php } ?>

                <?php
                if ($data->role_id == 2 || $data->role_id == 3 || $data->role_id == 7) {
                    if (isset($data->extra_mobile_number) && $data->extra_mobile_number != NULL && $data->extra_mobile_number != "") {
                        $mobile_num = json_decode($data->extra_mobile_number, true);
                        foreach ($mobile_num as $mobile_num_row) {
//                            if ($mobile_num_row['type'] != "Owner") {
                            ?>
                            <div class="col-lg-4">
                                <label><strong>Name</strong></label>
                                <p>{{ $mobile_num_row['name'] ?? 'N/A' }}</p>
                            </div>
                            <div class="col-lg-4">
                                <label><strong>Mobile number</strong></label>
                                <p>{{ $mobile_num_row['code'] ?? '' }} {{ $mobile_num_row['mobile_number'] ?? 'N/A' }}</p>
                            </div>
                            <div class="col-lg-4">
                                <label><strong>Email</strong></label>
                                <p>{{ $mobile_num_row['email'] ?? 'N/A' }}</p>
                            </div>
                            <?php
//                            }
                        }
                    }
                } else {
                    ?>
                    <div class="col-lg-6">
                        <label><strong>Email:</strong></label>
                        <p>{{ $data->email ?? 'N/A' }}</p>
                    </div>
                    <div class="col-lg-6">
                        <label><strong>Mobile Number:</strong></label>
                        <p>{{ $data->code }} {{ $data->mobile_number ?? 'N/A' }}</p>
                    </div>
                <?php }
                ?>

                <?php if ($data->role_id == "6") { ?>
                    @if(!empty($data->name))
                    <div class="col-lg-6">
                        <label><strong>Personal Name:</strong></label>
                        <p>{{ $data->name ?? 'N/A' }}</p>
                    </div>
                    @endif
                <?php } else { ?>
                    @if(!empty($data->personal_name))
                    <div class="col-lg-6">
                        <label><strong>Personal Name:</strong></label>
                        <p>{{ $data->personal_name ?? 'N/A' }}</p>
                    </div>
                    @endif
                <?php } ?>
                @if(!empty($data->gender))
                <div class="col-lg-6" id="gender_div" style="display: none">
                    <label><strong>Gender:</strong></label>
                    <p>{{ ucfirst($data->gender) ?? 'N/A' }}</p>
                </div>
                @endif
                @if(!empty($data->category->name))
                <div class="col-lg-6">
                    <label><strong>What Manufacturer You Are Doing? :</strong></label>
                    <p>{{ $data->category->name ?? 'N/A' }}</p>
                </div>
                @endif
                <div class="col-lg-6">
                    <label><strong>Country:</strong></label>
                    <p>{{ $data->country->country_name ?? 'N/A' }}</p>
                </div>
                <div class="col-lg-6">
                    <label><strong>State:</strong></label>
                    <p>{{ $data->state->state_name ?? 'N/A' }}</p>
                </div>
                <div class="col-lg-6">
                    <label><strong>City:</strong></label>
                    <p>{{ $data->city->city_name ?? 'N/A' }}</p>
                </div>
                <div class="col-lg-6">
                    <label><strong>Village:</strong></label>
                    <p>{{ $data->village ?? 'N/A' }}</p>
                </div>
                <div class="col-lg-6">
                    <label><strong>Location:</strong></label>
                    <p>{{ $data->location ?? 'N/A' }}</p>
                </div>
                @if(!empty($data->facebook_link))
                <div class="col-lg-6">
                    <label><strong>Facebook Link:</strong></label>
                    <p>{{ $data->facebook_link ?? 'N/A' }}</p>
                </div>
                @endif
                @if(!empty($data->instagram_link))
                <div class="col-lg-6">
                    <label><strong>Instagram Link:</strong></label>
                    <p>{{ $data->instagram_link ?? 'N/A' }}</p>
                </div>
                @endif
                @if(!empty($data->web_link))
                <div class="col-lg-6">
                    <label><strong>Web Link :</strong></label>
                    <p>{{ $data->web_link ?? 'N/A' }}</p>
                </div>
                @endif
                @if(!empty($data->youtube_link))
                <div class="col-lg-6">
                    <label><strong>Youtube Link :</strong></label>
                    <p>{{ $data->youtube_link ?? 'N/A' }}</p>
                </div>
                @endif
                @if(!empty($business_data->gst_number))
                <div class="col-lg-6">
                    <label><strong>GST :</strong></label>
                    <p>{{ $business_data->gst_number ?? 'N/A' }}</p>
                </div>
                @endif
                @if(!empty($data->description))
                <div class="col-lg-12">
                    <label><strong>About Us :</strong></label>
                    <p>{{ $data->description ?? 'N/A' }}</p>
                </div>
                @endif
            </div>
        </div>

        <div class="row">
            <div class="col-lg-6">
                <div class="kt-form kt-form--label-right">
                    <div class="kt-portlet__body">
                        <div class="kt-widget kt-widget--user-profile-3">
                            <div class="kt-widget__top">
                                <div class="kt-widget__media">
                                    <div class="media-item">
                                        @if ($data->image)
                                        <label><strong>Image:</strong></label>
                                        <div>
                                            <a href="{{ $data->image_url }}" target="_blank">
                                                <img src="{{ $data->image_url }}" alt="Image">
                                            </a>
                                        </div>
                                        @endif
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="kt-form kt-form--label-right">
                    <div class="kt-portlet__body">
                        <div class="kt-widget kt-widget--user-profile-3">
                            <div class="kt-widget__top">
                                <div class="kt-widget__media">
                                    <div class="media-item" id="delete_visiting_card_div">
                                        @if ($data->visiting_card_image)
                                        <label><strong>Visiting Card Image:</strong></label>
                                        <div>
                                            <a href="{{ $data->visiting_card_image_url }}" target="_blank">
                                                <img src="{{ $data->visiting_card_image_url }}" alt="Image">
                                            </a><br/>
                                            <button class="delete-visiting-card" data-id="{{ $data->id }}">Delete</button>
                                        </div>
                                        @endif
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="kt-portlet__body" id="gallery_div" style="display: none;">
            <h2>Gallery</h2>
            @if(session('success'))
            <div class="alert alert-success">
                {{ session('success') }}
            </div>
            @endif
            <form class="kt-form" action="{{ route('admin.register.store_view') }}" id="user-gallery-from" method="post" isReload="{{ route('admin.register.view', ['id' => $data->id]) }}"  enctype="multipart/form-data">
                @csrf
                <input type="hidden" name="edit_id" value="{{ $data->id ?? null }}">
                <input type="hidden" name="form_type" value="Gallery">
                <div class="kt-portlet__body">
                    <div class="form-group col-lg-6">
                        <label>Images </label>
                        <div class="custom-file">
                            <input type="file" name="shop_images" class="custom-file-input" id="shop_images" required="" accept="image/*">
                            <label class="custom-file-label text-truncate" for="userImage">Choose file</label>
                        </div>
                    </div>
                    <div class="kt-portlet__foot">
                        <div class="kt-form__actions">
                            <button type="submit" class="btn btn-brand">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
            <div class="row">
                @foreach($business_shop_images_data as $business_shop_images_data_row)
                <div class="col-md-2" id="gallery_{{ $business_shop_images_data_row->id }}">
                    <img src="{{ $business_shop_images_data_row->image_url }}" alt="Image" style="height: 150px;width: 150px;"><br>
                    <button class="gallery-delete-image" data-id="{{ $business_shop_images_data_row->id }}" data-path="{{ $business_shop_images_data_row->image_url }}">Delete</button>
                </div>
                @endforeach
            </div>
        </div>

        <div class="kt-portlet__body" id="my_profile_div" style="display: none;">
            <h2>My Profile Pdf</h2>
            <form class="kt-form" action="{{ route('admin.register.store_view') }}" id="user-add-from" method="post" isReload="{{ route('admin.register.view', ['id' => $data->id]) }}"  enctype="multipart/form-data">
                @csrf
                <input type="hidden" name="edit_id" value="{{ $data->id ?? null }}">
                <input type="hidden" name="form_type" value="ProfilePdf">
                <div class="kt-portlet__body">
                    <div class="row">
                        <div class="form-group col-lg-6">
                            <label>Name</label>
                            <input type="text" name="company_names" id="company_names" placeholder="Enter Name" value="" required="" class="form-control">
                        </div>
                        <div class="form-group col-lg-6">
                            <label>Select Pdf</label>
                            <div class="custom-file">
                                <input type="file" name="company_names_pdf[]" class="custom-file-input" multiple="" required="" id="userImage1" accept=".pdf">
                                <label class="custom-file-label text-truncate" for="userImage1">Choose file</label>
                            </div>
                        </div>
                    </div>
                    <div class="kt-portlet__foot">
                        <div class="kt-form__actions">
                            <button type="submit" class="btn btn-brand">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
            <div class="row">
                @foreach($business_company_data as $business_company_data_row)
                <div class="col-md-2" id="business_pdf_{{ $business_company_data_row->id }}">
                    <p>{{ $business_company_data_row->name }} <br> 
                        <a href="{{ $business_company_data_row->image_url }}" target="_blank">{{$business_company_data_row->file_name}}</a></p> 
                    <br>
                    <button class="business-company-pdf" data-id="{{ $business_company_data_row->id }}" data-path="{{ $business_company_data_row->image_url }}">Delete</button>
                </div>
                @endforeach
            </div>
        </div>

        <div class="kt-portlet__body" id="product_information_div" style="display: none;">
            <div class="row">
                <div class="col-md-4">
                    <h2>Product Information</h2>
                </div>
                <div class="col-md-4"></div>
                <div class="col-md-4">
                    <button type="button" id="add-more" class="btn btn-success col-md-12 btn-brand">Add More</button>
                </div>
            </div>

            <form class="kt-form" action="{{ route('admin.register.store_view') }}" id="user-add-from" method="post" isReload="{{ route('admin.register.view', ['id' => $data->id]) }}"  enctype="multipart/form-data">
                @csrf
                <input type="hidden" name="edit_id" value="{{ $data->id ?? null }}">
                <input type="hidden" name="form_type" value="ProductInformation">
                <div class="kt-portlet__body">

                    <div id="dynamic-form-rows">
                        @php
                        if(!empty($business_data->product_info)){
                        $existingSelections = json_decode($business_data->product_info, true) ?? [];
                        $existingSelectionsCount = count($existingSelections);
                        }else{
                        $existingSelections = [];
                        $existingSelectionsCount = count($existingSelections);
                        }
                        @endphp

                        @foreach($existingSelections as $i => $row)
                        <div class="row mb-3 form-group-group">
                            <div class="form-group col-lg-4">
                                <label>Product</label>
                                <select name="selections[{{ $i }}][product_id]" class="form-control" required>
                                    <option value="">Select Product</option>
                                    @foreach($category as $product)
                                    <option value="{{ $product->id }}" @if($product->id == $row['product_id']) selected @endif>
                                            {{ $product->name }}
                                </option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-group col-lg-4">
                            <label>Company</label>
                            <select name="selections[{{ $i }}][company_id]" class="form-control" required>
                                <option value="">Select Company</option>
                                @foreach($categories as $company)
                                <option value="{{ $company->id }}" @if($company->id == $row['company_id']) selected @endif>
                                        {{ $company->name }}
                            </option>
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group col-lg-3">
                        <label>Model</label>
                        <select name="selections[{{ $i }}][model_id]" class="form-control" required>
                            <option value="">Select Model</option>
                            @foreach($models as $model)
                            <option value="{{ $model->id }}" @if($model->id == $row['model_id']) selected @endif>
                                    {{ $model->name }}
                        </option>
                        @endforeach
                    </select>
                </div>
                <div class="form-group col-lg-1 d-flex align-items-end">
                    <button type="button" class="btn btn-danger remove-row">X</button>
                </div>
            </div>
            @endforeach
        </div>
    </div>

    <div class="kt-portlet__foot">
        <div class="kt-form__actions">
            <?php
            $add_more_product_information = "";
            if ($existingSelectionsCount > 0) {
                $add_more_product_information = "display:block";
            } else {
                $add_more_product_information = "display:none";
            }
            ?>
            <button type="submit" id="product_information_submit" style="<?= $add_more_product_information; ?>" class="btn btn-brand">Submit</button>
        </div>
    </div>
</form>
</div>

<div class="kt-portlet__body" id="working_with_div" style="display: none;">
    <div class="row">
        <div class="col-md-4">
            <h2>Add Working With</h2>
        </div>
        <div class="col-md-4"></div>
        <div class="col-md-4">
            <button type="button" class="btn btn-success col-md-12 btn-add">Add More</button>
        </div>
    </div>
    <form class="kt-form" action="{{ route('admin.register.store_view') }}" id="user-gallery-from" method="post" isReload="{{ route('admin.register.view', ['id' => $data->id]) }}"  enctype="multipart/form-data">
        @csrf
        <input type="hidden" name="edit_id" value="{{ $data->id ?? null }}">
        <input type="hidden" name="form_type" value="WorkingWith">
        @php
        $workingWithList = json_decode($business_data->working_with ?? '[]', true);
        @endphp

        <div class="kt-portlet__body" id="working-with-wrapper">
            @if(!empty($workingWithList))
            @foreach($workingWithList as $key => $workingWithRow)
            <div class="form-group col-lg-12 d-flex mb-2">
                <input type="text" name="working_with[]" value="{{ $workingWithRow['value'] }}" placeholder="Enter Working With" class="form-control mr-2" required>
                <button type="button" class="btn btn-danger btn-remove">Remove</button>
            </div>
            @endforeach
            @else
            <div class="form-group col-lg-12 d-flex mb-2">
                <input type="text" name="working_with[]" placeholder="Enter Working With" class="form-control mr-2" required>
            </div>
            @endif
        </div>
        <input type="hidden" name="working_with_json" id="working_with_json">
        <div class="kt-portlet__foot">
            <div class="kt-form__actions">
                <button type="submit" class="btn btn-brand" onclick="storeJson()">Submit</button>
            </div>
        </div>
    </form>
</div>

<div class="kt-portlet__body" id="parts_div" style="display: none;">
    <div class="row">
        <div class="col-md-4">
            <h2>Part Information</h2>
        </div>
        <div class="col-md-4"></div>
        <div class="col-md-4">
            <button type="button" id="add-more-part" class="btn btn-success col-md-12 btn-brand">Add More</button>
        </div>
    </div>

    <form class="kt-form" action="{{ route('admin.register.store_view') }}" id="user-add-from" method="post" isReload="{{ route('admin.register.view', ['id' => $data->id]) }}"  enctype="multipart/form-data">
        @csrf
        <input type="hidden" name="edit_id" value="{{ $data->id ?? null }}">
        <input type="hidden" name="form_type" value="PartInfo">
        <div class="kt-portlet__body">

            <div id="dynamic-form-rows-part">
                @php
                if(!empty($business_data->spare_part_info)){
                $existingSelectionsParts = json_decode($business_data->spare_part_info, true) ?? [];
                $existingSelectionsCountParts = count($existingSelectionsParts);
                }else{
                $existingSelectionsParts = [];
                $existingSelectionsCountParts = count($existingSelectionsParts);
                }
                @endphp

                @foreach($existingSelectionsParts as $j1 => $row_part)
                <div class="row mb-3 form-group-group-part">
                    <div class="form-group col-lg-4">
                        <label>Part Name</label>
                        <select name="selections_part[{{ $j1 }}][parts_id]" class="form-control" required>
                            <option value="">Select Product</option>
                            @foreach($parts as $parts_row)
                            <option value="{{ $parts_row->id }}" @if($parts_row->id == $row_part['parts_id']) selected @endif>
                                    {{ $parts_row->name }}
                        </option>
                        @endforeach
                    </select>
                </div>
                <div class="form-group col-lg-4">
                    <label>Company</label>
                    <select name="selections_part[{{ $j1 }}][company_id]" class="form-control" required>
                        <option value="">Select Company</option>
                        @foreach($categories as $company)
                        <option value="{{ $company->id }}" @if($company->id == $row_part['company_id']) selected @endif>
                                {{ $company->name }}
                    </option>
                    @endforeach
                </select>
            </div>
            <div class="form-group col-lg-3">
                <label>Details</label>
                <input type="text" name="selections_part[{{ $j1 }}][details]" value="{{ $row_part['details'] }}" placeholder="Enter Details" class="form-control mr-2" required>
                </select>
            </div>
            <div class="form-group col-lg-1 d-flex align-items-end">
                <button type="button" class="btn btn-danger remove-row-part">X</button>
            </div>
        </div>
        @endforeach
    </div>
</div>

<div class="kt-portlet__foot">
    <div class="kt-form__actions">
        <?php
        $add_more_part_submit = "";
        if ($existingSelectionsCountParts > 0) {
            $add_more_part_submit = "display:block";
        } else {
            $add_more_part_submit = "display:none";
        }
        ?>
        <button type="submit" id="add_more_part_submit" style="<?= $add_more_part_submit; ?>" class="btn btn-brand">Submit</button>
    </div>
</div>
</form>
</div>

<div class="kt-portlet__body" id="service_center_div" style="display: none;">
    <div class="row">
        <div class="col-md-6">
            <h2>Service Center Information</h2>
        </div>
        <div class="col-md-2"></div>
        <div class="col-md-4">
            <button type="button" id="add-more-service" class="btn btn-success col-md-12 btn-brand">Add More</button>
        </div>
    </div>

    <form class="kt-form" action="{{ route('admin.register.store_view') }}" id="user-add-from" method="post" isReload="{{ route('admin.register.view', ['id' => $data->id]) }}"  enctype="multipart/form-data">
        @csrf
        <input type="hidden" name="edit_id" value="{{ $data->id ?? null }}">
        <input type="hidden" name="form_type" value="ServiceCenterInformation">
        <div class="kt-portlet__body">

            <div id="dynamic-form-rows-service">
                @php
                if(!empty($data->service_center_info)){
                $existingSelectionsService = json_decode($data->service_center_info, true) ?? [];
                $existingSelectionsServiceCount = count($existingSelectionsService);
                }else{
                $existingSelectionsService = [];
                $existingSelectionsServiceCount = count($existingSelectionsService);
                }
                @endphp

                @foreach($existingSelectionsService as $j => $row)
                <div class="row mb-3 form-group-service">
                    <div class="form-group col-lg-2">
                        <label>Name</label>
                        <input type="text" name="selections_service[{{ $j }}][center_name]" value="{{ $row['center_name'] }}" placeholder="Enter Name" class="form-control mr-2" required>
                    </div>
                    <div class="form-group col-lg-3">
                        <label>Company</label>
                        <select name="selections_service[{{ $j }}][company_id]" class="form-control" required>
                            <option value="">Select Company</option>
                            @foreach($categories as $company)
                            <option value="{{ $company->id }}" @if($company->id == $row['company_id']) selected @endif>
                                    {{ $company->name }}
                        </option>
                        @endforeach
                    </select>
                </div>
                <div class="form-group col-lg-3">
                    <label>Mobile Number</label>
                    <input type="tel" id="mobile_number{{ $j }}" name="selections_service[{{ $j }}][mobile_number]" data-validation="required|number" value="{{ $row['code'] ?? null }}{{ $row['mobile_number'] ?? null }}" class="form-control only-mobile" placeholder="">
                    <input type="hidden" id="country_code{{ $j }}" name="selections_service[{{ $j }}][code]" value="{{ $row['code'] ?? null }}">
                    <input type="hidden" id="country_iso{{ $j }}"  name="selections_service[{{ $j }}][code_sort]" value="{{ $row['code_sort'] ?? null }}">
                </div>
                <div class="form-group col-lg-3">
                    <label>Location</label>
                    <input type="text" name="selections_service[{{ $j }}][location]" value="{{ $row['location'] }}" id="location_{{ $j }}" onclick="OpenMapPopup({{ $j }});" placeholder="Enter Location" class="form-control mr-2" required>
                    <input type="hidden" name="selections_service[{{ $j }}][latitude]" value="{{ $row['latitude'] }}" id="latitude_{{ $j }}">
                    <input type="hidden" name="selections_service[{{ $j }}][longitude]" value="{{ $row['longitude'] }}" id="longitude_{{ $j }}">
                </div>    
                <div class="form-group col-lg-1 d-flex align-items-end">
                    <button type="button" class="btn btn-danger remove-row-service">X</button>
                </div>
            </div>
            @endforeach
        </div>
    </div>

    <div class="kt-portlet__foot">
        <div class="kt-form__actions">
            <?php
            $add_more_service_submit = "";
            if ($existingSelectionsServiceCount > 0) {
                $add_more_service_submit = "display:block";
            } else {
                $add_more_service_submit = "display:none";
            }
            ?>
            <button type="submit" id="add_more_service_submit" style="<?= $add_more_service_submit; ?>" class="btn btn-brand">Submit</button>
        </div>
    </div>
</form>
</div>

<div class="kt-portlet__body" id="product_information_multi_div" style="display: none;">
    <h2>Product Information</h2>
    <form class="kt-form" action="{{ route('admin.register.store_view') }}" id="user-add-from" method="post" isReload="{{ route('admin.register.view', ['id' => $data->id]) }}"  enctype="multipart/form-data">
        @csrf
        <input type="hidden" name="edit_id" value="{{ $data->id ?? null }}">
        <input type="hidden" name="form_type" value="ProductInformationMulti">
        @php
        $selectedCompanies = array();
        $selectedCategory = array();
        $selectedSubCategory = array();

        if (!empty($business_data?->companies_id)) {
        $selectedCompanies = explode(',', $business_data->companies_id);
        }

        if (!empty($business_data?->category_id)) {
        $selectedCategory = explode(',', $business_data->category_id);
        }

        if (!empty($business_data?->sub_category_id)) {
        $selectedSubCategory = explode(',', $business_data->sub_category_id);
        }
        @endphp
        <div class="kt-portlet__body">
            <div class="row">
                <div class="form-group col-lg-4">
                    <label>Dealer Of Company</label><br>
                    <select name="companies_id[]" class="form-control select2" multiple>
                        @foreach($categories as $company)
                        <option value="{{ $company->id }}" @if(in_array($company->id, $selectedCompanies)) selected @endif>
                                {{ $company->name }}
                    </option>
                    @endforeach
                </select>
            </div>
            <div class="form-group col-lg-4">
                <label>Product</label><br>
                <select name="category_id[]" id="category_id" class="form-control select2" multiple>
                    @foreach($category as $product)
                    <option value="{{ $product->id }}" @if(in_array($product->id, $selectedCategory)) selected @endif>
                            {{ $product->name }}
                </option>
                @endforeach
            </select>
        </div>
        <div class="form-group col-lg-4">
            <label>Sub Product</label><br>
            <select name="sub_category_id[]" id="sub_category_id" class="form-control select2" multiple>
                <!-- Will be populated via JS -->
            </select>
        </div>
    </div>
    <div class="kt-portlet__foot">
        <div class="kt-form__actions">
            <button type="submit" class="btn btn-brand">Submit</button>
        </div>
    </div>
</div>
</form>
</div>

<div class="kt-portlet__body" id="top_graduates_div" style="display: none;">
    <div class="row">
        <div class="col-md-8">
            <h2>Student info - Top Graduates</h2>
        </div>
        <div class="col-md-4">
            <button type="button" class="btn btn-success col-md-12 btn-add-graduates">Add More</button>
        </div>
    </div>
    <form class="kt-form" action="{{ route('admin.register.store_view') }}" id="user-gallery-from" method="post" isReload="{{ route('admin.register.view', ['id' => $data->id]) }}"  enctype="multipart/form-data">
        @csrf
        <input type="hidden" name="edit_id" value="{{ $data->id ?? null }}">
        <input type="hidden" name="form_type" value="WorkingWith">
        @php
        $workingWithList = json_decode($business_data->working_with ?? '[]', true);
        @endphp

        <div class="kt-portlet__body" id="graduates-with-wrapper">
            @if(!empty($workingWithList))
            @foreach($workingWithList as $key => $workingWithRow)
            <div class="form-group col-lg-12 d-flex mb-2">
                <input type="text" name="working_with[]" value="{{ $workingWithRow['value'] }}" placeholder="Enter Name" class="form-control mr-2" required>
                <button type="button" class="btn btn-danger btn-remove-graduates">Remove</button>
            </div>
            @endforeach
            @else
            <div class="form-group col-lg-12 d-flex mb-2">
                <input type="text" name="working_with[]" placeholder="Enter Name" class="form-control mr-2" required>
            </div>
            @endif
        </div>
        <input type="hidden" name="working_with_json" id="working_with_json">
        <div class="kt-portlet__foot">
            <div class="kt-form__actions">
                <button type="submit" class="btn btn-brand" onclick="storeJson()">Submit</button>
            </div>
        </div>
    </form>
</div>        
<div class="kt-portlet__body">
    <h1>Reviews</h1>
    <table>
        <tr>
            <th>Type</th>
            <th>Rating</th>
            <th>Message</th>
            <th>Action</th>
        </tr>
        @if(!empty($review_data) && count($review_data) > 0)
        @foreach($review_data as $review_data_row)
        @if(!empty($review_data_row->relevant_id))

        @endif
        <tr id="delete_review_div_{{ $review_data_row->id }}">
            <td>{{ $review_data_row->type }}</td>
            <td>{{ $review_data_row->rating }}</td>
            <td>{{ $review_data_row->message }}</td>
            <td><button class="delete-review" data-id="{{ $review_data_row->id }}">Delete</button></td>
        </tr>
        @endforeach
        @else
        <tr>
            <td colspan="4" class="no-records">No records found</td>
        </tr>
        @endif
    </table>
</div>

</div>
<div class="modal fade" id="OpenMapPopup" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-center" id="exampleModalLongTitle">
                    Select Location
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">            
                <div class="row">
                    <div class="col-md-10">
                        <input id="searchTextField" placeholder="Select Location" class="form-control w-100" type="text" size="50" >
                    </div>
                    <div class="col-md-2">
                        <button type="button" onclick="CloseLocationWithSavePopup();" class="btn btn-info" name="close_location_popup" value="Save">Save</button>
                    </div>
                </div>
                <br/>
                <div id="map_location">
                    <div id="map_canvas_location" style="height: 380px; width: 750px;"></div>
                </div>
            </div>
        </div>
    </div>
</div>
<input type="hidden" id="role_id" name="role_id" value="{{ $data->role_id ?? null }}">
<input type="hidden" id="existingSelectionsCount" name="existingSelectionsCount" value="{{ $existingSelectionsCount ?? 1 }}">
<input type="hidden" id="existingSelectionsCountParts" name="existingSelectionsCountParts" value="{{ $existingSelectionsCountParts ?? 1 }}">
<input type="hidden" id="existingSelectionsServiceCount" name="existingSelectionsServiceCount" value="{{ $existingSelectionsServiceCount ?? 1 }}">
@endsection
@push('script')
<script>
    $(document).ready(function () {
    $('.select2').select2();
    // Fetch subcategories whenever categories change
    $('#category_id').on('change', function () {
    let selectedCategories = $(this).val();
    if (!selectedCategories || selectedCategories.length === 0) {
    $('#sub_category_id').empty();
    return;
    }

    $.ajax({
    url: "{{ route('admin.register.getsubcategory') }}",
            type: 'GET',
            data: { category_ids: selectedCategories },
            dataType: 'json',
            success: function (data) {
            $('#sub_category_id').empty();
            $.each(data, function (key, value) {
            $('#sub_category_id').append('<option value="' + value.id + '">' + value.name + '</option>');
            });
            // Optional: Preselect subcategories if editing
            let selectedSubCategories = @json($selectedSubCategory ?? []);
            $('#sub_category_id').val(selectedSubCategories).trigger('change');
            }
    });
    });
    // Trigger change on load to populate subcategories in edit mode
    $('#category_id').trigger('change');
    });</script>
<script>
    let index_service = $("#existingSelectionsServiceCount").val();
    document.getElementById('add-more-service').addEventListener('click', function () {
    const formRowsService = document.getElementById('dynamic-form-rows-service');
    const newRowService = document.createElement('div');
    newRowService.classList.add('row', 'mb-3', 'form-group-service');
    newRowService.innerHTML = `
        <div class="form-group col-lg-2">
            <label>Name</label>
            <input type="text" name="selections_service[${index_service}][center_name]" value="" placeholder="Enter Name" class="form-control mr-2" required>
        </div>
        <div class="form-group col-lg-3">
            <label>Company</label>
            <select name="selections_service[${index_service}][company_id]" class="form-control" required>
                <option value="">Select Company</option>
                @foreach($categories as $categories_row)
                    <option value="{{ $categories_row->id }}">{{ $categories_row->name }}</option>
                @endforeach
            </select>
        </div>
        <div class="form-group col-lg-3">
            <label>Mobile Number</label>
            <input type="tel" id="mobile_number${index_service}" name="selections_service[${index_service}][mobile_number]" data-validation="required|number" value="" class="form-control only-mobile" placeholder="">
            <input type="hidden" id="country_code${index_service}" name="selections_service[${index_service}][code]" value="">
            <input type="hidden" id="country_iso${index_service}"  name="selections_service[${index_service}][code_sort]" value="">
        </div>
        <div class="form-group col-lg-3">
            <label>Location</label>
            <input type="text" name="selections_service[${index_service}][location]" value="" id="location_${index_service}" onclick="OpenMapPopup(${index_service});" placeholder="Enter Location" class="form-control mr-2" required>
            <input type="hidden" name="selections_service[${index_service}][latitude]" value="" id="latitude_${index_service}">
            <input type="hidden" name="selections_service[${index_service}][longitude]" value="" id="longitude_${index_service}">
        </div>        
        <div class="form-group col-lg-1 d-flex align-items-end">
            <button type="button" class="btn btn-danger remove-row-service">X</button>
        </div>
    `;
    formRowsService.appendChild(newRowService);
    updateRemoveButtonsService();
    index_service++;
    $("#add_more_service_submit").css("display", "block");
    $(document).ready(function () {
    // Loop through all inputs with class 'only-mobile'
    $('.only-mobile').each(function (index) {
    var input = $(this);
    var inputId = input.attr('id'); // e.g., mobile_number1
    var number = inputId.match(/\d+/); // Extracts number like '1', '2', etc.
    if (!number)
            return;
    // Init intlTelInput
    input.intlTelInput({
    initialCountry: "auto",
            geoIpLookup: function (success, failure) {
            $.get("https://ipinfo.io", function () {}, "jsonp").always(function (resp) {
            var countryCode = (resp && resp.country) ? resp.country : "us";
            success(countryCode);
            });
            },
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
    });
    // On country change or keyup, update hidden fields
    input.on("countrychange keyup", function () {
    var selectedCountryData = input.intlTelInput("getSelectedCountryData");
    var countryCode = selectedCountryData.dialCode;
    var isoCode = selectedCountryData.iso2;
    // Set hidden input values
    $('#country_code' + number).val("+" + countryCode);
    $('#country_iso' + number).val(isoCode.toUpperCase());
    });
    });
    });
    });
    // Remove row
    document.addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-row-service')) {
    e.target.closest('.form-group-service').remove();
    reindexRowsService();
    }
    });
    // Show/hide remove buttons
    function updateRemoveButtonsService() {
    const allRemoveButtons = document.querySelectorAll('.remove-row-service');
    allRemoveButtons.forEach(btn => btn.style.display = 'inline-block');
    if (allRemoveButtons.length === 1) {
//            allRemoveButtons[0].style.display = 'none'; // hide if only one
    }
    }

    // Reindex name attributes after removing rows
    function reindexRowsService() {
    const rows_service = document.querySelectorAll('.form-group-service');
    index_service = 0;
    rows_service.forEach(row_service => {
    row_service.querySelector('select[name$="[center_name]"]').name = `selections[${index_service}][center_name]`;
    row_service.querySelector('select[name$="[company_id]"]').name = `selections[${index_service}][company_id]`;
    row_service.querySelector('select[name$="[mobile_number]"]').name = `selections[${index_service}][mobile_number]`;
    row_service.querySelector('select[name$="[code]"]').name = `selections[${index_service}][code]`;
    row_service.querySelector('select[name$="[code_sort]"]').name = `selections[${index_service}][code_sort]`;
    row_service.querySelector('select[name$="[location]"]').name = `selections[${index_service}][location]`;
    row_service.querySelector('select[name$="[latitude]"]').name = `selections[${index_service}][latitude]`;
    row_service.querySelector('select[name$="[longitude]"]').name = `selections[${index_service}][longitude]`;
    index_service++;
    });
    updateRemoveButtonsService();
    }

    // Initial setup
    updateRemoveButtonsService();</script>
<script>
    $(document).ready(function () {
    // Loop through all inputs with class 'only-mobile'
    $('.only-mobile').each(function (index) {
    var input = $(this);
    var inputId = input.attr('id'); // e.g., mobile_number1
    var number = inputId.match(/\d+/); // Extracts number like '1', '2', etc.
    if (!number) return;
    // Init intlTelInput
    input.intlTelInput({
    initialCountry: "auto",
            geoIpLookup: function (success, failure) {
            $.get("https://ipinfo.io", function () {}, "jsonp").always(function (resp) {
            var countryCode = (resp && resp.country) ? resp.country : "us";
            success(countryCode);
            });
            },
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
    });
    // On country change or keyup, update hidden fields
    input.on("countrychange keyup", function () {
    var selectedCountryData = input.intlTelInput("getSelectedCountryData");
    var countryCode = selectedCountryData.dialCode;
    var isoCode = selectedCountryData.iso2;
    // Set hidden input values
    $('#country_code' + number).val("+" + countryCode);
    $('#country_iso' + number).val(isoCode.toUpperCase());
    });
    });
    });</script>
<script>
    function OpenMapPopup(idd) {
    $("#OpenMapPopup").modal('show');
    load_map(idd);
    }
    function CloseLocationPopup() {
    $("#OpenMapPopup").modal('hide');
    }
    function load_map(idd) {
        var default_latitude = $("#latitude_"+idd).val();
        var default_longitude = $("#longitude_"+idd).val();
        var lat = default_latitude !== '' ? default_latitude : '22.461428948189187',
            lng = default_longitude !== '' ? default_longitude : '78.68063259784105',
            latlng = new google.maps.LatLng(lat, lng),
            image = 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi.png';
    var mapOptions = {
    center: new google.maps.LatLng(lat, lng),
            zoom: default_latitude !== '' ? 10 : 4,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            gestureHandling: 'greedy',
            panControl: true,
            panControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT
            },
            zoomControl: true,
            zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
                    position: google.maps.ControlPosition.TOP_left
            }
    },
            map = new google.maps.Map(document.getElementById('map_canvas_location'), mapOptions),
            marker = new google.maps.Marker({
            position: latlng,
                    map: map,
                    icon: image
            });
    var input = document.getElementById('searchTextField');
    var autocomplete = new google.maps.places.Autocomplete(input, {
    types: ["geocode"]
    });
    autocomplete.bindTo('bounds', map);
    var infowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(autocomplete, 'place_changed', function (event) {
    var place = autocomplete.getPlace();    
    console.log(place);
    infowindow.close();
    if (place.geometry.viewport) {
    map.fitBounds(place.geometry.viewport);
    } else {
    map.setCenter(place.geometry.location);
    map.setZoom(17);
    }
    moveMarker(place.name, place.geometry.location);
    $(document).find("#location_" + idd).val(place.name);
    $(document).find('[name="location"]').val(place.name);
    var searchTextField = $("#searchTextField").val();
    $("#location_" + idd).val(searchTextField);
    $('#latitude_'+idd).val(place.geometry.location.lat());
    if ($('.lat').length > 0) {
    $('.lat').val(place.geometry.location.lat());
    }
    $('#longitude_'+idd).val(place.geometry.location.lng());
    if ($('.lng').length > 0) {
    $('.lng').val(place.geometry.location.lng());
    }
    });
    google.maps.event.addListener(map, 'click', function (event) {
    var place = autocomplete.getPlace();     
    $('#latitude').val(event.latLng.lat());
    if ($('.lat').length > 0) {
    $('.lat').val(event.latLng.lat());
    }
    $('#longitude').val(event.latLng.lng());
    if ($('.lng').length > 0) {
    $('.lng').val(event.latLng.lng());
    }
    infowindow.close();
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
    "latLng": event.latLng
    }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
    if (results[0]) {
    let location = results[0].geometry.location;
    $(document).find("#location_" + idd).val(results[0].formatted_address);
    $(document).find("#latitude_" + idd).val(results[0].geometry.location.lat());
    $(document).find("#longitude_" + idd).val(results[0].geometry.location.lng());
//                                                $(document).find('[name="address_' + click_location_id + '"]').val(results[0].formatted_address);
    } else {
    $(document).find("#location").val("No results");
    $(document).find('[name="location"]').val('No results');
    }
    //console.log(results);
    var lat = results[0].geometry.location.lat(),
            lng = results[0].geometry.location.lng(),
            placeName = results[0].address_components[0].long_name,
            latlng = new google.maps.LatLng(lat, lng);
    moveMarker(placeName, latlng);
    $("#searchTextField").val(results[0].formatted_address);
    }
    });
    });
    function moveMarker(placeName, latlng) {
    marker.setIcon(image);
    marker.setPosition(latlng);
    infowindow.setContent(placeName);
    //infowindow.open(map, marker);
    }
    }
    function CloseLocationWithSavePopup() {
    var searchTextField = $("#searchTextField").val();
    if (searchTextField != "" && searchTextField != null) {
    $("#location").val(searchTextField);
    $('[name="location"]').val(searchTextField);
    }
    $("#OpenMapPopup").modal('hide');
    }
</script>

<script>
    let index_part = $("#existingSelectionsCountParts").val();
    document.getElementById('add-more-part').addEventListener('click', function () {
    const formRowsPart = document.getElementById('dynamic-form-rows-part');
    const newRowPart = document.createElement('div');
    newRowPart.classList.add('row', 'mb-3', 'form-group-group-part');
    newRowPart.innerHTML = `
        <div class="form-group col-lg-4">
            <label>Part Name</label>
            <select name="selections_part[${index_part}][parts_id]" class="form-control" required>
                <option value="">Select Part</option>
                @foreach($parts as $parts_row)
                    <option value="{{ $parts_row->id }}">{{ $parts_row->name }}</option>
                @endforeach
            </select>
        </div>
        <div class="form-group col-lg-4">
            <label>Company</label>
            <select name="selections_part[${index_part}][company_id]" class="form-control" required>
                <option value="">Select Company</option>
                @foreach($categories as $categories_row)
                    <option value="{{ $categories_row->id }}">{{ $categories_row->name }}</option>
                @endforeach
            </select>
        </div>
        <div class="form-group col-lg-3">
            <label>Details</label>
            <input type="text" name="selections_part[${index_part}][details]" value="" placeholder="Enter Details" class="form-control mr-2" required>
        </div>
        <div class="form-group col-lg-1 d-flex align-items-end">
            <button type="button" class="btn btn-danger remove-row-part">X</button>
        </div>
    `;
    formRowsPart.appendChild(newRowPart);
    updateRemoveButtonsPart();
    index_part++;
    $("#add_more_part_submit").css("display", "block");
    });
    // Remove row
    document.addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-row-part')) {
    e.target.closest('.form-group-group-part').remove();
    reindexRowsPart();
    }
    });
    // Show/hide remove buttons
    function updateRemoveButtonsPart() {

    const allRemoveButtonsPart = document.querySelectorAll('.remove-row-part');
    allRemoveButtonsPart.forEach(btn => btn.style.display = 'inline-block');
    if (allRemoveButtonsPart.length === 0) {
//        allRemoveButtonsPart[0].style.display = 'none'; // hide if only one
    }
    }

    // Reindex name attributes after removing rows
    function reindexRowsPart() {
    const rows_part = document.querySelectorAll('.form-group-group-part');
    index_part = 0;
    rows_part.forEach(row_part => {
    row_part.querySelector('select[name$="[parts_id]"]').name = `selections_part[${index_part}][parts_id]`;
    row_part.querySelector('select[name$="[company_id]"]').name = `selections_part[${index_part}][company_id]`;
    row_part.querySelector('input[name$="[details]"]').name = `selections_part[${index_part}][details]`;
    index_part++;
    });
    updateRemoveButtonsPart();
    }

    // Initial setup
    updateRemoveButtonsPart();</script>
<script>
    // Add new input field
    document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('btn-add')) {
    const wrapper = document.getElementById('working-with-wrapper');
    const newField = document.createElement('div');
    newField.className = 'form-group col-lg-12 d-flex mb-2';
    newField.innerHTML = `
                <input type="text" name="working_with[]" placeholder="Enter Working With" class="form-control mr-2" required>
                <button type="button" class="btn btn-danger btn-remove">Remove</button>
            `;
    wrapper.appendChild(newField);
    }

    // Remove input field
    if (e.target && e.target.classList.contains('btn-remove')) {
    e.target.parentElement.remove();
    }
    });
    // Store JSON on submit
    function storeJson() {
    const inputs = document.querySelectorAll('input[name="working_with[]"]');
    const values = Array.from(inputs).map(input => input.value.trim()).filter(v => v);
    document.getElementById('working_with_json').value = JSON.stringify(values);
    }
</script>
<script>
    let index = $("#existingSelectionsCount").val();
    document.getElementById('add-more').addEventListener('click', function () {
    const formRows = document.getElementById('dynamic-form-rows');
    const newRow = document.createElement('div');
    newRow.classList.add('row', 'mb-3', 'form-group-group');
    newRow.innerHTML = `
        <div class="form-group col-lg-4">
            <label>Product</label>
            <select name="selections[${index}][product_id]" class="form-control" required>
                <option value="">Select Product</option>
                @foreach($category as $category_row)
                    <option value="{{ $category_row->id }}">{{ $category_row->name }}</option>
                @endforeach
            </select>
        </div>
        <div class="form-group col-lg-4">
            <label>Company</label>
            <select name="selections[${index}][company_id]" class="form-control" required>
                <option value="">Select Company</option>
                @foreach($categories as $categories_row)
                    <option value="{{ $categories_row->id }}">{{ $categories_row->name }}</option>
                @endforeach
            </select>
        </div>
        <div class="form-group col-lg-3">
            <label>Model</label>
            <select name="selections[${index}][model_id]" class="form-control" required>
                <option value="">Select Model</option>
                @foreach($models as $models_row)
                    <option value="{{ $models_row->id }}">{{ $models_row->name }}</option>
                @endforeach
            </select>
        </div>
        <div class="form-group col-lg-1 d-flex align-items-end">
            <button type="button" class="btn btn-danger remove-row">X</button>
        </div>
    `;
    formRows.appendChild(newRow);
    updateRemoveButtons();
    index++;
    $("#product_information_submit").css("display", "block");
    });
    // Remove row
    document.addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-row')) {
    e.target.closest('.form-group-group').remove();
    reindexRows();
    }
    });
    // Show/hide remove buttons
    function updateRemoveButtons() {
    const allRemoveButtons = document.querySelectorAll('.remove-row');
    allRemoveButtons.forEach(btn => btn.style.display = 'inline-block');
    if (allRemoveButtons.length === 0) {
    allRemoveButtons[0].style.display = 'none'; // hide if only one
    }
    }

    // Reindex name attributes after removing rows
    function reindexRows() {
    const rows = document.querySelectorAll('.form-group-group');
    index = 0;
    rows.forEach(row => {
    row.querySelector('select[name$="[product_id]"]').name = `selections[${index}][product_id]`;
    row.querySelector('select[name$="[company_id]"]').name = `selections[${index}][company_id]`;
    row.querySelector('select[name$="[model_id]"]').name = `selections[${index}][model_id]`;
    index++;
    });
    updateRemoveButtons();
    }

    // Initial setup
    updateRemoveButtons();</script>
<script>
    $('.gallery-delete-image').on('click', function () {
    let imageId = $(this).data('id');
    let imagePath = $(this).data('path');
    $.ajax({
    url: "{{ route('admin.register.gallery_image_delete') }}",
            type: 'POST',
            data: {
            _token: '{{ csrf_token() }}',
                    id: imageId,
                    path: imagePath
            },
            success: function (response) {
            if (response.success) {
            $('#gallery_' + imageId).remove(); // remove image from DOM
            } else {
            alert('Failed to delete image.');
            }
            }
    });
    });
    $('.business-company-pdf').on('click', function () {
    let imageId = $(this).data('id');
    let imagePath = $(this).data('path');
    $.ajax({
    url: "{{ route('admin.register.common_business_delete') }}",
            type: 'POST',
            data: {
            _token: '{{ csrf_token() }}',
                    id: imageId,
                    path: imagePath,
                    type: 'BusinessCompanyPdf'
            },
            success: function (response) {
            if (response.success) {
            $('#business_pdf_' + imageId).remove(); // remove image from DOM
            } else {
            alert('Failed to delete image.');
            }
            }
    });
    });</script>
<script>
    $('#role_id').change(function () {
    let selectedValues = $(this).val();
    $("#gallery_div").css("display", "none");
    $("#my_profile_div").css("display", "none");
    $("#product_information_div").css("display", "none");
    $("#working_with_div").css("display", "none");
    $("#top_graduates_div").css("display", "none");
    $("#parts_div").css("display", "none");
    $("#service_center_div").css("display", "none");
    $("#product_information_multi_div").css("display", "none");
    $("#gender_div").css("display", "none");
    if (selectedValues.includes("1")) { // provider rental_company
    $('#common_name_title').contents().first()[0].textContent = 'Sound Name';
    $("#gallery_div").css("display", "block");
    $("#my_profile_div").css("display", "block");
    $("#product_information_div").css("display", "block");
    } else if (selectedValues.includes("2")) { // supplier dealer
    $('#common_name_title').contents().first()[0].textContent = 'Business Name';
    $("#gallery_div").css("display", "block");
    $("#my_profile_div").css("display", "block");
    $("#parts_div").css("display", "block");
    $("#product_information_multi_div").css("display", "block");
    $("#service_center_div").css("display", "block");
    } else if (selectedValues.includes("3")) { // manufacturing
    $('#common_name_title').contents().first()[0].textContent = 'Company Name';
    $("#gallery_div").css("display", "block");
    $("#my_profile_div").css("display", "block");
    $("#parts_div").css("display", "block");
    $("#service_center_div").css("display", "block");
    } else if (selectedValues.includes("4")) { // dj operator
    $('#common_name_title').contents().first()[0].textContent = 'Business / Nick Name';
    $("#gallery_div").css("display", "block");
    $("#my_profile_div").css("display", "block");
    $("#gender_div").css("display", "block");
    } else if (selectedValues.includes("5")) { // sound operator
    $('#common_name_title').contents().first()[0].textContent = 'Business / Nick Name';
    $("#gallery_div").css("display", "block");
    $("#my_profile_div").css("display", "block");
    $("#working_with_div").css("display", "block");
    $("#gender_div").css("display", "block");
    } else if (selectedValues.includes("6")) { // spearpart
    $('#common_name_title').contents().first()[0].textContent = 'Your Shop Name';
    $("#gallery_div").css("display", "block");
    $("#my_profile_div").css("display", "block");
    $("#parts_div").css("display", "block");
    } else if (selectedValues.includes("7")) { // company service center
    $('#common_name_title').contents().first()[0].textContent = 'Shop Name';
    $("#gallery_div").css("display", "block");
    $("#my_profile_div").css("display", "block");
    $("#parts_div").css("display", "block");
    $("#product_information_multi_div").css("display", "block");
    $("#service_center_div").css("display", "block");
    } else if (selectedValues.includes("8")) { // private repairing shop
    $('#common_name_title').contents().first()[0].textContent = 'Service Center Name';
    $("#gallery_div").css("display", "block");
    $("#my_profile_div").css("display", "block");
    $("#working_with_div").css("display", "block");
    $("#service_center_div").css("display", "block");
    } else if (selectedValues.includes("9")) { // sound education
    $('#common_name_title').contents().first()[0].textContent = 'Sound Academy Name';
    $("#gallery_div").css("display", "block");
    $("#my_profile_div").css("display", "block");
    $("#top_graduates_div").css("display", "block");
    } else {
    $("#gallery_div").css("display", "none");
    $("#my_profile_div").css("display", "none");
    $("#product_information_div").css("display", "none");
    $("#working_with_div").css("display", "none");
    $("#top_graduates_div").css("display", "none");
    $("#parts_div").css("display", "none");
    $("#service_center_div").css("display", "none");
    $("#product_information_multi_div").css("display", "none");
    $("#gender_div").css("display", "none");
    }
    });
    $(document).ready(function () {
    $('.select2').select2();
    $('#role_id').trigger('change');
    //            let gallery_conf = {
    //                rules: {
    //                    'shop_images': {
    //                        required: true,
    //                        extension: "jpg|jpeg|png|gif|svg|webp"
    //                    }
    //                },
    //                messages: {
    //                    'shop_images': {
    //                        required: "Please upload at least one image.",
    //                        extension: "Only image files are allowed (jpg, jpeg, png, gif, svg, webp)."
    //                    }
    //                }
    //            };
    //            let validator = validationFormAndSubmit($('#user-gallery-from'), gallery_conf);
    });</script>
<script>
    $(document).ready(function () {
    // Loop through all inputs with class 'only-mobile'
    $('.only-mobile').each(function (index) {
    var input = $(this);
    var inputId = input.attr('id'); // e.g., mobile_number1
    var number = inputId.match(/\d+/); // Extracts number like '1', '2', etc.
    if (!number)
            return;
    // Init intlTelInput
    input.intlTelInput({
    initialCountry: "auto",
            geoIpLookup: function (success, failure) {
            $.get("https://ipinfo.io", function () {}, "jsonp").always(function (resp) {
            var countryCode = (resp && resp.country) ? resp.country : "us";
            success(countryCode);
            });
            },
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
    });
    // On country change or keyup, update hidden fields
    input.on("countrychange keyup", function () {
    var selectedCountryData = input.intlTelInput("getSelectedCountryData");
    var countryCode = selectedCountryData.dialCode;
    var isoCode = selectedCountryData.iso2;
    // Set hidden input values
    $('#country_code' + number).val("+" + countryCode);
    $('#country_iso' + number).val(isoCode.toUpperCase());
    });
    });
    });</script>
<script>
    $('.delete-visiting-card').on('click', function () {
    let imageId = $(this).data('id');
    $.ajax({
    url: "{{ route('admin.register.delete_visiting_card') }}",
            type: 'POST',
            data: {
            _token: '{{ csrf_token() }}',
                    id: imageId
            },
            success: function (response) {
            if (response.success) {
            $('#delete_visiting_card_div').remove(); // remove image from DOM
            } else {
            alert('Failed to delete image.');
            }
            }
    });
    });</script>
<script>
    // Add new input field
    document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('btn-add-graduates')) {
    const wrapper = document.getElementById('graduates-with-wrapper');
    const newField = document.createElement('div');
    newField.className = 'form-group col-lg-12 d-flex mb-2';
    newField.innerHTML = `
                <input type="text" name="working_with[]" placeholder="Enter Name" class="form-control mr-2" required>
                <button type="button" class="btn btn-danger btn-remove-graduates">Remove</button>
            `;
    wrapper.appendChild(newField);
    }

    // Remove input field
    if (e.target && e.target.classList.contains('btn-remove-graduates')) {
    e.target.parentElement.remove();
    }
    });
    // Store JSON on submit
    function storeJson() {
    const inputs = document.querySelectorAll('input[name="working_with[]"]');
    const values = Array.from(inputs).map(input => input.value.trim()).filter(v => v);
    document.getElementById('working_with_json').value = JSON.stringify(values);
    }
</script>
<script>
    $('.delete-review').on('click', function () {
    let imageId = $(this).data('id');
    $.ajax({
    url: "{{ route('admin.register.delete_review') }}",
            type: 'POST',
            data: {
            _token: '{{ csrf_token() }}',
                    id: imageId
            },
            success: function (response) {
            if (response.success) {
            $('#delete_review_div_' + imageId).remove(); // remove image from DOM
            } else {
            alert('Failed to delete image.');
            }
            }
    });
    });
</script>
@endpush
