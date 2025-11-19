@extends('admin.layouts.default')
@section('title', 'Users & Directory')
@section('content')
<!--<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.5/dist/jquery.validate.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/intlTelInput.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/css/intlTelInput.min.css">-->
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
</style>
<style>
    .select2-selection__choice {
        color: #000 !important;
    }
    .select2-search__field{
        width: 35.75em !important;
    }
</style>
<style>
    .phone-group { margin-bottom: 10px; }
    .remove-btn { color: red; cursor: pointer; }
</style>
<!-- begin:: Subheader -->
<div class="kt-subheader   kt-grid__item" id="kt_subheader">
    <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">Users & Directory</h3>
        <span class="kt-subheader__separator kt-hidden"></span>
        <div class="kt-subheader__breadcrumbs">
            <span class="kt-subheader__breadcrumbs-separator"></span>
            <a href="{{ route('admin.register.list') }}" class="kt-subheader__breadcrumbs-link" title="Back">List</a>
            <span class="kt-subheader__breadcrumbs-separator"></span>
            <a href="javascript:;" class="kt-subheader__breadcrumbs-link"
               title="Back">{{ $data ? 'Edit' : 'Add' }}</a>
        </div>
    </div>

</div>

<!-- end:: Subheader -->

<!-- begin:: Content -->
<div class="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
    @include('admin.layouts.flash-message')
    <div class="kt-portlet kt-portlet--mobile">
        <div class="kt-portlet__head kt-portlet__head--lg">
            <div class="kt-portlet__head-label">
                <span class="kt-portlet__head-icon">
                    <i class="kt-font-brand flaticon-user-settings"></i>
                </span>
                <h3 class="kt-portlet__head-title">
                    {{ $data ? 'Edit' : 'Add' }} Users & Directory
                </h3>
            </div>
        </div>
        <!--begin::Portlet-->
        <!--begin::Form-->
        <form class="kt-form" action="{{ route('admin.register.store') }}" id="user-add-from" method="post"
              isReload="{{ route('admin.register.list') }}" enctype="multipart/form-data">
            @csrf
            <input type="hidden" name="edit_id" value="{{ $data->id ?? null }}">
            <input type="hidden" name="status" value="{{ $data->status ?? '1' }}">
            <div class="kt-portlet__body">
                <div class="form-group row">
                    <div class="col-lg-12">
                        <label>Role: <span class="text-danger">*</span></label>
                        <select id="role_id" name="role_id" class="form-control">
                            <option value="">Please select role</option>
                            @foreach($role as $role_row)
                            <option value="{{ $role_row->id }}"
                                    @if(isset($data) && isset($data->role_id) && in_array($role_row->id, array_map('intval', explode(',', $data->role_id)))) selected @endif>
                                    {{ $role_row->name }}
                        </option>
                        @endforeach
                    </select>
                </div>    
            </div>

            <div id="common_details" style="display: none">
                <div class="form-group row">
                    <div class="form-group col-lg-12" id="owner_details" style="display: none;">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <label class="mb-0">MD Details</label>
                            <button type="button" class="btn btn-sm btn-primary" onclick="add_more_fields();">Add More</button>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <label>Name <span class="text-danger">*</span></label>
                                <input type="text" name="name[]" id="name1" placeholder="Enter Name" value="{{ $data->name ?? null }}" class="form-control">
                                <input type="hidden" name="type[]" id="type" value="Owner">
                            </div>
                            <div class="col-md-4">
                                <label>Mobile Number <span class="text-danger">*</span></label>
                                <input type="tel" name="mobile_number[]" id="mobile_number1" data-validation="required|number" value="{{ $data->code ?? null }}{{ $data->mobile_number ?? null }}" class="form-control only-mobile" placeholder="">
                                <input type="hidden" id="country_code1" name="code[]">
                                <input type="hidden" id="country_iso1" name="code_sort[]">
                            </div>
                            <div class="col-md-4">
                                <label>Email <span class="text-danger">*</span></label>
                                <input type="email" name="email[]" id="email1" placeholder="Enter Email"
                                       value="{{ $data->email ?? null }}" class="form-control">
                            </div>
                            <input type="hidden" name="marketing_details_count" id="marketing_details_count" value="0">
                            <input type="hidden" name="other_details_count" id="other_details_count" value="0">
                        </div>
                    </div>
                    <div class="form-group col-lg-12" id="marketing_details" style="display: none;">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <label class="mb-0">Marketing Details</label>
                            <button type="button" class="btn btn-sm btn-danger" onclick="remove_more_fields('marketing');">Remove</button>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <label>Name</label>
                                <input type="text" name="name[]" id="name2" placeholder="Enter Name" value="{{ $data->name ?? null }}" class="form-control">
                                <input type="hidden" name="type[]" id="type" placeholder="" value="Marketing" class="form-control">
                            </div>
                            <div class="col-md-4">
                                <label>Mobile Number</label>
                                <input type="tel" name="mobile_number[]" id="mobile_number2" data-validation="required|number" value="{{ $data->code ?? null }}{{ $data->mobile_number ?? null }}" class="form-control only-mobile" placeholder="">
                                <input type="hidden" id="country_code2" name="code[]">
                                <input type="hidden" id="country_iso2" name="code_sort[]">
                            </div>
                            <div class="col-md-4">
                                <label>Email</label>
                                <input type="email" name="email[]" id="email2" placeholder="Enter Email"
                                       value="{{ $data->email ?? null }}" class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-lg-12" id="other_details" style="display: none;">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <label class="mb-0">Other Details</label>
                            <button type="button" class="btn btn-sm btn-danger" onclick="remove_more_fields('other');">Remove</button>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <label>Name</label>
                                <input type="text" name="name[]" id="name3" placeholder="Enter Name" value="{{ $data->name ?? null }}" class="form-control">
                                <input type="hidden" name="type[]" id="type" placeholder="" value="Other" class="form-control">
                            </div>
                            <div class="col-md-4">
                                <label>Mobile Number</label>
                                <input type="tel" name="mobile_number[]" id="mobile_number3" data-validation="required|number" value="{{ $data->code ?? null }}{{ $data->mobile_number ?? null }}" class="form-control only-mobile" placeholder="">
                                <input type="hidden" id="country_code3" name="code[]">
                                <input type="hidden" id="country_iso3" name="code_sort[]">
                            </div>
                            <div class="col-md-4">
                                <label>Email</label>
                                <input type="email" name="email[]" id="email3" placeholder="Enter Email"
                                       value="{{ $data->email ?? null }}" class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-lg-6" id="common_gender_div" style="display: none;">
                        <label>Gender <span class="text-danger">*</span></label><br>
                        <label>
                            <input type="radio" name="gender" value="male" {{ old('gender', $data->gender ?? '') === 'male' ? 'checked' : '' }}> Male
                        </label>
                        <label>
                            <input type="radio" name="gender" value="female" {{ old('gender', $data->gender ?? '') === 'female' ? 'checked' : '' }}> Female
                        </label>
                    </div>
                    <div class="form-group col-lg-6" id="common_name_div" style="display: none;">
                        <label id="common_name_title">Name <span class="text-danger">*</span></label>
                        <input type="text" name="name" id="name" placeholder="Enter Name" value="{{ $data->name ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-6" id="common_personal_name_div" style="display: none;">
                        <label>Personal Name <span class="text-danger">*</span></label>
                        <input type="text" name="personal_name" id="personal_name" placeholder="Enter Personal Name" value="{{ $data->personal_name ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-6" id="common_what_manufacturer_div" style="display: none;">
                        <label>What Manufacturer You Are Doing?: <span class="text-danger">*</span></label>
                        <select id="categories_id" name="categories_id" class="form-control">
                            <option value="">Select</option>
                            @foreach($manufacturer as $manufacturer_row)
                            <option value="{{ $manufacturer_row->id }}" @if(isset($data) && $data->categories_id == $manufacturer_row->id) selected @endif> {{ $manufacturer_row->name }} </option>
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group col-lg-6" id="common_email_div" style="display: none;">
                        <label>Email <span class="text-danger">*</span></label>
                        <input type="email" name="email" id="email" placeholder="Enter Email"
                               value="{{ $data->email ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-6" id="common_mobile_number_div" style="display: none;">
                        <label>Mobile Number <span class="text-danger">*</span></label>
                        <input type="tel" id="mobile_number" name="mobile_number" data-validation="required|number" value="{{ $data->code ?? null }}{{ $data->mobile_number ?? null }}" class="form-control only-mobile" placeholder="">
                        <input type="hidden" name="code" id="country_code" value="{{ $data->code ?? null }}">
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Country: <span class="text-danger">*</span></label>
                        <select id="country_id" name="country_id" class="form-control">
                            <option value="">Select Country</option>
                            @foreach($country as $country_row)
                            <option value="{{ $country_row->id }}" @if(isset($data) && $data->country_id == $country_row->id) selected @endif> {{ $country_row->country_name }} </option>
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group col-lg-6">
                        <label>State: <span class="text-danger">*</span></label>
                        <select id="state_id" name="state_id" class="form-control">
                            <option value="">Select Country First</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-6">
                        <label>City: <span class="text-danger">*</span></label>
                        <select id="city_id" name="city_id" class="form-control">
                            <option value="">Select State First</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Village Or Area <span class="text-danger">*</span></label>
                        <input type="text" name="village" id="village" placeholder="Enter Village Or Area" value="{{ $data->village ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-6" id="common_visiting_card_image_div" style="display: none;">
                        <label>Visiting Card Image </label>
                        <div class="custom-file">
                            <input type="file" name="visiting_card_image" class="custom-file-input" id="userImage" accept="image/*">
                            <label class="custom-file-label text-truncate" for="userImage">Choose file</label>
                            <span class="form-text text-muted">The Image must not be greater than 2MB. and file type:
                                jpg, jpeg, png.</span>
                            @if ($data && $data->visiting_card_image)
                            <a href="{{ $data->visiting_card_image_url }}" target="_blank">View Image</a>
                            @endif
                        </div>
                    </div>
                    <div class="form-group col-lg-6" id="common_facebook_link_div" style="display: none;">
                        <label>Facebook <span class="text-danger">*</span></label>
                        <input type="text" name="facebook_link" id="facebook_link" placeholder="Enter Facebook URL" value="{{ $data->facebook_link ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-6" id="common_instagram_link_div" style="display: none;">
                        <label>Instagram <span class="text-danger">*</span></label>
                        <input type="text" name="instagram_link" id="instagram_link" placeholder="Enter Instagram URL" value="{{ $data->instagram_link ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-6" id="common_web_link_div" style="display: none;">
                        <label>Website <span class="text-danger">*</span></label>
                        <input type="text" name="web_link" id="web_link" placeholder="Enter Website URL" value="{{ $data->web_link ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-6" id="common_youtube_link_div" style="display: none;">
                        <label>Youtube </label>
                        <input type="text" name="youtube_link" id="youtube_link" placeholder="Enter Youtube URL" value="{{ $data->youtube_link ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-6" id="common_description_div" style="display: none;">
                        <label>About Us</label>
                        <textarea id="description" name="description" placeholder="Enter About Us" class="form-control" >{{ $data->description ?? null }}</textarea>
                    </div>
                    <div class="form-group col-lg-12">
                        <label>Location <span class="text-danger">*</span></label>
                        <input type="text" name="location" id="location" onclick="OpenMapPopup();" placeholder="Enter Location" value="{{ $data->location ?? null }}" class="form-control">
                        <input type="hidden" name="latitude" id="latitude" value="{{ $data->latitude ?? null }}">
                        <input type="hidden" name="longitude" id="longitude" value="{{ $data->longitude ?? null }}">
                    </div>
                </div>
            </div>



            <div id="rental_company" style="display: none">
                <div class="form-group row">
                    <div class="form-group col-lg-6">
                        <label>Sound Name <span class="text-danger">*</span></label>
                        <input type="text" name="name" id="name" placeholder="Enter Sound Name" value="{{ $data->name ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Personal Name <span class="text-danger">*</span></label>
                        <input type="text" name="personal_name" id="personal_name" placeholder="Enter Personal Name" value="{{ $data->personal_name ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Email <span class="text-danger">*</span></label>
                        <input type="email" name="email" id="email" placeholder="Enter Email"
                               value="{{ $data->email ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Mobile Number <span class="text-danger">*</span></label>
                        <input type="tel" id="mobile_number" name="mobile_number" data-validation="required|number" value="{{ $data->code ?? null }}{{ $data->mobile_number ?? null }}" class="form-control only-mobile" placeholder="">
                        <input type="hidden" name="code" id="country_code" value="{{ $data->code ?? null }}">
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Country: <span class="text-danger">*</span></label>
                        <select id="country_id" name="country_id" class="form-control">
                            <option value="">Select Country</option>
                            @foreach($country as $country_row)
                            <option value="{{ $country_row->id }}" @if(isset($data) && $data->country_id == $country_row->id) selected @endif> {{ $country_row->country_name }} </option>
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group col-lg-6">
                        <label>State: <span class="text-danger">*</span></label>
                        <select id="state_id" name="state_id" class="form-control">
                            <option value="">Select Country First</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-6">
                        <label>City: <span class="text-danger">*</span></label>
                        <select id="city_id" name="city_id" class="form-control">
                            <option value="">Select State First</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Village Or Area <span class="text-danger">*</span></label>
                        <input type="text" name="village" id="village" placeholder="Enter Village Or Area" value="{{ $data->village ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-12">
                        <label>Location <span class="text-danger">*</span></label>
                        <input type="text" name="location" id="location" onclick="OpenMapPopup();" placeholder="Enter Location" value="{{ $data->location ?? null }}" class="form-control">
                        <input type="hidden" name="latitude" id="latitude" value="{{ $data->latitude ?? null }}">
                        <input type="hidden" name="longitude" id="longitude" value="{{ $data->longitude ?? null }}">
                    </div>

                </div>
            </div>    

            <div id="dealer_supplier" style="display: none">
                <div class="form-group row">

                    <div class="form-group col-lg-12">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <label class="mb-0">MD Details</label>
                            <button type="button" class="btn btn-sm btn-primary" onclick="add_more_fields();">Add More</button>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <label>Name <span class="text-danger">*</span></label>
                                <input type="text" name="name[]" id="name1" placeholder="Enter Name" value="{{ $data->name ?? null }}" class="form-control">
                                <input type="hidden" name="type[]" id="type" value="Owner">
                            </div>
                            <div class="col-md-4">
                                <label>Mobile Number <span class="text-danger">*</span></label>
                                <input type="tel" name="mobile_number[]" id="mobile_number1" data-validation="required|number" value="{{ $data->code ?? null }}{{ $data->mobile_number ?? null }}" class="form-control only-mobile" placeholder="">
                                <input type="hidden" id="country_code1" name="code[]">
                                <input type="hidden" id="country_iso1" name="code_sort[]">
                            </div>
                            <div class="col-md-4">
                                <label>Email <span class="text-danger">*</span></label>
                                <input type="email" name="email[]" id="email1" placeholder="Enter Email"
                                       value="{{ $data->email ?? null }}" class="form-control">
                            </div>
                            <input type="hidden" name="marketing_details_count" id="marketing_details_count" value="0">
                            <input type="hidden" name="other_details_count" id="other_details_count" value="0">
                        </div>
                    </div>
                    <div class="form-group col-lg-12" id="marketing_details" style="display: none;">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <label class="mb-0">Marketing Details</label>
                            <button type="button" class="btn btn-sm btn-danger" onclick="remove_more_fields('marketing');">Remove</button>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <label>Name</label>
                                <input type="text" name="name[]" id="name2" placeholder="Enter Name" value="{{ $data->name ?? null }}" class="form-control">
                                <input type="hidden" name="type[]" id="type" placeholder="" value="Marketing" class="form-control">
                            </div>
                            <div class="col-md-4">
                                <label>Mobile Number</label>
                                <input type="tel" name="mobile_number[]" id="mobile_number2" data-validation="required|number" value="{{ $data->code ?? null }}{{ $data->mobile_number ?? null }}" class="form-control only-mobile" placeholder="">
                                <input type="hidden" id="country_code2" name="code[]">
                                <input type="hidden" id="country_iso2" name="code_sort[]">
                            </div>
                            <div class="col-md-4">
                                <label>Email</label>
                                <input type="email" name="email[]" id="email2" placeholder="Enter Email"
                                       value="{{ $data->email ?? null }}" class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-lg-12" id="other_details" style="display: none;">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <label class="mb-0">Other Details</label>
                            <button type="button" class="btn btn-sm btn-danger" onclick="remove_more_fields('other');">Remove</button>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <label>Name</label>
                                <input type="text" name="name[]" id="name3" placeholder="Enter Name" value="{{ $data->name ?? null }}" class="form-control">
                                <input type="hidden" name="type[]" id="type" placeholder="" value="Other" class="form-control">
                            </div>
                            <div class="col-md-4">
                                <label>Mobile Number</label>
                                <input type="tel" name="mobile_number[]" id="mobile_number3" data-validation="required|number" value="{{ $data->code ?? null }}{{ $data->mobile_number ?? null }}" class="form-control only-mobile" placeholder="">
                                <input type="hidden" id="country_code3" name="code[]">
                                <input type="hidden" id="country_iso3" name="code_sort[]">
                            </div>
                            <div class="col-md-4">
                                <label>Email</label>
                                <input type="email" name="email[]" id="email3" placeholder="Enter Email"
                                       value="{{ $data->email ?? null }}" class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Shop Name <span class="text-danger">*</span></label>
                        <input type="text" name="name" id="name" placeholder="Enter Shop Name" value="{{ $data->name ?? null }}" class="form-control">
                    </div>

                    <div class="form-group col-lg-6">
                        <label>Country: <span class="text-danger">*</span></label>
                        <select id="country_id" name="country_id" class="form-control">
                            <option value="">Select Country</option>
                            @foreach($country as $country_row)
                            <option value="{{ $country_row->id }}" @if(isset($data) && $data->country_id == $country_row->id) selected @endif> {{ $country_row->country_name }} </option>
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group col-lg-6">
                        <label>State: <span class="text-danger">*</span></label>
                        <select id="state_id" name="state_id" class="form-control">
                            <option value="">Select Country First</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-6">
                        <label>City: <span class="text-danger">*</span></label>
                        <select id="city_id" name="city_id" class="form-control">
                            <option value="">Select State First</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Village Or Area <span class="text-danger">*</span></label>
                        <input type="text" name="village" id="village" placeholder="Enter Village Or Area" value="{{ $data->village ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-12">
                        <label>Location <span class="text-danger">*</span></label>
                        <input type="text" name="location" id="location" onclick="OpenMapPopup();" placeholder="Enter Location" value="{{ $data->location ?? null }}" class="form-control">
                        <input type="hidden" name="latitude" id="latitude" value="{{ $data->latitude ?? null }}">
                        <input type="hidden" name="longitude" id="longitude" value="{{ $data->longitude ?? null }}">
                    </div>

                </div>
            </div> 

            <div id="manufacturer" style="display: none">
                <div class="form-group row">

                    <div class="form-group col-lg-6">
                        <label>Company Name <span class="text-danger">*</span></label>
                        <input type="text" name="company_name" id="company_name" placeholder="Enter Company Name" value="{{ $data->company_name ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-6">
                        <label>What Manufacturer You Are Doing?: <span class="text-danger">*</span></label>
                        <select id="country_id" name="country_id" class="form-control">
                            <option value="">Select</option>
                            @foreach($manufacturer as $manufacturer_row)
                            <option value="{{ $manufacturer_row->id }}" @if(isset($data) && $data->country_id == $manufacturer_row->id) selected @endif> {{ $manufacturer_row->name }} </option>
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group col-lg-12">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <label class="mb-0">MD Details</label>
                            <button type="button" class="btn btn-sm btn-primary" onclick="add_more_fields();">Add More</button>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <label>Name <span class="text-danger">*</span></label>
                                <input type="text" name="name[]" id="name1" placeholder="Enter Name" value="{{ $data->name ?? null }}" class="form-control">
                                <input type="hidden" name="type[]" id="type" value="Owner">
                            </div>
                            <div class="col-md-4">
                                <label>Mobile Number <span class="text-danger">*</span></label>
                                <input type="tel" name="mobile_number[]" id="mobile_number1" data-validation="required|number" value="" class="form-control only-mobile" placeholder="">
                                <input type="hidden" id="country_code1" name="code[]">
                                <input type="hidden" id="country_iso1" name="code_sort[]">
                            </div>
                            <div class="col-md-4">
                                <label>Email <span class="text-danger">*</span></label>
                                <input type="email" name="email[]" id="email1" placeholder="Enter Email"
                                       value="{{ $data->email ?? null }}" class="form-control">
                            </div>
                            <input type="hidden" name="marketing_details_count" id="marketing_details_count" value="0">
                            <input type="hidden" name="other_details_count" id="other_details_count" value="0">
                        </div>
                    </div>
                    <div class="form-group col-lg-12" id="marketing_details" style="display: none;">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <label class="mb-0">Marketing Details</label>
                            <button type="button" class="btn btn-sm btn-danger" onclick="remove_more_fields('marketing');">Remove</button>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <label>Name</label>
                                <input type="text" name="name[]" id="name2" placeholder="Enter Name" value="{{ $data->name ?? null }}" class="form-control">
                                <input type="hidden" name="type[]" id="type" placeholder="" value="Marketing" class="form-control">
                            </div>
                            <div class="col-md-4">
                                <label>Mobile Number</label>
                                <input type="tel" name="mobile_number[]" id="mobile_number2" data-validation="required|number" value="{{ $data->code ?? null }}{{ $data->mobile_number ?? null }}" class="form-control only-mobile" placeholder="">
                                <input type="hidden" id="country_code2" name="code[]">
                                <input type="hidden" id="country_iso2" name="code_sort[]">
                            </div>
                            <div class="col-md-4">
                                <label>Email</label>
                                <input type="email" name="email[]" id="email2" placeholder="Enter Email"
                                       value="{{ $data->email ?? null }}" class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-lg-12" id="other_details" style="display: none;">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <label class="mb-0">Other Details</label>
                            <button type="button" class="btn btn-sm btn-danger" onclick="remove_more_fields('other');">Remove</button>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <label>Name</label>
                                <input type="text" name="name[]" id="name3" placeholder="Enter Name" value="{{ $data->name ?? null }}" class="form-control">
                                <input type="hidden" name="type[]" id="type" placeholder="" value="Other" class="form-control">
                            </div>
                            <div class="col-md-4">
                                <label>Mobile Number</label>
                                <input type="tel" name="mobile_number[]" id="mobile_number3" data-validation="required|number" value="{{ $data->code ?? null }}{{ $data->mobile_number ?? null }}" class="form-control only-mobile" placeholder="">
                                <input type="hidden" id="country_code3" name="code[]">
                                <input type="hidden" id="country_iso3" name="code_sort[]">
                            </div>
                            <div class="col-md-4">
                                <label>Email</label>
                                <input type="email" name="email[]" id="email3" placeholder="Enter Email"
                                       value="{{ $data->email ?? null }}" class="form-control">
                            </div>
                        </div>
                    </div>


                    <div class="form-group col-lg-6">
                        <label>Country: <span class="text-danger">*</span></label>
                        <select id="country_id" name="country_id" class="form-control">
                            <option value="">Select Country</option>
                            @foreach($country as $country_row)
                            <option value="{{ $country_row->id }}" @if(isset($data) && $data->country_id == $country_row->id) selected @endif> {{ $country_row->country_name }} </option>
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group col-lg-6">
                        <label>State: <span class="text-danger">*</span></label>
                        <select id="state_id" name="state_id" class="form-control">
                            <option value="">Select Country First</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-6">
                        <label>City: <span class="text-danger">*</span></label>
                        <select id="city_id" name="city_id" class="form-control">
                            <option value="">Select State First</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Village Or Area <span class="text-danger">*</span></label>
                        <input type="text" name="village" id="village" placeholder="Enter Village Or Area" value="{{ $data->village ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-12">
                        <label>Location <span class="text-danger">*</span></label>
                        <input type="text" name="location" id="location" onclick="OpenMapPopup();" placeholder="Enter Location" value="{{ $data->location ?? null }}" class="form-control">
                        <input type="hidden" name="latitude" id="latitude" value="{{ $data->latitude ?? null }}">
                        <input type="hidden" name="longitude" id="longitude" value="{{ $data->longitude ?? null }}">
                    </div>

                </div>
            </div> 
            <div id="dj_operator" style="display: none">
                <div class="form-group row">
                    <div class="form-group col-lg-6">
                        <label>Gender <span class="text-danger">*</span></label><br>
                        <label>
                            <input type="radio" name="gender" value="male" {{ old('gender', $data->gender ?? '') === 'male' ? 'checked' : '' }}> Male
                        </label>
                        <label>
                            <input type="radio" name="gender" value="female" {{ old('gender', $data->gender ?? '') === 'female' ? 'checked' : '' }}> Female
                        </label>
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Business / Nick Name <span class="text-danger">*</span></label>
                        <input type="text" name="name" id="name" placeholder="Enter Business / Nick Name" value="{{ $data->name ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Personal Name <span class="text-danger">*</span></label>
                        <input type="text" name="personal_name" id="personal_name" placeholder="Enter Personal Name" value="{{ $data->personal_name ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Email <span class="text-danger">*</span></label>
                        <input type="email" name="email" id="email" placeholder="Enter Email"
                               value="{{ $data->email ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Mobile Number <span class="text-danger">*</span></label>
                        <input type="tel" id="mobile_number" name="mobile_number" data-validation="required|number" value="{{ $data->code ?? null }}{{ $data->mobile_number ?? null }}" class="form-control only-mobile" placeholder="">
                        <input type="hidden" name="code" id="country_code" value="{{ $data->code ?? null }}">
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Country: <span class="text-danger">*</span></label>
                        <select id="country_id" name="country_id" class="form-control">
                            <option value="">Select Country</option>
                            @foreach($country as $country_row)
                            <option value="{{ $country_row->id }}" @if(isset($data) && $data->country_id == $country_row->id) selected @endif> {{ $country_row->country_name }} </option>
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group col-lg-6">
                        <label>State: <span class="text-danger">*</span></label>
                        <select id="state_id" name="state_id" class="form-control">
                            <option value="">Select Country First</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-6">
                        <label>City: <span class="text-danger">*</span></label>
                        <select id="city_id" name="city_id" class="form-control">
                            <option value="">Select State First</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Village Or Area <span class="text-danger">*</span></label>
                        <input type="text" name="village" id="village" placeholder="Enter Village" value="{{ $data->village ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-12">
                        <label>Location <span class="text-danger">*</span></label>
                        <input type="text" name="location" id="location" onclick="OpenMapPopup();" placeholder="Enter Location" value="{{ $data->location ?? null }}" class="form-control">
                        <input type="hidden" name="latitude" id="latitude" value="{{ $data->latitude ?? null }}">
                        <input type="hidden" name="longitude" id="longitude" value="{{ $data->longitude ?? null }}">
                    </div>

                </div>
            </div>

            <div id="sound_operator" style="display: none">
                <div class="form-group row">
                    <div class="form-group col-lg-6">
                        <label>Gender <span class="text-danger">*</span></label><br>
                        <label>
                            <input type="radio" name="gender" value="male" {{ old('gender', $data->gender ?? '') === 'male' ? 'checked' : '' }}> Male
                        </label>
                        <label>
                            <input type="radio" name="gender" value="female" {{ old('gender', $data->gender ?? '') === 'female' ? 'checked' : '' }}> Female
                        </label>
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Business / Nick Name <span class="text-danger">*</span></label>
                        <input type="text" name="name" id="name" placeholder="Enter Business / Nick Name" value="{{ $data->name ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Personal Name <span class="text-danger">*</span></label>
                        <input type="text" name="personal_name" id="personal_name" placeholder="Enter Personal Name" value="{{ $data->personal_name ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Email <span class="text-danger">*</span></label>
                        <input type="email" name="email" id="email" placeholder="Enter Email"
                               value="{{ $data->email ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Mobile Number <span class="text-danger">*</span></label>
                        <input type="tel" id="mobile_number" name="mobile_number" data-validation="required|number" value="{{ $data->code ?? null }}{{ $data->mobile_number ?? null }}" class="form-control only-mobile" placeholder="">
                        <input type="hidden" name="code" id="country_code" value="{{ $data->code ?? null }}">
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Country: <span class="text-danger">*</span></label>
                        <select id="country_id" name="country_id" class="form-control">
                            <option value="">Select Country</option>
                            @foreach($country as $country_row)
                            <option value="{{ $country_row->id }}" @if(isset($data) && $data->country_id == $country_row->id) selected @endif> {{ $country_row->country_name }} </option>
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group col-lg-6">
                        <label>State: <span class="text-danger">*</span></label>
                        <select id="state_id" name="state_id" class="form-control">
                            <option value="">Select Country First</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-6">
                        <label>City: <span class="text-danger">*</span></label>
                        <select id="city_id" name="city_id" class="form-control">
                            <option value="">Select State First</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Village Or Area <span class="text-danger">*</span></label>
                        <input type="text" name="village" id="village" placeholder="Enter Village Or Area" value="{{ $data->village ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-12">
                        <label>Location <span class="text-danger">*</span></label>
                        <input type="text" name="location" id="location" onclick="OpenMapPopup();" placeholder="Enter Location" value="{{ $data->location ?? null }}" class="form-control">
                        <input type="hidden" name="latitude" id="latitude" value="{{ $data->latitude ?? null }}">
                        <input type="hidden" name="longitude" id="longitude" value="{{ $data->longitude ?? null }}">
                    </div>

                </div>
            </div>

            <div id="spare_part" style="display: none">
                <div class="form-group row">
                    <div class="form-group col-lg-6">
                        <label>Personal Name <span class="text-danger">*</span></label>
                        <input type="text" name="personal_name" id="personal_name" placeholder="Enter Personal Name" value="{{ $data->personal_name ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Your Shop Name <span class="text-danger">*</span></label>
                        <input type="text" name="personal_name" id="personal_name" placeholder="Enter Your Shop Name" value="{{ $data->personal_name ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Email <span class="text-danger">*</span></label>
                        <input type="email" name="email" id="email" placeholder="Enter Email"
                               value="{{ $data->email ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Mobile Number <span class="text-danger">*</span></label>
                        <input type="tel" id="mobile_number" name="mobile_number" data-validation="required|number" value="{{ $data->code ?? null }}{{ $data->mobile_number ?? null }}" class="form-control only-mobile" placeholder="">
                        <input type="hidden" name="code" id="country_code" value="{{ $data->code ?? null }}">
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Country: <span class="text-danger">*</span></label>
                        <select id="country_id" name="country_id" class="form-control">
                            <option value="">Select Country</option>
                            @foreach($country as $country_row)
                            <option value="{{ $country_row->id }}" @if(isset($data) && $data->country_id == $country_row->id) selected @endif> {{ $country_row->country_name }} </option>
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group col-lg-6">
                        <label>State: <span class="text-danger">*</span></label>
                        <select id="state_id" name="state_id" class="form-control">
                            <option value="">Select Country First</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-6">
                        <label>City: <span class="text-danger">*</span></label>
                        <select id="city_id" name="city_id" class="form-control">
                            <option value="">Select State First</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Village Or Area <span class="text-danger">*</span></label>
                        <input type="text" name="village" id="village" placeholder="Enter Village" value="{{ $data->village ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-12">
                        <label>Location <span class="text-danger">*</span></label>
                        <input type="text" name="location" id="location" onclick="OpenMapPopup();" placeholder="Enter Location" value="{{ $data->location ?? null }}" class="form-control">
                        <input type="hidden" name="latitude" id="latitude" value="{{ $data->latitude ?? null }}">
                        <input type="hidden" name="longitude" id="longitude" value="{{ $data->longitude ?? null }}">
                    </div>

                </div>
            </div>

            <div id="importer" style="display: none">
                <div class="form-group row">

                    <div class="form-group col-lg-12">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <label class="mb-0">MD Details</label>
                            <button type="button" class="btn btn-sm btn-primary" onclick="add_more_fields();">Add More</button>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <label>Name <span class="text-danger">*</span></label>
                                <input type="text" name="name[]" id="name1" placeholder="Enter Name" value="{{ $data->name ?? null }}" class="form-control">
                                <input type="hidden" name="type[]" id="type" value="Owner">
                            </div>
                            <div class="col-md-4">
                                <label>Mobile Number <span class="text-danger">*</span></label>
                                <input type="tel" name="mobile_number[]" id="mobile_number1" data-validation="required|number" value="" class="form-control only-mobile" placeholder="">
                                <input type="hidden" id="country_code1" name="code[]">
                                <input type="hidden" id="country_iso1" name="code_sort[]">
                            </div>
                            <div class="col-md-4">
                                <label>Email <span class="text-danger">*</span></label>
                                <input type="email" name="email[]" id="email1" placeholder="Enter Email"
                                       value="{{ $data->email ?? null }}" class="form-control">
                            </div>
                            <input type="hidden" name="marketing_details_count" id="marketing_details_count" value="0">
                            <input type="hidden" name="other_details_count" id="other_details_count" value="0">
                        </div>
                    </div>
                    <div class="form-group col-lg-12" id="marketing_details" style="display: none;">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <label class="mb-0">Marketing Details</label>
                            <button type="button" class="btn btn-sm btn-danger" onclick="remove_more_fields('marketing');">Remove</button>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <label>Name</label>
                                <input type="text" name="name[]" id="name2" placeholder="Enter Name" value="{{ $data->name ?? null }}" class="form-control">
                                <input type="hidden" name="type[]" id="type" placeholder="" value="Marketing" class="form-control">
                            </div>
                            <div class="col-md-4">
                                <label>Mobile Number</label>
                                <input type="tel" name="mobile_number[]" id="mobile_number2" data-validation="required|number" value="{{ $data->code ?? null }}{{ $data->mobile_number ?? null }}" class="form-control only-mobile" placeholder="">
                                <input type="hidden" id="country_code2" name="code[]">
                                <input type="hidden" id="country_iso2" name="code_sort[]">
                            </div>
                            <div class="col-md-4">
                                <label>Email</label>
                                <input type="email" name="email[]" id="email2" placeholder="Enter Email"
                                       value="{{ $data->email ?? null }}" class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-lg-12" id="other_details" style="display: none;">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <label class="mb-0">Other Details</label>
                            <button type="button" class="btn btn-sm btn-danger" onclick="remove_more_fields('other');">Remove</button>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <label>Name</label>
                                <input type="text" name="name[]" id="name3" placeholder="Enter Name" value="{{ $data->name ?? null }}" class="form-control">
                                <input type="hidden" name="type[]" id="type" placeholder="" value="Other" class="form-control">
                            </div>
                            <div class="col-md-4">
                                <label>Mobile Number</label>
                                <input type="tel" name="mobile_number[]" id="mobile_number3" data-validation="required|number" value="{{ $data->code ?? null }}{{ $data->mobile_number ?? null }}" class="form-control only-mobile" placeholder="">
                                <input type="hidden" id="country_code3" name="code[]">
                                <input type="hidden" id="country_iso3" name="code_sort[]">
                            </div>
                            <div class="col-md-4">
                                <label>Email</label>
                                <input type="email" name="email[]" id="email3" placeholder="Enter Email"
                                       value="{{ $data->email ?? null }}" class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Shop Name <span class="text-danger">*</span></label>
                        <input type="text" name="name" id="name" placeholder="Enter Shop Name" value="{{ $data->name ?? null }}" class="form-control">
                    </div>

                    <div class="form-group col-lg-6">
                        <label>Country: <span class="text-danger">*</span></label>
                        <select id="country_id" name="country_id" class="form-control">
                            <option value="">Select Country</option>
                            @foreach($country as $country_row)
                            <option value="{{ $country_row->id }}" @if(isset($data) && $data->country_id == $country_row->id) selected @endif> {{ $country_row->country_name }} </option>
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group col-lg-6">
                        <label>State: <span class="text-danger">*</span></label>
                        <select id="state_id" name="state_id" class="form-control">
                            <option value="">Select Country First</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-6">
                        <label>City: <span class="text-danger">*</span></label>
                        <select id="city_id" name="city_id" class="form-control">
                            <option value="">Select State First</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Village Or Area <span class="text-danger">*</span></label>
                        <input type="text" name="village" id="village" placeholder="Enter Village Or Area" value="{{ $data->village ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-12">
                        <label>Location <span class="text-danger">*</span></label>
                        <input type="text" name="location" id="location" onclick="OpenMapPopup();" placeholder="Enter Location" value="{{ $data->location ?? null }}" class="form-control">
                        <input type="hidden" name="latitude" id="latitude" value="{{ $data->latitude ?? null }}">
                        <input type="hidden" name="longitude" id="longitude" value="{{ $data->longitude ?? null }}">
                    </div>

                </div>
            </div> 

            <div id="service_center" style="display: none">
                <div class="form-group row">
                    <div class="form-group col-lg-6">
                        <label>Service Center Name <span class="text-danger">*</span></label>
                        <input type="text" name="name" id="name" placeholder="Enter Service Center Name" value="{{ $data->name ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Personal Name <span class="text-danger">*</span></label>
                        <input type="text" name="personal_name" id="personal_name" placeholder="Enter Personal Name" value="{{ $data->personal_name ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Email <span class="text-danger">*</span></label>
                        <input type="email" name="email" id="email" placeholder="Enter Email"
                               value="{{ $data->email ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Mobile Number <span class="text-danger">*</span></label>
                        <input type="tel" id="mobile_number" name="mobile_number" data-validation="required|number" value="{{ $data->code ?? null }}{{ $data->mobile_number ?? null }}" class="form-control only-mobile" placeholder="">
                        <input type="hidden" name="code" id="country_code" value="{{ $data->code ?? null }}">
                    </div>

                    <div class="form-group col-lg-6">
                        <label>Country: <span class="text-danger">*</span></label>
                        <select id="country_id" name="country_id" class="form-control">
                            <option value="">Select Country</option>
                            @foreach($country as $country_row)
                            <option value="{{ $country_row->id }}" @if(isset($data) && $data->country_id == $country_row->id) selected @endif> {{ $country_row->country_name }} </option>
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group col-lg-6">
                        <label>State: <span class="text-danger">*</span></label>
                        <select id="state_id" name="state_id" class="form-control">
                            <option value="">Select Country First</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-6">
                        <label>City: <span class="text-danger">*</span></label>
                        <select id="city_id" name="city_id" class="form-control">
                            <option value="">Select State First</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Village Or Area <span class="text-danger">*</span></label>
                        <input type="text" name="village" id="village" placeholder="Enter Village Or Area" value="{{ $data->village ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Facebook <span class="text-danger">*</span></label>
                        <input type="text" name="facebook_link" id="facebook_link" placeholder="Enter Facebook URL" value="{{ $data->facebook_link ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Instagram <span class="text-danger">*</span></label>
                        <input type="text" name="instagram_link" id="instagram_link" placeholder="Enter Instagram URL" value="{{ $data->instagram_link ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Website <span class="text-danger">*</span></label>
                        <input type="text" name="web_link" id="web_link" placeholder="Enter Website URL" value="{{ $data->web_link ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Youtube </label>
                        <input type="text" name="youtube_link" id="youtube_link" placeholder="Enter Youtube URL" value="{{ $data->youtube_link ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-6">
                        <label>About Us</label>
                        <textarea id="description" name="description" placeholder="Enter About Us" class="form-control" >{{ $data->description ?? null }}</textarea>
                    </div>
                    <div class="form-group col-lg-12">
                        <label>Location <span class="text-danger">*</span></label>
                        <input type="text" name="location" id="location" onclick="OpenMapPopup();" placeholder="Enter Location" value="{{ $data->location ?? null }}" class="form-control">
                        <input type="hidden" name="latitude" id="latitude" value="{{ $data->latitude ?? null }}">
                        <input type="hidden" name="longitude" id="longitude" value="{{ $data->longitude ?? null }}">
                    </div>

                </div>
            </div>

            <div id="sound_academy" style="display: none">
                <div class="form-group row">
                    <div class="form-group col-lg-6">
                        <label>Sound Academy Name <span class="text-danger">*</span></label>
                        <input type="text" name="name" id="name" placeholder="Enter Sound Academy Name" value="{{ $data->name ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Personal Name <span class="text-danger">*</span></label>
                        <input type="text" name="personal_name" id="personal_name" placeholder="Enter Personal Name" value="{{ $data->personal_name ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Email <span class="text-danger">*</span></label>
                        <input type="email" name="email" id="email" placeholder="Enter Email"
                               value="{{ $data->email ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Mobile Number <span class="text-danger">*</span></label>
                        <input type="tel" id="mobile_number" name="mobile_number" data-validation="required|number" value="{{ $data->code ?? null }}{{ $data->mobile_number ?? null }}" class="form-control only-mobile" placeholder="">
                        <input type="hidden" name="code" id="country_code" value="{{ $data->code ?? null }}">
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Visiting Card Image </label>
                        <div class="custom-file">
                            <input type="file" name="visiting_card_image" class="custom-file-input" id="userImage" accept="image/*">
                            <label class="custom-file-label text-truncate" for="userImage">Choose file</label>
                            <span class="form-text text-muted">The Image must not be greater than 2MB. and file type:
                                jpg, jpeg, png.</span>
                            @if ($data && $data->visiting_card_image)
                            <a href="{{ $data->visiting_card_image_url }}" target="_blank">View Image</a>
                            @endif
                        </div>
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Country: <span class="text-danger">*</span></label>
                        <select id="country_id" name="country_id" class="form-control">
                            <option value="">Select Country</option>
                            @foreach($country as $country_row)
                            <option value="{{ $country_row->id }}" @if(isset($data) && $data->country_id == $country_row->id) selected @endif> {{ $country_row->country_name }} </option>
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group col-lg-6">
                        <label>State: <span class="text-danger">*</span></label>
                        <select id="state_id" name="state_id" class="form-control">
                            <option value="">Select Country First</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-6">
                        <label>City: <span class="text-danger">*</span></label>
                        <select id="city_id" name="city_id" class="form-control">
                            <option value="">Select State First</option>
                        </select>
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Village Or Area <span class="text-danger">*</span></label>
                        <input type="text" name="village" id="village" placeholder="Enter Village Or Area" value="{{ $data->village ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Facebook <span class="text-danger">*</span></label>
                        <input type="text" name="facebook_link" id="facebook_link" placeholder="Enter Facebook URL" value="{{ $data->facebook_link ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Instagram <span class="text-danger">*</span></label>
                        <input type="text" name="instagram_link" id="instagram_link" placeholder="Enter Instagram URL" value="{{ $data->instagram_link ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Website <span class="text-danger">*</span></label>
                        <input type="text" name="web_link" id="web_link" placeholder="Enter Website URL" value="{{ $data->web_link ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Youtube </label>
                        <input type="text" name="youtube_link" id="youtube_link" placeholder="Enter Youtube URL" value="{{ $data->youtube_link ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-6">
                        <label>About Us</label>
                        <textarea id="description" name="description" placeholder="Enter About Us" class="form-control" >{{ $data->description ?? null }}</textarea>
                    </div>
                    <div class="form-group col-lg-12">
                        <label>Location <span class="text-danger">*</span></label>
                        <input type="text" name="location" id="location" onclick="OpenMapPopup();" placeholder="Enter Location" value="{{ $data->location ?? null }}" class="form-control">
                        <input type="hidden" name="latitude" id="latitude" value="{{ $data->latitude ?? null }}">
                        <input type="hidden" name="longitude" id="longitude" value="{{ $data->longitude ?? null }}">
                    </div>

                </div>
            </div>



            <div class="kt-portlet__foot">
                <div class="kt-form__actions">
                    <button type="submit" class="btn btn-brand">Save</button>
                    <button type="button" class="btn btn-secondary" onclick="window.history.back()">Cancel</button>

                </div>
            </div>
        </div>
    </form>
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
                <div id="map_location">
                    <div id="map_canvas_location" style="height: 380px; width: 750px;"></div>
                </div>
            </div>
        </div>
    </div>
</div>
<input type="hidden" id="state_id1" name="state_id1" value="{{ $data->state_id ?? null }}">
<input type="hidden" id="city_id1" name="city_id1" value="{{ $data->city_id ?? null }}">
@endsection
@push('script')
<script>
    $(document).ready(function () {
        const phoneFields = [
            {input: "#mobile_number1", code: "#country_code1", iso: "#country_iso1"},
            {input: "#mobile_number2", code: "#country_code2", iso: "#country_iso2"},
            {input: "#mobile_number3", code: "#country_code3", iso: "#country_iso3"}
        ];
        phoneFields.forEach(field => {
            const input = $(field.input);
            input.intlTelInput({
                initialCountry: "gb",
                separateDialCode: true,
                utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
            });
            // Get the instance correctly
            const iti = input.data("intlTelInput");
            function updateCountryData() {
                if (iti) {
                    const data = iti.getSelectedCountryData();
                    $(field.code).val("+" + data.dialCode);
                    $(field.iso).val(data.iso2.toUpperCase());
                }
            }

            // Trigger updates on various events
            input.on("countrychange blur keyup change", updateCountryData);
        });
        // Add validation method
        $.validator.addMethod("ValidPhoneNumber", function (value, element) {
            const iti = $(element).data("iti");
            return iti && iti.isValidNumber();
        }, "Invalid phone number");
    });</script>
<script>
    function add_more_fields() {
        var marketing_details_count = $("#marketing_details_count").val();
        var other_details_count = $("#other_details_count").val();
        if (marketing_details_count == 0) {
            $("#marketing_details").css("display", "block");
            $("#marketing_details_count").val("1");
        } else if (marketing_details_count == 1) {
            if (other_details_count == 0) {
                $("#other_details").css("display", "block");
                $("#other_details_count").val("1");
            }
        }
    }
    function remove_more_fields(type) {
        if (type == "marketing") {
            $("#marketing_details").css("display", "none");
            $("#marketing_details_count").val("0");
        } else if (type == "other") {
            $("#other_details").css("display", "none");
            $("#other_details_count").val("0");
        }
    }
</script>

<script>
    $('#role_id').change(function () {
        let selectedValues = $(this).val();
        $("#owner_details").css("display", "none");
        $("#marketing_details").css("display", "none");
        $("#other_details").css("display", "none");
        $("#common_gender_div").css("display", "none");
        $("#common_name_div").css("display", "none");
        $("#common_personal_name_div").css("display", "none");
        $("#common_what_manufacturer_div").css("display", "none");
        $("#common_email_div").css("display", "none");
        $("#common_mobile_number_div").css("display", "none");
        $("#common_visiting_card_image_div").css("display", "none");
        $("#common_facebook_link_div").css("display", "none");
        $("#common_instagram_link_div").css("display", "none");
        $("#common_web_link_div").css("display", "none");
        $("#common_youtube_link_div").css("display", "none");
        $("#common_description_div").css("display", "none");
        $("#common_details").css("display", "none");
        if (selectedValues.includes("1")) { // provider rental_company
            $("#common_name_div").css("display", "block");
            $("#common_personal_name_div").css("display", "block");
            $("#common_email_div").css("display", "block");
            $("#common_mobile_number_div").css("display", "block");
            $('#common_name_title').contents().first()[0].textContent = 'Sound Name';
            $('#name').attr('placeholder', 'Enter Sound Name');

            $('#name').rules('add', {required: true, messages: {required: "This field is required."}});
            $('#personal_name').rules('add', {required: true, messages: {required: "This field is required."}});
            $('#email').rules('add', {required: true, messages: {required: "This field is required."}});
            $('#mobile_number').rules('add', {required: true, messages: {required: "This field is required."}});
            $('#country_id').rules('add', {required: true, messages: {required: "This field is required."}});
            $('#state_id').rules('add', {required: true, messages: {required: "This field is required."}});
            $('#city_id').rules('add', {required: true, messages: {required: "This field is required."}});
            $('#village').rules('add', {required: true, messages: {required: "This field is required."}});
            $('#location').rules('add', {required: true, messages: {required: "This field is required."}});

            $("#common_details").css("display", "block");
        } else if (selectedValues.includes("2")) { // supplier dealer
            $("#common_name_div").css("display", "block");
            $("#common_personal_name_div").css("display", "none");
            $("#common_email_div").css("display", "none");
            $("#common_mobile_number_div").css("display", "none");
            $('#common_name_title').contents().first()[0].textContent = 'Shop Name';
            $('#name').attr('placeholder', 'Enter Shop Name');
            $("#owner_details").css("display", "block");
            $("#common_details").css("display", "block");
        } else if (selectedValues.includes("3")) { // manufacturing
            $("#common_name_div").css("display", "block");
            $("#common_what_manufacturer_div").css("display", "block");
            $("#common_personal_name_div").css("display", "none");
            $("#common_email_div").css("display", "none");
            $("#common_mobile_number_div").css("display", "none");
            $('#common_name_title').contents().first()[0].textContent = 'Company Name';
            $('#name').attr('placeholder', 'Enter Company Name');
            $("#owner_details").css("display", "block");
            $("#common_details").css("display", "block");
        } else if (selectedValues.includes("4")) { // dj operator
            $("#common_gender_div").css("display", "block");
            $("#common_name_div").css("display", "block");
            $('#common_name_title').contents().first()[0].textContent = 'Business / Nick Name';
            $('#name').attr('placeholder', 'Enter Business / Nick Name');
            $("#common_personal_name_div").css("display", "block");
            $("#common_email_div").css("display", "block");
            $("#common_mobile_number_div").css("display", "block");
            $("#common_details").css("display", "block");
        } else if (selectedValues.includes("5")) { // sound operator
            $("#common_gender_div").css("display", "block");
            $("#common_name_div").css("display", "block");
            $('#common_name_title').contents().first()[0].textContent = 'Business / Nick Name';
            $('#name').attr('placeholder', 'Enter Business / Nick Name');
            $("#common_personal_name_div").css("display", "block");
            $("#common_email_div").css("display", "block");
            $("#common_mobile_number_div").css("display", "block");
            $("#common_details").css("display", "block");
        } else if (selectedValues.includes("6")) { // spearpart
            $("#common_personal_name_div").css("display", "block");
            $("#common_name_div").css("display", "block");
            $('#common_name_title').contents().first()[0].textContent = 'Your Shop Name';
            $('#name').attr('placeholder', 'Enter Your Shop Name');
            $("#common_email_div").css("display", "block");
            $("#common_mobile_number_div").css("display", "block");
            $("#common_details").css("display", "block");
        } else if (selectedValues.includes("7")) { // company service center
            $("#common_name_div").css("display", "block");
            $("#common_personal_name_div").css("display", "none");
            $("#common_email_div").css("display", "none");
            $("#common_mobile_number_div").css("display", "none");
            $('#common_name_title').contents().first()[0].textContent = 'Shop Name';
            $('#name').attr('placeholder', 'Enter Shop Name');
            $("#owner_details").css("display", "block");
            $("#common_details").css("display", "block");
        } else if (selectedValues.includes("8")) { // private repairing shop
            $("#common_name_div").css("display", "block");
            $('#common_name_title').contents().first()[0].textContent = 'Service Center Name';
            $('#name').attr('placeholder', 'Enter Service Center Name');
            $("#common_personal_name_div").css("display", "block");
            $("#common_email_div").css("display", "block");
            $("#common_mobile_number_div").css("display", "block");
            $("#common_visiting_card_image_div").css("display", "block");
            $("#common_facebook_link_div").css("display", "block");
            $("#common_instagram_link_div").css("display", "block");
            $("#common_web_link_div").css("display", "block");
            $("#common_youtube_link_div").css("display", "block");
            $("#common_description_div").css("display", "block");
            $("#common_details").css("display", "block");
        } else if (selectedValues.includes("9")) { // sound education
            $("#common_name_div").css("display", "block");
            $('#common_name_title').contents().first()[0].textContent = 'Sound Academy Name';
            $('#name').attr('placeholder', 'Enter Sound Academy Name');
            $("#common_personal_name_div").css("display", "block");
            $("#common_email_div").css("display", "block");
            $("#common_mobile_number_div").css("display", "block");
            $("#common_visiting_card_image_div").css("display", "block");
            $("#common_facebook_link_div").css("display", "block");
            $("#common_instagram_link_div").css("display", "block");
            $("#common_web_link_div").css("display", "block");
            $("#common_youtube_link_div").css("display", "block");
            $("#common_description_div").css("display", "block");
            $("#common_details").css("display", "block");
        } else {
            
        }

    });</script>
<script type="text/javascript">
    $(document).ready(function () {
        // Initialize validation
        let conf = {
            rules: {
                role_id: {
                    required: true,
                }
            }
        };
        // Initialize the validator
        let validator = validationFormAndSubmit($('#user-add-from'), conf);
        // Listen for role_id change
        $('#role_id').on('change', function () {
            let selectedRole = $(this).val();
            if (selectedRole == "1") {
                // Make village required
                $('#village').rules('add', {
                    required: true,
                    messages: {
                        required: "This field is required."
                    }
                });
                $('#personal_name').rules('add', {
                    required: true,
                    messages: {
                        required: "This field is required."
                    }
                });
            } else if (selectedRole == "2") {
                $('#name1').rules('add', {
                    required: true,
                    messages: {
                        required: "This field is required."
                    }
                });
                $('#mobile_number1').rules('add', {
                    required: true,
                    messages: {
                        required: "This field is required."
                    }
                });
                $('#email1').rules('add', {
                    required: true,
                    messages: {
                        required: "This field is required."
                    }
                });
            } else if (selectedRole == "3") {
                $('#company_name').rules('add', {required: true, messages: {required: "This field is required."}});
                $('#name1').rules('add', {required: true, messages: {required: "This field is required."}});
                $('#mobile_number1').rules('add', {required: true, messages: {required: "This field is required."}});
                $('#email1').rules('add', {required: true, messages: {required: "This field is required."}});
                $('#country_id').rules('add', {required: true, messages: {required: "This field is required."}});
                $('#state_id').rules('add', {required: true, messages: {required: "This field is required."}});
                $('#city_id').rules('add', {required: true, messages: {required: "This field is required."}});
                $('#village').rules('add', {required: true, messages: {required: "This field is required."}});
                $('#location').rules('add', {required: true, messages: {required: "This field is required."}});
            } else if (selectedRole == "4") {
                // Make village required
                $('#personal_name').rules('add', {
                    required: true,
                    messages: {
                        required: "This field is required."
                    }
                });
                $('#gender').rules('add', {
                    required: true,
                    messages: {
                        required: "This field is required."
                    }
                });
            } else if (selectedRole == "5") {
                // Make village required
                $('#personal_name').rules('add', {
                    required: true,
                    messages: {
                        required: "This field is required."
                    }
                });
                $('#gender').rules('add', {
                    required: true,
                    messages: {
                        required: "This field is required."
                    }
                });
            } else if (selectedRole == "6") {
                $('#name').rules('remove', 'required');
                // Make village required
                $('#personal_name').rules('add', {
                    required: true,
                    messages: {
                        required: "This field is required."
                    }
                });
            } else if (selectedRole == "7") {

                $('#name1').rules('add', {
                    required: true,
                    messages: {
                        required: "This field is required."
                    }
                });
                $('#mobile_number1').rules('add', {
                    required: true,
                    messages: {
                        required: "This field is required."
                    }
                });
                $('#email1').rules('add', {
                    required: true,
                    messages: {
                        required: "This field is required."
                    }
                });
            } else if (selectedRole == "8") {

            } else if (selectedRole == "9") {

            } else {
                // Remove required rule
                $('#personal_name').rules('remove', 'required');
            }
        });
    });</script>
<!--<script type="text/javascript">
    let conf = {
    rules: {
    image: {
    required: {{ $data ? 'false' : true }},
    },
            role_id: {
            required: true,
            },
            name: {
            required: true,
            },
            email: {
            required: true,
            },
            mobile_number: {
            required: true,
            },
            country_id: {
            required: true,
            },
            state_id: {
            required: true,
            },
            city_id: {
            required: true,
            },
            village: {
            required: true,
            }
    },
    };
    validationFormAndSubmit($('#user-add-from'), conf);</script>-->
<script>
    $(document).ready(function () {
        $('.select2').select2();
        var state_id1 = $("#state_id1").val();
        var city_id1 = $("#city_id1").val();
        $('#country_id').on('change', function () {
            var country_id = $(this).val();
            var url = "{{ route('admin.register.getstate', ':country_id') }}";
            url = url.replace(':country_id', country_id);
            if (country_id === '') {
                $('#state_id').empty().append('<option value="">Select State</option>');
                return;
            }
            $.ajax({
                url: url,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    $('#state_id').empty().append(
                            '<option value="">Select State</option>');
                    $.each(data, function (key, value) {
                        if (state_id1 == value.id) {
                            $('#state_id').append('<option selected value="' + value.id +
                                    '">' + value.state_name + '</option>');
                        } else {
                            $('#state_id').append('<option value="' + value.id +
                                    '">' + value.state_name + '</option>');
                        }

                    });
                    $('#state_id').trigger('change');
                }
            });
        });
        $('#state_id').on('change', function () {
            var state_id = $(this).val();
            var url = "{{ route('admin.register.getcity', ':state_id') }}";
            url = url.replace(':state_id', state_id);
            if (state_id === '') {
                $('#city_id').empty().append('<option value="">Select city</option>');
                return;
            }
            $.ajax({
                url: url,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    $('#city_id').empty().append(
                            '<option value="">Select City</option>');
                    $.each(data, function (key, value) {
                        if (city_id1 == value.id) {
                            $('#city_id').append('<option selected value="' + value.id +
                                    '">' + value.city_name + '</option>');
                        } else {
                            $('#city_id').append('<option value="' + value.id +
                                    '">' + value.city_name + '</option>');
                        }

                    });
                }
            });
        });
        $('#country_id').trigger('change');
        $('#role_id').trigger('change');
    });</script>
<script>
    function OpenMapPopup() {
        $("#OpenMapPopup").modal('show');
        load_map();
    }
    function CloseLocationPopup() {
        $("#OpenMapPopup").modal('hide');
    }
    function load_map() {
        var lat = '45.254524',
                lng = '72.254578',
                latlng = new google.maps.LatLng(lat, lng),
                image = 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi.png';
        var mapOptions = {
            center: new google.maps.LatLng(lat, lng),
            zoom: 7,
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
            console.log(place);
            infowindow.close();
            var place = autocomplete.getPlace();
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);
            }
            moveMarker(place.name, place.geometry.location);
            $(document).find("#location").val(place.name);
            $(document).find('[name="location"]').val(place.name);
            var searchTextField = $("#searchTextField").val();
            $("#location").val(searchTextField);
            $('#latitude').val(place.geometry.location.lat());
            if ($('.lat').length > 0) {
                $('.lat').val(place.geometry.location.lat());
            }
            $('#longitude').val(place.geometry.location.lng());
            if ($('.lng').length > 0) {
                $('.lng').val(place.geometry.location.lng());
            }
        });
        google.maps.event.addListener(map, 'click', function (event) {
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
//                                                $(document).find("#address_" + click_location_id).val(results[0].formatted_address);
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
@endpush
