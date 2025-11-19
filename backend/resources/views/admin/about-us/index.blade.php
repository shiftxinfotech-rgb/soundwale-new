@extends('admin.layouts.default')
@section('title', 'About Us')
@section('content')
    <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-bs4.min.css" rel="stylesheet">

    <!-- begin:: Subheader -->
    <div class="kt-subheader   kt-grid__item" id="kt_subheader">
        <div class="kt-subheader__main">
            <h3 class="kt-subheader__title">About Us</h3>
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
                        <i class="kt-font-brand fa fa-language"></i>
                    </span>
                    <h3 class="kt-portlet__head-title">
                        About Us
                    </h3>
                </div>
                <div class="kt-portlet__head-toolbar">
                    <div class="kt-portlet__head-wrapper">
                        <a href="{{route('admin.home')}}" class="btn btn-clean btn-icon-sm">
                            <i class="la la-long-arrow-left"></i>
                            Back
                        </a>

                    </div>
                </div>
            </div>

            <form class="kt-form" action="{{ route('admin.about.us.update') }}"
                isReload="{{ route('admin.about.us.index') }}" id="seller-add-from" method="post">
                @csrf
                <div class="kt-portlet__body">
                    <div class="form-group row">
                        {{-- <div class="col-lg-6">
                            <label>Title 1<span class="text-danger">*</span></label>
                            <input type="text" name="title_1" placeholder="Enter Title 1"
                                value="{{ $data->title_1 ?? null }}" class="form-control">
                        </div> --}}

                    </div>
                    <input type="hidden" name="edit_id" value="{{ $data->id ?? null }}">

                    <div class="form-group row">
                        <div class="col-lg-6">
                            <label>Title <span class="text-danger">*</span></label>
                            <textarea type="text" name="title_2" placeholder="Enter Title" class="form-control summernote">{{ $data->title_2 ?? null }}</textarea>
                        </div>
                        <div class="col-lg-6">
                            <label>Description <span class="text-danger">*</span></label>
                            <textarea name="description" id="description" class="ckeditor  form-control" placeholder="Enter description"
                                cols="15" rows="5">{{ $data->description ?? null }}</textarea>
                            <label id="description-error" class="text-danger" for="description"></label>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-lg-6">
                            <label>Image ( 630 X 436) {!! $data->image ? '' : '<span class="text-danger">*</span>' !!} </label>
                            <div class="custom-file">
                                <input type="file" name="image" class="custom-file-input" id="userImage"
                                    accept="image/*">
                                <label class="custom-file-label text-truncate" for="userImage">Choose file</label>
                                <span class="form-text text-muted">The image must not be greater than 2MB. and file type:
                                    jpg, jpeg, png.</span>
                                @if ($data && $data->image)
                                    <a href="{{ $data->image_url }}" target="_blank">View Image</a>
                                @endif
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <label>Work With Us Image ( 377 X 465) {!! $data->image_2 ? '' : '<span class="text-danger">*</span>' !!} </label>
                            <div class="custom-file">
                                <input type="file" name="image_2" class="custom-file-input" id="userImage_2"
                                    accept="image/*">
                                <label class="custom-file-label text-truncate" for="userImage_2">Choose file</label>
                                <span class="form-text text-muted">The image must not be greater than 2MB. and file type:
                                    jpg, jpeg, png.</span>
                                @if ($data && $data->image_2)
                                    <a href="{{ $data->image_2_url }}" target="_blank">View Image</a>
                                @endif
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-lg-6">
                            <label>Work With Us <span class="text-danger">*</span></label>
                            <textarea type="text" name="lets_work_together_title" id="what_we_do_description" placeholder="Enter Work With Us"
                                class="form-control">{{ $data->lets_work_together_title ?? null }}</textarea>
                        </div>
                        <div class="col-lg-6">
                            <label>Our Core Values Text<span class="text-danger">*</span></label>
                            <textarea type="text" name="our_value_title" placeholder="Enter Our Core Values Text" class="form-control">{{ $data->our_value_title ?? null }}</textarea>
                        </div>
                    </div>

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
    <script>
        $('.summernote').summernote({
            toolbar: [
                ['style', ['bold', 'italic', 'underline', 'clear']],
                ['color', ['forecolor']],
            ],
        });
    </script>
    <script type="text/javascript">
        ClassicEditor.defaultConfig = {
            toolbar: {
                // items: ['heading','bold','italic','|','bulletedList','|','undo','redo','|','imageUpload','imageResize','imageStyle:side','imageStyle:alignLeft','imageStyle:alignCenter','imageStyle:alignRight','imageStyle:sideLeft','imageTextAlternative','|',"insertTable", "tableColumn", "tableRow", "mergeTableCells"]
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

        ClassicEditor.create(document.querySelector('#description'), {
            height: 150,
        }).catch(error => {
            console.log(error);
        });
        // WHAT WE DO
        ClassicEditor.defaultConfig = {
            toolbar: {
                // items: ['heading','bold','italic','|','bulletedList','|','undo','redo','|','imageUpload','imageResize','imageStyle:side','imageStyle:alignLeft','imageStyle:alignCenter','imageStyle:alignRight','imageStyle:sideLeft','imageTextAlternative','|',"insertTable", "tableColumn", "tableRow", "mergeTableCells"]
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

        ClassicEditor.create(document.querySelector('#what_we_do_description'), {
            height: 150,
        }).catch(error => {
            console.log(error);
        });
        // WHAT WE DO
        // our vision
        ClassicEditor.defaultConfig = {
            toolbar: {
                // items: ['heading','bold','italic','|','bulletedList','|','undo','redo','|','imageUpload','imageResize','imageStyle:side','imageStyle:alignLeft','imageStyle:alignCenter','imageStyle:alignRight','imageStyle:sideLeft','imageTextAlternative','|',"insertTable", "tableColumn", "tableRow", "mergeTableCells"]
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

        ClassicEditor.create(document.querySelector('#our_vision_description'), {
            height: 150,
        }).catch(error => {
            console.log(error);
        });
        // our vision
        // our mission
        ClassicEditor.defaultConfig = {
            toolbar: {
                // items: ['heading','bold','italic','|','bulletedList','|','undo','redo','|','imageUpload','imageResize','imageStyle:side','imageStyle:alignLeft','imageStyle:alignCenter','imageStyle:alignRight','imageStyle:sideLeft','imageTextAlternative','|',"insertTable", "tableColumn", "tableRow", "mergeTableCells"]
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

        ClassicEditor.create(document.querySelector('#our_mission_description'), {
            height: 150,
        }).catch(error => {
            console.log(error);
        });

        $.validator.addMethod("summernoteRequired", function(value, element) {
            // Retrieve content from Summernote
            const content = $(element).summernote('isEmpty') ? '' : $(element).val();
            return content.trim().length > 0; // Ensure there's content
        }, "This field is required.");

        // our mission
        let conf = {
            rules: {
                title_1: {
                    required: true,
                },
                title_2: {
                    required: true,
                    summernoteRequired:true,

                },
                description: {
                    required: true,
                },
                image: {
                    required: {{ $data->image ? 'false' : true }},
                },
                image_2: {
                    required: {{ $data->image_2 ? 'false' : true }},
                },
                lets_work_together_title: {
                    required: true,
                },
                our_value_title: {
                    required: true,
                },
                what_we_do_image: {
                    required: {{ $data->what_we_do_image ? 'false' : true }},
                },
                what_we_do_description: {
                    required: true,
                },
                our_vision_image: {
                    required: {{ $data->our_vision_image ? 'false' : true }},
                },
                our_vision_description: {
                    required: true,
                },
                our_mission_image: {
                    required: {{ $data->our_mission_image ? 'false' : true }},
                },
                our_mission_description: {
                    required: true,
                },
            },
        };
        validationFormAndSubmit($('#seller-add-from'), conf);
    </script>
@endpush
