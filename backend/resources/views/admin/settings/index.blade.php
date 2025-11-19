@extends('admin.layouts.default')
@section('title', 'Settings')
@section('content')
    <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-bs4.min.css" rel="stylesheet">

    <!-- begin:: Subheader -->
    <div class="kt-subheader   kt-grid__item" id="kt_subheader">
        <div class="kt-subheader__main">
            <h3 class="kt-subheader__title">Settings</h3>
            <span class="kt-subheader__separator kt-hidden"></span>
            <div class="kt-subheader__breadcrumbs">
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
                        <i class="kt-font-brand fa fa-cog"></i>
                    </span>
                    <h3 class="kt-portlet__head-title">
                        Settings
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
            <!--begin::Form-->
            <form class="kt-form" action="{{ route('admin.settings.update') }}" id="seller-add-from"
                isReload="{{ route('admin.settings.index') }}" method="post">
                @csrf
                <div class="kt-portlet__body">

                    <div class="form-group row" style="margin-bottom: 4rem;">
                        <div class="col-lg-6">
                            <label>Header Logo ( 126 X 70 ) {!! $data->header_logo ? '' : '<span class="text-danger">*</span>' !!} </label>
                            <div class="custom-file">
                                <input type="file" name="header_logo" class="custom-file-input" id="userImage"
                                    accept="image/*">
                                <label class="custom-file-label text-truncate" for="userImage">Choose file</label>
                                <span class="form-text text-muted">The image must not be greater than 2MB. and file type:
                                    jpg, jpeg, png.</span>
                                @if ($data && $data->header_logo)
                                    <a href="{{ asset("storage/app/logo/$data->header_logo") }}" target="_blank">View
                                        Image</a>
                                @endif
                            </div>
                            <input type="hidden" name="edit_id" value="{{ $data->id ?? null }}">
                        </div>
                        <div class="col-lg-6">
                            <label>Footer Logo ( 126 X 70 ) {!! $data->footer_logo ? '' : '<span class="text-danger">*</span>' !!} </label>
                            <div class="custom-file">
                                <input type="file" name="footer_logo" class="custom-file-input" id="usersImage"
                                    accept="image/*">
                                <label class="custom-file-label text-truncate" for="usersImage">Choose file</label>
                                <span class="form-text text-muted">The image must not be greater than 2MB. and file type:
                                    jpg, jpeg, png.</span>
                                @if ($data && $data->footer_logo)
                                    <a href="{{ asset("storage/app/logo/$data->footer_logo") }}" target="_blank">View
                                        Image</a>
                                @endif
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        {{-- <div class="col-lg-6">
                            <label>Header Text <span class="text-danger">*</span></label>
                            <textarea name="header_text" id="header_text" class="form-control" placeholder="Enter Header Text ">{{ $data->header_text ?? null }}</textarea>
                        </div> --}}
                        <div class="col-lg-6">
                            <label>Location <span class="text-danger">*</span></label>
                            <textarea name="factory_address" class="form-control" placeholder="Enter location">{{ $data->factory_address ?? null }}</textarea>
                        </div>
                        <div class="col-lg-6">
                            <label>Footer Content <span class="text-danger">*</span></label>
                            <textarea name="content" id="description" class="form-control" placeholder="Enter Footer Content ">{{ $data->content ?? null }}</textarea>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-lg-6">
                            <label>Phone Number<span class="text-danger">*</span></label>
                            <input type="tel" name="phone_number" class="form-control"
                                value="{{ $data->phone_number ?? null }}" placeholder="Enter Phone Number">
                        </div>
                        <div class="col-lg-6">
                            <label>Email <span class="text-danger">*</span></label>
                            <input type="email" name="email" class="form-control" value="{{ $data->email ?? null }}"
                                placeholder="Enter Email">
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-lg-12">
                            <label>Address <span class="text-danger">*</span></label>
                            <textarea name="registered_address" class="form-control" placeholder="Enter Address">{{ $data->registered_address ?? null }}</textarea>
                        </div>
                        {{-- <div class="col-lg-6">
                            <label>Contact Us Description <span class="text-danger">*</span></label>
                            <textarea type="text" name="website" class="form-control" placeholder="Enter Contact Us Description">{{ $data->website ?? null }}</textarea>
                        </div> --}}
                    </div>
                    <div class="form-group row">
                        <div class="col-lg-6">
                            <label>Looking For Job image ( 320 X 395 ) {!! $data->job_image ? '' : '<span class="text-danger">*</span>' !!} </label>
                            <div class="custom-file">
                                <input type="file" name="job_image" class="custom-file-input" id="job_image"
                                    accept="image/*">
                                <label class="custom-file-label text-truncate" for="userImage">Choose file</label>
                                <span class="form-text text-muted">The image must not be greater than 2MB. and file type:
                                    jpg, jpeg, png.</span>
                                @if ($data && $data->job_image)
                                    <a href="{{ $data->job_image_url }}" target="_blank">View
                                        Image</a>
                                @endif
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <label>Available Jobs Title <span class="text-danger">*</span></label>
                            <textarea name="blog_title" class="form-control" placeholder="Enter Available Jobs Title">{{ $data->blog_title ?? null }}</textarea>
                        </div>

                    </div>
                    <div class="form-group row">
                        {{-- <div class="col-lg-6">
                            <label>Industry Leaders Title <span class="text-danger">*</span></label>
                            <input type="text" name="leaders_title" class="form-control" value="{{ $data->leaders_title ?? null }}"
                                placeholder="Enter Industry Leaders Title ">
                        </div> --}}
                        <div class="col-lg-6">
                            <label>Testimonial Title <span class="text-danger">*</span></label>
                            <textarea name="testimonials_title" class="form-control" placeholder="Enter Testimonial Title">{{ $data->testimonials_title ?? null }}</textarea>
                        </div>
                        <div class="col-lg-6">
                            <label>Browse by Positions Title <span class="text-danger">*</span></label>
                            <textarea type="text" name="blog_description" class="form-control" placeholder="Enter Browse by Positions Title">{{ $data->blog_description ?? null }}</textarea>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-lg-6">
                            <label>Looking For Job Title <span class="text-danger">*</span></label>
                            <textarea name="nemt_title" class="form-control summernote" placeholder="Enter Looking For Job Title">{{ $data->nemt_title ?? null }}</textarea>
                        </div>
                        <div class="col-lg-6">
                            <label>Looking For Job Description <span class="text-danger">*</span></label>
                            <textarea type="text" name="nemt_description" id="nemt_description" class="form-control"
                                placeholder="Enter Looking For Job  Description">{{ $data->nemt_description ?? null }}</textarea>
                        </div>
                    </div>
                    <div class="form-group row">

                        {{-- <div class="col-lg-6">
                            <label>Deliverables Title<span class="text-danger">*</span></label>
                            <textarea type="text" name="testimonial_description" class="form-control"
                                placeholder="Enter Deliverables Title">{{ $data->testimonial_description ?? null }}</textarea>
                        </div> --}}
                    </div>
                    {{-- <label class="text-center">Some Statistical Facts <span class="text-danger">*</span></label>

                    <div class="form-group row">
                        <div class="col-lg-3">
                            <input type="text" name="t1" class="form-control" placeholder="Enter Text" value="{{ $data->t1 ?? null }}">
                        </div>
                        <div class="col-lg-3">
                            <input type="text" name="c1" class="form-control" placeholder="Enter Count" value="{{ $data->c1 ?? null }}">
                        </div>
                        <div class="col-lg-3">
                            <input type="text" name="t2" class="form-control" placeholder="Enter Text" value="{{ $data->t2 ?? null }}">
                        </div>
                        <div class="col-lg-3">
                            <input type="text" name="c2" class="form-control" placeholder="Enter Count" value="{{ $data->c2 ?? null }}">
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-lg-3">
                            <input type="text" name="t3" class="form-control" placeholder="Enter Text" value="{{ $data->t3 ?? null }}">
                        </div>
                        <div class="col-lg-3">
                            <input type="text" name="c3" class="form-control" placeholder="Enter Count" value="{{ $data->c3 ?? null }}">
                        </div>
                        <div class="col-lg-3">
                            <input type="text" name="t4" class="form-control" placeholder="Enter Text" value="{{ $data->t4 ?? null }}">
                        </div>
                        <div class="col-lg-3">
                            <input type="text" name="c4" class="form-control" placeholder="Enter Count" value="{{ $data->c4 ?? null }}">
                        </div>
                    </div> --}}
                    <div class="kt-portlet__foot">
                        <div class="kt-form__actions">
                            <button type="submit" class="btn btn-brand">Save</button>
                        </div>
                    </div>
                </div>
            </form>
            <!--end::Form-->
        </div>
    </div>
    <!-- end:: Content -->

@endsection

@push('script')
    <script src="{{ asset('admin-asset/js/summernote.js') }}"></script>

    <script type="text/javascript">
        $('.summernote').summernote({
            toolbar: [
                ['style', ['bold', 'italic', 'underline', 'clear']],
                ['color', ['forecolor']],
            ],
            // focus: true
        });
        ClassicEditor.defaultConfig = {
            toolbar: {
                items: ['heading', 'bold', 'italic', '|', 'bulletedList', '|', 'undo', 'redo', '|', "insertTable",
                    "tableColumn", "tableRow", "mergeTableCells"
                ]
            },
            resizeUnit: "px",
            ckfinder: {
                uploadUrl: "{{ route('admin.image.upload') . '?_token=' . csrf_token() }}",
            },
            language: 'en',
        };

        ClassicEditor.create(document.querySelector('#nemt_description'), {
                height: 150,
            })
            .catch(error => {
                console.log(error);
            });

        $.validator.addMethod("mapUrl", function(value, element) {
            return this.optional(element) || /^(https?:\/\/)?(www\.)?(google\.(com|co\.[a-z]{2})\/maps\/)/.test(
                value);
        }, "Please enter a valid Google Maps URL.");

        $.validator.addMethod("internationalPhoneNumber", function(value, element) {
            return this.optional(element) || /^\+\d{1,4}(\s?\d\s?){7,15}$/.test(value);
        }, "Please enter a valid phone number.");
        $.validator.addMethod("validEmail", function(value, element) {
            // Use a regular expression to check for a valid email format
            return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
        }, "Please enter a valid email address");

        $.validator.addMethod("notDisposableEmail", function(value, element) {
            // You can replace this with your own list of disposable email providers
            var disposableEmails = ['example.com', 'example.org', 'example.net'];
            var domain = value.split('@')[1];
            return disposableEmails.indexOf(domain) === -1;
        }, "Disposable email addresses are not allowed");
        $.validator.addMethod("summernoteRequired", function(value, element) {
            // Retrieve content from Summernote
            const content = $(element).summernote('isEmpty') ? '' : $(element).val();
            return content.trim().length > 0; // Ensure there's content
        }, "This field is required.");

        let conf = {
            rules: {
                header_logo: {
                    required: {{ $data->header_logo ? 'false' : true }},
                },
                footer_logo: {
                    required: {{ $data->footer_logo ? 'false' : true }},
                },
                content: {
                    required: true,
                    maxlength: 1500,
                },
                registered_address: {
                    required: true,
                },
                factory_address: {
                    required: true,
                    mapUrl: true
                },
                email: {
                    required: true,
                    validEmail: true,
                    notDisposableEmail: true
                },
                phone_number: {
                    required: true,
                    // number:true,
                    internationalPhoneNumber: true
                },
                website: {
                    required: true,
                },
                testimonials_title: {
                    required: true,
                },
                testimonial_description: {
                    required: true,
                },
                nemt_title: {
                    required: true,
                    summernoteRequired: true,
                },
                nemt_description: {
                    required: true,
                },
                blog_title: {
                    required: true,
                },
                blog_description: {
                    required: true,
                },
                header_text: {
                    required: true,
                },
                t1: {
                    required: true,
                },
                c1: {
                    required: true,
                },
                t2: {
                    required: true,
                },
                c2: {
                    required: true,
                },
                t3: {
                    required: true,
                },
                c3: {
                    required: true,
                },
                t4: {
                    required: true,
                },
                c4: {
                    required: true,
                },
                job_image: {
                    required: {{ $data->job_image ? 'false' : true }},
                },
                leaders_title: {
                    required: true,
                },
            },
        };
        validationFormAndSubmit($('#seller-add-from'), conf);
    </script>
@endpush
