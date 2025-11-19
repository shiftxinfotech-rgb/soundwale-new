@extends('admin.layouts.default')
@section('title', 'Parts')
@section('content')

<div class="kt-subheader   kt-grid__item" id="kt_subheader">
    <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">Parts</h3>
        <span class="kt-subheader__separator kt-hidden"></span>
        <div class="kt-subheader__breadcrumbs">
            <span class="kt-subheader__breadcrumbs-separator"></span>
            <a href="{{ route('admin.parts.list') }}" class="kt-subheader__breadcrumbs-link" title="Back">List</a>
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
                    {{ $data ? 'Edit' : 'Add New' }} Parts
                </h3>
            </div>
        </div>
        <!--begin::Portlet-->
        <!--begin::Form-->
        <form class="kt-form" action="{{ route('admin.parts.store') }}" id="amenities-add-from" method="post"
              isReload="{{ route('admin.parts.list') }}" enctype="multipart/form-data">
            <div class="kt-portlet__body">
                @csrf
                <input type="hidden" name="edit_id" value="{{ $data->id ?? null }}">
                <input type="hidden" name="status" value="{{ $data->status ?? 1 }}">

                @if ($data)
                <div class="form-group row">

                    <div class="form-group col-lg-6">
                        <label>Name <span class="text-danger">*</span></label>
                        <input type="text" name="name" placeholder="Enter Name" value="{{ $data->name ?? null }}" class="form-control">
                    </div>
                </div>
                @else
                <div class="form-group row">

                    <div class="col-lg-6">
                        <label>Name <span class="text-danger">*</span></label>
                        <input type="text" id="main-name"  name="name" placeholder="Enter Name" value="{{ $data->name ?? null }}" class="form-control">
                        <div id="main-name-error" class="text-danger"></div>
                    </div>
                    <div class="col-lg-6">
                        <button type="button" class="btn btn-brand btn_add_more add_more"><i class="la la-plus"></i></button>
                    </div>    
                </div>
                <div class="form-group row" id="append_html">

                </div>
                @endif
                <div class="kt-portlet__foot">
                    <div class="kt-form__actions">
                        @if ($data)
                        <button id="submitBtn"  type="submit" class="btn btn-brand">Save</button>
                        @else
                        <button id="submitBtn"  type="submit" class="btn btn-brand" disabled>Save</button>
                        @endif
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
<script>
    document.addEventListener('DOMContentLoaded', function () {
        function validateNames() {
            let mainName = document.getElementById('main-name').value.trim();
            let name1Inputs = document.querySelectorAll('.dynamic-name');
            let name1Values = [];
            let hasError = false;

            // Clear previous errors
            document.getElementById('main-name-error').innerText = '';
            name1Inputs.forEach(input => {
                const errorDiv = input.parentElement.querySelector('.name1-error');
                if (errorDiv)
                    errorDiv.innerText = '';
            });

            name1Inputs.forEach((input) => {
                const val = input.value.trim();
                const errorDiv = input.parentElement.querySelector('.name1-error');

                // If field is empty, skip validation and clear message
                if (val === '') {
                    if (errorDiv)
                        errorDiv.innerText = '';
                    return;
                }

                // Check if duplicate in name1[]
                if (name1Values.includes(val)) {
                    if (errorDiv)
                        errorDiv.innerText = 'Duplicate name!';
                    hasError = true;
                } else {
                    name1Values.push(val);
                }

                // Check if value matches main name
                if (val === mainName) {
                    if (errorDiv)
                        errorDiv.innerText = 'Name cannot be same as main name!';
                    hasError = true;
                }
            });

            // Check if main name is in name1[]
            if (mainName && name1Values.includes(mainName)) {
                document.getElementById('main-name-error').innerText = 'Main name must be unique.';
                hasError = true;
            }

            // Enable/Disable submit button here
            const submitBtn = document.getElementById('submitBtn');
            if (submitBtn) {
                submitBtn.disabled = hasError;
            }

            return !hasError;
        }

        // On blur of main name
        const mainInput = document.getElementById('main-name');
        if (mainInput) {
            mainInput.addEventListener('blur', validateNames);
        }

        // On blur of dynamic name1[] inputs
        document.addEventListener('input', function (e) {
            if (e.target.classList.contains('dynamic-name')) {
                e.target.addEventListener('blur', validateNames);
            }
        });
    });
</script>
<script type="text/javascript">
    let conf = {
        rules: {
            name: {
                required: true,
                maxlength: 1000,
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
    $('.add_more').click(function () {
        var newItem = '<div class="dynamic-names col-md-12"><div class="form-group col-lg-6"><label>Name</label><input type="text" name="name1[]" placeholder="Enter Name" value="" class="form-control dynamic-name"><div class="text-danger name1-error"></div></div><div class="form-group col-lg-6"></div></div>';
        $('#append_html').append(newItem);
    });
</script>
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
