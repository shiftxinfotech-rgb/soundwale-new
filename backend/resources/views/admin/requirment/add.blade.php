@extends('admin.layouts.default')
@section('title', 'Requirment')
@section('content')

    <div class="kt-subheader   kt-grid__item" id="kt_subheader">
        <div class="kt-subheader__main">
            <h3 class="kt-subheader__title">Requirment</h3>
            <span class="kt-subheader__separator kt-hidden"></span>
            <div class="kt-subheader__breadcrumbs">
                <span class="kt-subheader__breadcrumbs-separator"></span>
                <a href="{{ route('admin.requirment.list') }}" class="kt-subheader__breadcrumbs-link" title="Back">List</a>
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
                    {{ $data ? 'Edit' : 'Add New' }} Requirment
                </h3>
                </div>
            </div>
            <!--begin::Portlet-->
            <!--begin::Form-->
            <form class="kt-form" action="{{ route('admin.requirment.store') }}" id="amenities-add-from" method="post"
                isReload="{{ route('admin.requirment.list') }}" enctype="multipart/form-data">
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
                            <input type="text" name="name" placeholder="Enter Name" value="{{ $data->name ?? null }}" class="form-control">
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
                name: {
                    required: true,
                    maxlength: 1000,
                },
            },
            messages: {
            },
        };

        validationFormAndSubmit($('#amenities-add-from'), conf);
        document.getElementById('userImage').addEventListener('change', function() {
            let fileName = this.files[0] ? this.files[0].name : 'Choose file';
            let nextSibling = this.nextElementSibling;
            if (nextSibling && nextSibling.classList.contains('custom-file-label')) {
                nextSibling.textContent = fileName;
            }
            $(this).valid();
        });
    </script>
    <script>
            $('.add_more').click(function() {
                var newItem = '<div class="form-group col-lg-6"><label>Name</label><input type="text" name="name1[]" placeholder="Enter Name" value="" class="form-control"></div><div class="form-group col-lg-6"></div>';
                $('#append_html').append(newItem);
            });
    </script>
    <script>
        $(document).ready(function() {
            var input = document.querySelector("#country");
            var countryCodeInput = document.querySelector("#countryCode");
            var iti = window.intlTelInput(input, {
                separateDialCode: false,
                initialCountry: "{{ $data->country_code ?? 'ae' }}",
                geoIpLookup: function(callback) {
                    $.get('https://ipinfo.io', function() {}, "jsonp").always(function(resp) {
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
            input.addEventListener("countrychange", function() {
                var countryData = iti.getSelectedCountryData();
                var countryName = countryData.name;
                var countryCode = countryData.iso2;
                $("#country").val(countryName);
                $("#countryCode").val(countryCode);
            });

            // Allow user to edit the country code directly in the input field
            $("#countryCode").on("input", function() {
                var code = $(this).val();
                iti.setCountry(code);
                var countryData = iti.getSelectedCountryData();
                var countryName = countryData.name;
                $("#country").val(countryName);
            });
        });
    </script>
@endpush
