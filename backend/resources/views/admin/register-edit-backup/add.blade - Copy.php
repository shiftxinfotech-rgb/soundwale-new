@extends('admin.layouts.default')
@section('title', 'Users & Directory')
@section('content')
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

                    <div class="form-group col-lg-6">
                        <label>Role:</label>
                        <select id="role_id" name="role_id[]" multiple="multiple" class="form-control select2">
                            @foreach($role as $role_row)
                            <option value="{{ $role_row->id }}"
                                    @if(isset($data) && isset($data->role_id) && in_array($role_row->id, array_map('intval', explode(',', $data->role_id)))) selected @endif>
                                    {{ $role_row->name }}
                        </option>
                        @endforeach
                    </select>
                </div>    
                <div class="form-group col-lg-6">
                    <label>Name <span class="text-danger">*</span></label>
                    <input type="text" name="name" id="name" placeholder="Enter Name" value="{{ $data->name ?? null }}" class="form-control">
                </div>
                <div class="form-group col-lg-6" id="service_center_div" style="display: none">
                    <label>Company Name:</label>
                    <select id="company_name" name="company_name[]" multiple="multiple" class="form-control select2">
                        @foreach($company as $company_row)
                        <option value="{{ $company_row->id }}"
                                @if(isset($data) && isset($data->company_name) && in_array($company_row->id, json_decode($data->company_name))) selected @endif>
                                {{ $company_row->name }}
                    </option>
                    @endforeach
                </select>
            </div>    
            <div class="form-group col-lg-6">
                <label>Email <span class="text-danger">*</span></label>
                <input type="email" name="email" id="email" placeholder="Enter Email"
                       value="{{ $data->email ?? null }}" class="form-control">
            </div>
            <div class="form-group col-lg-6">
                <label>Mobile Number <span class="text-danger">*</span></label>
                <a href="javascript:void(0);" style="float: right;" onclick="addPhoneField();">Add More+</a>
                <input type="tel" id="mobile_number" name="mobile_number" data-validation="required|number" value="{{ $data->code ?? null }}{{ $data->mobile_number ?? null }}" class="form-control only-mobile" placeholder="">
                <input type="hidden" name="code" id="country_code" value="{{ $data->code ?? null }}">
            </div>
            <div class="row col-md-12">          
                <div id="phone-wrapper" class="form-group col-md-12">  
                    @php
                    $mobile_number_array = array();
                    if(isset($data->extra_mobile_number)){
                    $mobile_number_array = json_decode($data->extra_mobile_number, true);
                    }
                    @endphp
                    @foreach($mobile_number_array as $mobile_num_key=> $mobile_num)
                    <div class="phone-group row">
                        <div class="form-group col-lg-5">
                            <label>Name</label>
                            <input type="text" name="extra_mobile_number[{{$mobile_num_key}}][name]" placeholder="Enter Name" value="{{ $mobile_num['name'] ?? null }}" class="form-control">
                        </div>
                        <div class="form-group col-lg-5">
                            <label>Mobile Number </label>
                            <input type="tel" class="phone-input form-control only-mobile" data-validation="required|number" value="{{ $mobile_num['code'] ?? null }}{{ $mobile_num['mobile_number'] ?? null }}">
                            <input type="hidden" name="extra_mobile_number[{{$mobile_num_key}}][mobile_number]" value="{{ $mobile_num['mobile_number'] ?? null }}">
                            <input type="hidden" name="extra_mobile_number[{{$mobile_num_key}}][code]" value="{{ $mobile_num['code'] ?? null }}">
                            <input type="hidden" name="extra_mobile_number[{{$mobile_num_key}}][code_sort]" value="{{ $mobile_num['code_sort'] ?? null }}">
                        </div>
                        <span class="remove-btn" onclick="removeField(this)">x</span>
                    </div>
                    @endforeach
                </div> 
            </div>
            <div class="form-group col-lg-6">
                <label>Country: <span class="text-danger">*</span></label>
                <select id="country_id" name="country_id" class="form-control">
                    <option value="">Select Country</option>
                    @foreach($country as $country_row)
                    <option value="{{ $country_row->id }}"
                            @if(isset($data) && $data->country_id == $country_row->id) selected @endif>
                            {{ $country_row->country_name }}
                </option>
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
            <label>Taluka <span class="text-danger">*</span></label>
            <input type="text" name="taluka" id="taluka" placeholder="Enter Taluka" value="{{ $data->taluka ?? null }}" class="form-control">
        </div>
        <div class="form-group col-lg-6">
            <label>District <span class="text-danger">*</span></label>
            <input type="text" name="district" id="district" placeholder="Enter District" value="{{ $data->district ?? null }}" class="form-control">
        </div>    
        <div class="form-group col-lg-6">
            <label>City: <span class="text-danger">*</span></label>
            <select id="city_id" name="city_id" class="form-control">
                <option value="">Select State First</option>
            </select>
        </div>
        <div class="form-group col-lg-6">
            <label>Village <span class="text-danger">*</span></label>
            <input type="text" name="village" id="village" placeholder="Enter Village" value="{{ $data->village ?? null }}" class="form-control">
        </div>
        <div class="form-group col-lg-6">
            <label>Location <span class="text-danger">*</span></label>
            <input type="text" name="location" id="location" placeholder="Enter Location" value="{{ $data->location ?? null }}" class="form-control">
            <input type="hidden" name="latitude" id="latitude" value="{{ $data->latitude ?? null }}">
            <input type="hidden" name="longitude" id="longitude" value="{{ $data->longitude ?? null }}">
        </div>
        <div class="form-group col-lg-6">
            <label>Facebook Link <span class="text-danger">*</span></label>
            <input type="text" name="facebook_link" id="facebook_link" placeholder="Enter Facebook Link" value="{{ $data->facebook_link ?? null }}" class="form-control">
        </div>
        <div class="form-group col-lg-6">
            <label>Instagram Link <span class="text-danger">*</span></label>
            <input type="text" name="instagram_link" id="instagram_link" placeholder="Enter Instagram Link" value="{{ $data->instagram_link ?? null }}" class="form-control">
        </div>
        <div class="form-group col-lg-6">
            <label>Web Link <span class="text-danger">*</span></label>
            <input type="text" name="web_link" id="web_link" placeholder="Enter Web Link" value="{{ $data->web_link ?? null }}" class="form-control">
        </div>
        <div class="form-group col-lg-6" id="youtube_link_div" style="display: none">
            <label>Youtube Link </label>
            <input type="text" name="youtube_link" id="youtube_link" placeholder="Enter Youtube Link" value="{{ $data->youtube_link ?? null }}" class="form-control">
        </div>
        <div class="form-group col-lg-6">
            <label>Profile Image  (Upload By: 45 X 45 ) {!! $data && $data->image ? '' : '<span class="text-danger">*</span>' !!} </label>
            <div class="custom-file">
                <input type="file" name="image" class="custom-file-input" id="userImage"
                       accept="image/*">
                <label class="custom-file-label text-truncate" for="userImage">Choose file</label>
                <span class="form-text text-muted">The Image must not be greater than 2MB. and file type:
                    jpg, jpeg, png.</span>
                @if ($data && $data->image)
                <a href="{{ $data->image_url }}" target="_blank">View Image</a>
                @endif
            </div>
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
        <div class="form-group col-lg-6" id="sound_farm_name_div" style="display: none">
            <label>Sound Farm Name</label>
            <input type="text" name="sound_farm_name" id="sound_farm_name" placeholder="Enter Sound Farm Name" value="{{ $data->sound_farm_name ?? null }}" class="form-control">
        </div>

        <div class="form-group col-lg-6" id="description_div" style="display: none">
            <label>Description</label>
            <textarea id="description" name="description" placeholder="Enter Description" class="form-control" >{{ $data->description ?? null }}</textarea>
        </div>
        <div class="form-group col-lg-6" id="authorised_dealer_company_name_div" style="display: none">
            <label>Authorised Dealer Company Name</label>
            <input type="text" name="authorised_dealer_company_name" id="authorised_dealer_company_name" placeholder="Enter Authorised Dealer Company Name" value="{{ $data->authorised_dealer_company_name ?? null }}" class="form-control">
        </div>
        <div class="form-group col-lg-6" id="company_about_div" style="display: none">
            <label>Company About</label>
            <textarea id="company_about" name="company_about" placeholder="Enter Company About" class="form-control" >{{ $data->company_about ?? null }}</textarea>
        </div>
    </div>
    <div id="catalogue_pdf_div" style="display: none;">
        <div class="form-group row">
            <div class="form-group col-lg-6">
                <label>Catalogue</label><br>
                <label>
                    <input type="radio" name="catalogue_type" value="pdf" {{ isset($data) && $data->catalogue_type == 'pdf' ? 'checked' : '' }}> PDF
                </label>
                <label>
                    <input type="radio" name="catalogue_type" value="website" {{ isset($data) && $data->catalogue_type == 'website' ? 'checked' : '' }}> Website Link
                </label>
            </div>   
            <div class="form-group col-lg-6" id="catalogue_pdf_div1" style="display: {{ isset($data) && $data->catalogue_type == 'pdf' ? 'block' : 'none' }}">
                <label>Upload PDF</label>
                <div class="custom-file">
                    <input type="file" name="catalogue_pdf" class="custom-file-input" id="userImage2" accept="application/pdf">
                    <label class="custom-file-label text-truncate" for="userImage2">Choose file</label>
                    <!--<span class="form-text text-muted">The Image must not be greater than 2MB. and file type:jpg, jpeg, png.</span>-->
                    @if ($data && $data->catalogue_pdf)
                    <a href="{{ $data->catalogue_pdf_url }}" target="_blank">View Image</a>
                    @endif
                </div>
            </div>
            <div class="form-group col-lg-6" id="catalogue_website_div" style="display: {{ isset($data) && $data->catalogue_type == 'website' ? 'block' : 'none' }}">
                <label>Website Link </label>
                <input type="text" name="catalogue_website" id="catalogue_website" placeholder="Enter Website Link" value="{{ $data->catalogue_website ?? null }}" class="form-control">
            </div>
        </div>
        <div class="form-group row">
            <div class="form-group col-lg-6">
                <label>Dealer List Area Wise</label><br>
                <label>
                    <input type="radio" name="dealer_list_area_wise_type" value="pdf" {{ isset($data) && $data->dealer_list_area_wise_type == 'pdf' ? 'checked' : '' }}> PDF
                </label>
                <label>
                    <input type="radio" name="dealer_list_area_wise_type" value="website" {{ isset($data) && $data->dealer_list_area_wise_type == 'website' ? 'checked' : '' }}> Website Link
                </label>
            </div>   
            <div class="form-group col-lg-6" id="dealer_list_area_wise_pdf_div" style="display: {{ isset($data) && $data->dealer_list_area_wise_type == 'pdf' ? 'block' : 'none' }};">
                <label>Upload PDF</label>
                <div class="custom-file">
                    <input type="file" name="dealer_list_area_wise_pdf" class="custom-file-input" id="userImage3" accept="application/pdf">
                    <label class="custom-file-label text-truncate" for="userImage3">Choose file</label>
                    <!--<span class="form-text text-muted">The Image must not be greater than 2MB. and file type:jpg, jpeg, png.</span>-->
                    @if ($data && $data->dealer_list_area_wise_pdf)
                    <a href="{{ $data->dealer_list_area_wise_pdf_url }}" target="_blank">View Image</a>
                    @endif
                </div>
            </div>
            <div class="form-group col-lg-6" id="dealer_list_area_wise_website_div" style="display: {{ isset($data) && $data->dealer_list_area_wise_type == 'website' ? 'block' : 'none' }};">
                <label>Website Link </label>
                <input type="text" name="dealer_list_area_wise_website" id="dealer_list_area_wise_website" placeholder="Enter Website Link" value="{{ $data->dealer_list_area_wise_website ?? null }}" class="form-control">
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
<input type="hidden" id="state_id1" name="state_id1" value="{{ $data->state_id ?? null }}">
<input type="hidden" id="city_id1" name="city_id1" value="{{ $data->city_id ?? null }}">
<input type="hidden" id="mobile_counter" name="mobile_counter" value="{{ count($mobile_number_array) ?? 0 }}">
@endsection
@push('script')
<script>
    let phoneIndex = $("#mobile_counter").val();
    const phoneInputs = [];
    function initIntlTelInput(input, index) {
    const iti = window.intlTelInput(input, {
    initialCountry: "auto",
            geoIpLookup: function(success, failure) {
            fetch("https://ipinfo.io?token=YOUR_TOKEN")  // Optional for auto country
                    .then(resp => resp.json())
                    .then(resp => success(resp.country))
                    .catch(() => success("us"));
            },
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
    });
    input.addEventListener('blur', function () {
    const localNumber1 = iti.getNumber(intlTelInputUtils.numberFormat.NATIONAL);
    let localNumber = localNumber1.replace(/\s+/g, '').replace(/^0+/, '');
    const full = iti.getNumber();
    const dialCode = iti.getSelectedCountryData().dialCode;
    const iso = iti.getSelectedCountryData().iso2;
//    document.querySelector(`[name="extra_mobile_number[${index}][mobile_number]"]`).value = full;
    document.querySelector(`[name="extra_mobile_number[${index}][mobile_number]"]`).value = localNumber;
    document.querySelector(`[name="extra_mobile_number[${index}][code]"]`).value = `+${dialCode}`;
    document.querySelector(`[name="extra_mobile_number[${index}][code_sort]"]`).value = iso.toUpperCase();
    });
    phoneInputs.push(iti);
    }

    document.querySelectorAll('.phone-input').forEach((input, index) => {
    initIntlTelInput(input, index);
    });
    function addPhoneField() {
    const wrapper = document.getElementById('phone-wrapper');
    const group = document.createElement('div');
    group.className = 'phone-group row';
    group.innerHTML = `<div class="form-group col-lg-5">
                    <label>Name</label>
                    <input type="text" name="extra_mobile_number[${phoneIndex}][name]" placeholder="Enter Name" value="" class="form-control">
                </div>
                <div class="form-group col-lg-5">
                    <label>Mobile Number </label>
                    <input type="tel" class="phone-input form-control only-mobile" data-validation="required|number">
                    <input type="hidden" name="extra_mobile_number[${phoneIndex}][mobile_number]">
                <input type="hidden" name="extra_mobile_number[${phoneIndex}][code]">
                <input type="hidden" name="extra_mobile_number[${phoneIndex}][code_sort]">
                </div>
                <span class="remove-btn" onclick="removeField(this)">x</span>
            `;
    wrapper.appendChild(group);
    const input = group.querySelector('.phone-input');
    initIntlTelInput(input, phoneIndex);
    phoneIndex++;
    }

    function removeField(el) {
    el.parentElement.remove();
    }
</script>
<script>
    $('#role_id').change(function() {
    let selectedValues = $(this).val();
    $("#sound_farm_name_div").css("display", "none");
    $("#description_div").css("display", "none");
    $("#authorised_dealer_company_name_div").css("display", "none");
    $("#company_about_div").css("display", "none");
    $("#catalogue_pdf_div").css("display", "none");
    $("#service_center_div").css("display", "none");
    $("#secondary_name_div").css("display", "none");
    $("#secondary_mobile_number_div").css("display", "none");
    $("#export_name_div").css("display", "none");
    $("#export_mobile_number_div").css("display", "none");
    $("#domestic_name_div").css("display", "none");
    $("#domestic_mobile_number_div").css("display", "none");
    $("#youtube_link_div").css("display", "none");
    if (selectedValues.includes("1")){ // provider
    $("#sound_farm_name_div").css("display", "block");
    $("#description_div").css("display", "block");
    }
    if (selectedValues.includes("2")){ // supplier dealer
    $("#sound_farm_name_div").css("display", "block");
    $("#description_div").css("display", "block");
    $("#authorised_dealer_company_name_div").css("display", "block");
    $("#secondary_name_div").css("display", "block");
    $("#secondary_mobile_number_div").css("display", "block");
    }
    if (selectedValues.includes("3")){ // manufacturing
    $("#description_div").css("display", "block");
    $("#authorised_dealer_company_name_div").css("display", "block");
    $("#company_about_div").css("display", "block");
    $("#catalogue_pdf_div").css("display", "block");
    $("#export_name_div").css("display", "block");
    $("#export_mobile_number_div").css("display", "block");
    $("#domestic_name_div").css("display", "block");
    $("#domestic_mobile_number_div").css("display", "block");
    }
    if (selectedValues.includes("4")){ // dj operator
    $("#youtube_link_div").css("display", "block");
    }
    if (selectedValues.includes("5")){ // sound operator
    $("#youtube_link_div").css("display", "block");
    }
    if (selectedValues.includes("6")){ // spearpart
    $("#sound_farm_name_div").css("display", "block");
    $("#description_div").css("display", "block");
    $("#company_about_div").css("display", "block");
    $("#catalogue_pdf_div").css("display", "block");
    }
    if (selectedValues.includes("7")){ // company service center
    $("#description_div").css("display", "block");
    $("#service_center_div").css("display", "block");
    }
    if (selectedValues.includes("8")){ // private repairing shop
    $("#description_div").css("display", "block");
    }
    if (selectedValues.includes("9")){ // sound education
    $("#youtube_link_div").css("display", "block");
    $("#description_div").css("display", "block");
    }

    });</script>
<script>
    let count3 = 0;
    $(document).on('click', '.add-catalogue-btn', function() {
    let html = `<div class="wrapper remove-catalogue">
                            <div class="box a">
                                <input type="text" name="catalogue_name[${count3}]" placeholder="Enter Catalogue Name" value="" class="form-control">
                            </div>
                            <div class="box b">
                                <input type="file" name="catalogue_pdf[${count3}]" class="form-control" accept="application/pdf" data-validation-allowing="pdf" >
                            </div>
                            <div class="box c">
                                <button type="button" class="btn btn-danger remove-catalogue-more-btn"> X </button>
                            </div>
                        </div>`;
    $('.add-catalogue-content').append(html);
    count3++;
    });
    $(document).on('click', '.remove-catalogue-more-btn', function() {
    let id3 = $(this).data('id');
    if (id3) {
    $.ajax({
    url: "{{ route('admin.directory.delete.catalogue.pdf') }}",
            type: "post",
            data: {
            "_token": "{{ csrf_token() }}",
                    imageID: id3
            },
            success: function(response) {
            $status = 'error';
            Toast.fire({
            icon: $status,
                    title: response.message
            })
                    location.reload();
            $(this).closest('.remove-catalogue').remove();
            }
    });
    } else {
    $(this).closest('.remove-catalogue').remove();
    }
    });</script>
<script type="text/javascript">
    let conf = {
    rules: {
    image: {
    required: {{ $data ? 'false' : true }},
    },
            password: {
            required: {{ $data ? 'false' : true }},
            },
            confirm_password: {
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
            },
            location: {
            required: true,
            },
            facebook_link: {
            required: true,
            },
            instagram_link: {
            required: true,
            },
            web_link: {
            required: true,
            },
            taluka: {
            required: true,
            },
            district: {
            required: true,
            },
    },
    };
    validationFormAndSubmit($('#user-add-from'), conf);</script>
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
    });
    $(document).on('change', 'input[name="dealer_list_area_wise_type"]', function () {
    var selectedValue1 = this.value;
    if (selectedValue1 == "pdf"){
    $("#dealer_list_area_wise_pdf_div").css("display", "block");
    $("#dealer_list_area_wise_website_div").css("display", "none");
    } else if (selectedValue1 == "website"){
    $("#dealer_list_area_wise_pdf_div").css("display", "none");
    $("#dealer_list_area_wise_website_div").css("display", "block");
    } else{
    $("#dealer_list_area_wise_pdf_div").css("display", "none");
    $("#dealer_list_area_wise_website_div").css("display", "none");
    }
    });
    $(document).on('change', 'input[name="catalogue_type"]', function () {
    var selectedValue = this.value;
    if (selectedValue == "pdf"){
    $("#catalogue_pdf_div1").css("display", "block");
    $("#catalogue_website_div").css("display", "none");
    } else if (selectedValue == "website"){
    $("#catalogue_pdf_div1").css("display", "none");
    $("#catalogue_website_div").css("display", "block");
    } else{
    $("#catalogue_pdf_div1").css("display", "none");
    $("#catalogue_website_div").css("display", "none");
    }
    });</script>
<script>
    $.validator.addMethod("validEmail", function(value, element) {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    }, "Please enter a valid company email");
    $.validator.addMethod("notDisposableEmail", function(value, element) {
    var disposableEmails = ['example.com', 'example.org', 'example.net'];
    var domain = value.split('@')[1];
    return disposableEmails.indexOf(domain) === - 1;
    }, "Disposable company email addresses are not allowed");
    $.validator.addMethod("ValidPhoneNumber", function(value, element) {
    var input = $("#mobile_number");
    return input.intlTelInput("isValidNumber"); // Check if the number is valid based on the country
    }, "Phone Number does not match the selected country code");
    var input = $("#mobile_number");
    if (input.length > 0) {
    input.intlTelInput({
    initialCountry: "gb",
            separateDialCode: true,
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
    });
    input.on("countrychange keyup", function() {
    var selectedCountryData = input.intlTelInput("getSelectedCountryData");
    var countryCode = selectedCountryData.dialCode;
    $("#country_code").val("+" + countryCode);
    });
    }
</script>
@endpush
