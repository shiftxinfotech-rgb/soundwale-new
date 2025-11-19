@extends('admin.layouts.default')
@section('title', 'Company')
@section('content')

    <div class="kt-subheader   kt-grid__item" id="kt_subheader">
        <div class="kt-subheader__main">
            <h3 class="kt-subheader__title">Company</h3>
            <span class="kt-subheader__separator kt-hidden"></span>
            <div class="kt-subheader__breadcrumbs">
                <span class="kt-subheader__breadcrumbs-separator"></span>
                <a href="{{ route('admin.categories.list') }}" class="kt-subheader__breadcrumbs-link" title="Back">List</a>
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
                    {{ $data ? 'Edit' : 'Add New' }} Company
                </h3>
                </div>
            </div>
            <!--begin::Portlet-->
            <!--begin::Form-->
            <form class="kt-form" action="{{ route('admin.categories.store') }}" id="amenities-add-from" method="post"
                isReload="{{ route('admin.categories.list') }}" enctype="multipart/form-data">
                <div class="kt-portlet__body">
                    <div class="form-group row">
                        <div class="form-group col-lg-6">
                            @csrf
                            <input type="hidden" name="edit_id" value="{{ $data->id ?? null }}">
                            <label>Name <span class="text-danger">*</span></label>
                            <input type="text" name="name" placeholder="Enter Name" value="{{ $data->name ?? null }}"
                                class="form-control">
                        </div>
                        <div class="form-group col-lg-6">
                            <label>Description</label>
                            <input type="text" name="description" placeholder="Enter Description" value="{{ $data->description ?? null }}" maxlength="80" class="form-control">
                        </div>

                        <div class="form-group col-lg-6">
                            <label>Image (Upload By: 300 X 300 ) {!! $data && $data->image ? '' : '' !!} </label>
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
                        <div class="form-group col-lg-6"></div>
                        <div class="form-group col-lg-6">
                            <label>Look Who's Trending</label>
                            <input type="checkbox" name="look_who_s_trending" id="look_who_s_trending"  value="1" @if(isset($data) && $data->look_who_s_trending == 1) checked @endif>
                        </div>
                        <div class="form-group col-lg-6"></div>
                        <div class="form-group col-lg-6">
                            <label>Our Top Pick</label>
                            <input type="checkbox" name="our_top_pick" id="our_top_pick"  value="1" @if(isset($data) && $data->our_top_pick == 1) checked @endif>
                        </div>
                        
                        <input type="hidden" name="status" value="{{ $data->status ?? 1 }}">

                    </div>
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
                }
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
