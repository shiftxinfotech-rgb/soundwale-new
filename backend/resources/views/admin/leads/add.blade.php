@extends('admin.layouts.default')
@section('title', 'Leads')
@section('content')

<div class="kt-subheader   kt-grid__item" id="kt_subheader">
    <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">Leads</h3>
        <span class="kt-subheader__separator kt-hidden"></span>
        <div class="kt-subheader__breadcrumbs">
            <span class="kt-subheader__breadcrumbs-separator"></span>
            <a href="{{ route('admin.leads.list') }}" class="kt-subheader__breadcrumbs-link" title="Back">List</a>
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
                    {{ $data ? 'Edit' : 'Add New' }} Leads
                </h3>
            </div>
        </div>
        <!--begin::Portlet-->
        <!--begin::Form-->
        <form class="kt-form" action="{{ route('admin.leads.store') }}" id="amenities-add-from" method="post"
              isReload="{{ route('admin.leads.list') }}" enctype="multipart/form-data">

            <div class="kt-portlet__body">
                @csrf
                <input type="hidden" name="edit_id" value="{{ $data->id ?? null }}">
                <input type="hidden" name="city_id" value="{{ $data->city_id ?? 1 }}">
                <div class="form-group row">
                    <div class="form-group col-lg-6">
                        <label>User: <span class="text-danger">*</span></label>
                        <select id="user_id" name="user_id" class="form-control">
                            <option value="">Select User</option>
                            @foreach($users as $users_row)
                            <option value="{{ $users_row->id }}"
                                    @if(isset($data) && $data->user_id == $users_row->id) selected @endif>
                                    {{ $users_row->name }}
                        </option>
                        @endforeach
                    </select>
                </div>
                <div class="form-group col-lg-6">
                    <label>Cities: <span class="text-danger">*</span></label>
                    <select id="city_id" name="city_id" class="form-control">
                        <option value="">Select Cities</option>
                        @foreach($cities as $cities_row)
                        <option value="{{ $cities_row->id }}"
                                @if(isset($data) && $data->city_id == $cities_row->id) selected @endif>
                                {{ $cities_row->city_name }}
                    </option>
                    @endforeach
                </select>
            </div>    
                <div class="form-group col-lg-6">
                    <label>Main Categories: <span class="text-danger">*</span></label>
                    <select id="categories_id" name="categories_id" class="form-control">
                        <option value="">Select Main Categories</option>
                        @foreach($categories as $category)
                        <option value="{{ $category->id }}"
                                @if(isset($data) && $data->categories_id == $category->id) selected @endif>
                                {{ $category->name }}
                    </option>
                    @endforeach
                </select>
            </div>
            <div class="form-group col-lg-6">
                <label>Category: <span class="text-danger">*</span></label>
                <select id="category_id" name="category_id" class="form-control">
                    <option value="">Select Category</option>
                </select>
            </div>
            <div class="form-group col-lg-6">
                <label>Sub Category: </label>
                <select id="sub_category_id" name="sub_category_id" class="form-control">
                    <option value="">Select Sub Category</option>
                </select>
            </div>
            <div class="form-group col-lg-6">
                <label>Unit: <span class="text-danger">*</span></label>
                <select id="unit_id" name="unit_id" class="form-control">
                    <option value="">Select Unit</option>
                    @foreach($units as $units_row)
                    <option value="{{ $units_row->id }}"
                            @if(isset($data) && $data->unit_id == $units_row->id) selected @endif>
                            {{ $units_row->name }}
                    </option>
                    @endforeach
                </select>
            </div>
            <div class="form-group col-lg-6">
                <label>Grade: <span class="text-danger">*</span></label>
                <select id="grade_id" name="grade_id" class="form-control">
                    <option value="">Select Grade</option>
                    @foreach($grade as $grade_row)
                    <option value="{{ $grade_row->id }}"
                            @if(isset($data) && $data->grade_id == $grade_row->id) selected @endif>
                            {{ $grade_row->name }}
                    </option>
                    @endforeach
                </select>
            </div> 
            <div class="form-group col-lg-6">
                <label>Requirment Type: <span class="text-danger">*</span></label>
                <select id="requirment_id" name="requirment_id" class="form-control">
                    <option value="">Select Requirment Type</option>
                    @foreach($requirment as $requirment_row)
                    <option value="{{ $requirment_row->id }}"
                            @if(isset($data) && $data->requirment_id == $requirment_row->id) selected @endif>
                            {{ $requirment_row->name }}
                    </option>
                    @endforeach
                </select>
            </div> 
            <div class="form-group col-lg-6">
                <label>Surface Type: <span class="text-danger">*</span></label>
                <select id="surface_id" name="surface_id" class="form-control">
                    <option value="">Select Surface Type</option>
                    @foreach($surface as $surface_row)
                    <option value="{{ $surface_row->id }}"
                            @if(isset($data) && $data->surface_id == $surface_row->id) selected @endif>
                            {{ $surface_row->name }}
                    </option>
                    @endforeach
                </select>
            </div>  
            <div class="form-group col-lg-6">
                <label>Quantity <span class="text-danger">*</span></label>
                <input type="text" name="quantity" placeholder="Enter Quantity" value="{{ $data->quantity ?? null }}" class="form-control only-digits">
            </div>  
            <div class="form-group col-lg-6">
                            <label>Image {!! $data && $data->image ? '' : '<span class="text-danger">*</span>' !!} </label>
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
                    <div class="form-group col-lg-12">
                        <label>Description <span class="text-danger">*</span></label>
                        <textarea id="description" name="description" placeholder="Enter Description" class="form-control" >{{ $data->description ?? null }}</textarea>
                    </div>
        <input type="hidden" name="status" value="1">

    </div>
    <div class="kt-portlet__foot">
        <div class="kt-form__actions">
            <button type="submit" class="btn btn-brand">Save</button>
            <button type="button" class="btn btn-secondary" onclick="window.history.back()">Cancel</button>
        </div>
    </div>
</div>
</form>
<input type="hidden" id="sub_id" name="sub_id" value="{{ $data->category_id ?? null }}">
<input type="hidden" id="sub_sub_id" name="sub_sub_id" value="{{ $data->sub_category_id ?? null }}">
<!--end::Form-->
</div>
</div>
@endsection
@push('script')
<script type="text/javascript">
    let conf = {
        rules: {
            user_id: {
                required: true,
            },
            categories_id: {
                required: true,
            },
            category_id: {
                required: true,
            },
            unit_id: {
                required: true,
            },
            grade_id: {
                required: true,
            },
            requirment_id: {
                required: true,
            },
            surface_id: {
                required: true,
            },
            quantity: {
                required: true,
            },
            image: {
                    required: {{ $data && $data->image ? 'false' : true }},
            },
            description: {
                required: true,
            },
        },
        messages: {
        },
    };
    validationFormAndSubmit($('#amenities-add-from'), conf);
    document.getElementById('userImage').addEventListener('change', function () {
        let fileName = this.files[0] ? this.files[0].name : 'Choose file';
        let nextSibling = this.nextElementSibling;
        if (nextSibling && nextSibling.classList.contains('custom-file-label')) {
            nextSibling.textContent = fileName;
        }
        $(this).valid();
    });
</script>
<script>
    $(document).ready(function () {
        var sub_id = $("#sub_id").val();
        var sub_sub_id = $("#sub_sub_id").val();
        $('#categories_id').on('change', function () {
            var categories_id = $(this).val();

            var url = "{{ route('admin.leads.get', ':categories_id') }}";
            url = url.replace(':categories_id', categories_id);

            if (categories_id === '') {
                $('#category_id').empty().append('<option value="">Select Category</option>');
                return;
            }

            $.ajax({
                url: url,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    $('#category_id').empty().append(
                            '<option value="">Select Category</option>');
                    $.each(data, function (key, value) {
                        if (sub_id == value.id) {
                            $('#category_id').append('<option selected value="' + value.id +
                                    '">' + value.name + '</option>');
                        } else {
                            $('#category_id').append('<option value="' + value.id +
                                    '">' + value.name + '</option>');
                        }

                    });
                    $('#category_id').trigger('change');
                }
            });
        });

        $('#category_id').on('change', function () {
            var category_id = $(this).val();
            var url = "{{ route('admin.leads.getsubcategory', ':category_id') }}";
            url = url.replace(':category_id', category_id);

            if (category_id === '') {
                $('#sub_category_id').empty().append('<option value="">Select Sub Category</option>');
                return;
            }

            $.ajax({
                url: url,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    $('#sub_category_id').empty().append(
                            '<option value="">Select Sub Category</option>');
                    $.each(data, function (key, value) {
                        if (sub_sub_id == value.id) {
                            $('#sub_category_id').append('<option selected value="' + value.id +
                                    '">' + value.name + '</option>');
                        } else {
                            $('#sub_category_id').append('<option value="' + value.id +
                                    '">' + value.name + '</option>');
                        }

                    });
                }
            });
        });
    });
</script>
<script>
    $(document).ready(function () {
        $('#categories_id').trigger('change');
        var input = document.querySelector("#country");
        var countryCodeInput = document.querySelector("#countryCode");
        var iti = window.intlTelInput(input, {
            separateDialCode: false,
            initialCountry: "{{ $data->country_code ?? 'ae' }}",
            geoIpLookup: function (callback) {
                $.get('https://ipinfo.io', function () {}, "jsonp").always(function (resp) {
                    var countryCode = (resp && resp.country) ? resp.country : "ae";
                    callback(countryCode);
                });
            },
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
        });
        // Update #country and #countryCode on initialization
        var initialCountryData = iti.getSelectedCountryData();
        var initialCountryName = initialCountryData.name;
        var initialCountryCode = initialCountryData.iso2;
        $("#country").val(initialCountryName);
        $("#countryCode").val(initialCountryCode);
        // Update #country and #countryCode when the country is changed
        input.addEventListener("countrychange", function () {
            var countryData = iti.getSelectedCountryData();
            var countryName = countryData.name;
            var countryCode = countryData.iso2;
            $("#country").val(countryName);
            $("#countryCode").val(countryCode);
        });
        // Allow user to edit the country code directly in the input field
        $("#countryCode").on("input", function () {
            var code = $(this).val();
            iti.setCountry(code);
            var countryData = iti.getSelectedCountryData();
            var countryName = countryData.name;
            $("#country").val(countryName);
        });
    });
</script>
@endpush
