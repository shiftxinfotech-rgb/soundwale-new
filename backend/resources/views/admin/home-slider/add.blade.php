@extends('admin.layouts.default')
@section('title', 'Home Header Slider')
@section('content')

<div class="kt-subheader   kt-grid__item" id="kt_subheader">
    <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">Home Header Slider</h3>
        <span class="kt-subheader__separator kt-hidden"></span>
        <div class="kt-subheader__breadcrumbs">
            <span class="kt-subheader__breadcrumbs-separator"></span>
            <a href="{{ route('admin.home_slider.list') }}" class="kt-subheader__breadcrumbs-link" title="Back">List</a>
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
                    {{ $data ? 'Edit' : 'Add New' }} Home Header Slider
                </h3>
            </div>
        </div>
        <!--begin::Portlet-->
        <!--begin::Form-->
        <form class="kt-form" action="{{ route('admin.home_slider.store') }}" id="amenities-add-from" method="post"
              isReload="{{ route('admin.home_slider.list') }}" enctype="multipart/form-data">
            <div class="kt-portlet__body">
                @csrf
                <input type="hidden" name="edit_id" value="{{ $data->id ?? null }}">
                <input type="hidden" name="status" value="{{ $data->status ?? 1 }}">

                @if ($data)
                <div class="form-group row">

                    <div class="form-group col-lg-6">
                        <label>Image (Upload By: 852 X 480 )</label>
                        <div class="custom-file">
                            <input type="file" name="image" class="custom-file-input" id="image" accept="image/*">
                            <label class="custom-file-label text-truncate" for="image">Choose file</label>
                            <span class="form-text text-muted">The image file type:jpg, jpeg, png.</span>
                            @if ($data && $data->image)
                            <a href="{{ $data->image_url }}" target="_blank">View Image</a>
                            @endif
                        </div>
                    </div>       
                </div>
                @else
                <div class="form-group row">
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label>Image <span class="text-danger">*</span> (Upload By: 852 X 480 )</label>
                            <div class="custom-file">
                                <input type="file" name="image" class="custom-file-input" id="image" accept="image/*">
                                <label class="custom-file-label text-truncate" for="image">Choose file</label>
                                <span class="form-text text-muted">The image file type:jpg, jpeg, png.</span>
                            </div>
                        </div>        
                    </div>
                    <div class="col-lg-6">
                        <button type="button" class="btn btn-brand btn_add_more add_more"><i class="la la-plus"></i></button>
                    </div>    
                </div>
                <div class="form-group row" id="append_html">

                </div>
                @endif
                <br/>
                <div class="kt-portlet__foot">
                    <div class="kt-form__actions">
                        <button type="submit" class="btn btn-brand">Save</button>
                        <button type="button" class="btn btn-secondary" onclick="window.history.back()">Cancel</button>
                    </div>
                </div>
            </div>
        </form>
        <!--end::Form-->
    </div>
</div>
@endsection
@push('script')
<script type="text/javascript">
    let conf = {
    rules: {
    image: {
    required: {{ $data ? 'false' : true }},
    },
    },
            messages: {
            },
    };
    validationFormAndSubmit($('#amenities-add-from'), conf);
    document.getElementById('image').addEventListener('change', function () {
    let fileName = this.files[0] ? this.files[0].name : 'Choose file';
    let nextSibling = this.nextElementSibling;
    if (nextSibling && nextSibling.classList.contains('custom-file-label')) {
    nextSibling.textContent = fileName;
    }
    $(this).valid();
    });
</script>
<script>
    var imageCounter = 1;

    // On button click, add new input
    $('.add_more').click(function () {
        var newItem = `
        <div class="form-group col-lg-6">
            <label>Image (Upload By: 852 X 480 )</label>
            <div class="custom-file">
                <input type="file" name="image1[]" class="custom-file-input" id="image${imageCounter}" accept="image/*">
                <label class="custom-file-label text-truncate" for="image${imageCounter}">Choose file</label>
                <span class="form-text text-muted">The image file type: jpg, jpeg, png.</span>
            </div>
        </div>
        <div class="form-group col-lg-6"></div>`;

        $('#append_html').append(newItem);
        imageCounter++;
    });

    // ? Event delegation for dynamic file inputs
    $(document).on('change', '.custom-file-input', function (e) {
        var fileName = e.target.files[0]?.name;
        if (fileName) {
            $(this).next('.custom-file-label').addClass("selected").html(fileName);
        }
    });
</script>
<!--<script>
    var imageCounter = 1;
    $('.add_more').click(function () {
        var newItem = '<div class="form-group col-lg-6"><label>Image (Upload By: 852 X 480 )</label><div class="custom-file"><input type="file" name="image1[]" class="custom-file-input" id="image'+imageCounter+'" accept="image/*"><label class="custom-file-label text-truncate" for="image'+imageCounter+'">Choose file</label><span class="form-text text-muted">The image file type:jpg, jpeg, png.</span></div></div><div class="form-group col-lg-6"></div>';
//      var newItem = '<div class="form-group col-lg-6"><label>Image (Upload By: 852 X 480 ) </label><br/><input type="file" name="image1[]" id="image1" accept="image/*"><span class="form-text text-muted">The image file type:jpg, jpeg, png.</span></div><div class="form-group col-lg-6"></div>';
        $('#append_html').append(newItem);
        imageCounter++;
    });
</script>-->
<script>
    $(document).ready(function () {
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
