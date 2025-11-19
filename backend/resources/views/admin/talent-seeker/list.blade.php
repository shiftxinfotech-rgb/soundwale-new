@extends('admin.layouts.default')
@section('title', 'Hiring Talent')
@section('content')
    <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-bs4.min.css" rel="stylesheet">

    <!-- begin:: Subheader -->
    <div class="kt-subheader   kt-grid__item" id="kt_subheader">
        <div class="kt-subheader__main">
            <h3 class="kt-subheader__title">Hiring Talent</h3>
            <span class="kt-subheader__separator kt-hidden"></span>
            <div class="kt-subheader__breadcrumbs">
            </div>
        </div>
    </div>
    <!-- begin:: Content -->
    <div class="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
        @include('admin.layouts.flash-message')

        <div class="kt-portlet kt-portlet--mobile">
            <div class="kt-portlet__head kt-portlet__head--lg">
                <div class="kt-portlet__head-label">
                    <span class="kt-portlet__head-icon">
                        <i class="kt-font-brand fa fa-search"></i>
                    </span>
                    <h3 class="kt-portlet__head-title">
                        Hiring Talent
                    </h3>
                </div>
                <div class="kt-portlet__head-toolbar">
                    <div class="kt-portlet__head-wrapper">
                        <div class="kt-portlet__head-actions">
                            <a href="#" class="btn btn-clean btn-icon-sm">
                                <i class="la la-long-arrow-left"></i>
                                Back
                            </a>
                            &nbsp;
                        </div>
                    </div>
                </div>
            </div>
            <!--begin::Portlet-->
            <!--end::Portlet-->
            <div class="kt-portlet__body">
                <!--begin: Datatable -->
                <table class="table table-striped table-hover" id="contact_us_list_table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                <!--end: Datatable -->
            </div>
        </div>
    </div>
    <!-- end:: Content -->
    <div class="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
        <div class="kt-portlet kt-portlet--mobile">
            <div class="kt-portlet__head kt-portlet__head--lg">
                <div class="kt-portlet__head-label">
                    <span class="kt-portlet__head-icon">
                        <i class="kt-font-brand fa fa-search"></i>
                    </span>
                    <h3 class="kt-portlet__head-title">
                        Edit Hiring Talent
                    </h3>
                </div>
                <div class="kt-portlet__head-toolbar">
                    <div class="kt-portlet__head-wrapper">
                        <div class="kt-portlet__head-actions">
                            <a href="#" class="btn btn-clean btn-icon-sm">
                                <i class="la la-long-arrow-left"></i>
                                Back
                            </a>
                            &nbsp;
                        </div>
                    </div>
                </div>
            </div>
            <div class="kt-portlet__body">
                <form class="kt-form" action="{{ route('admin.talent.seeker.other.page.store') }}" id="amenities-add-from"
                    method="post" isReload="{{ route('admin.talent.seeker.list') }}" enctype="multipart/form-data">
                    @csrf
                    <div class="form-group row">
                        {{-- <div class="form-group col-lg-6">
                            <label>Title <span class="text-danger">*</span></label>
                            <textarea type="text" name="who_we_are_title" placeholder="Enter Title" value=""
                                class="form-control summernote">{{ $data['who_we_are_title'] ?? '' }}</textarea>
                        </div>

                        <div class="form-group col-lg-6">
                            <label>Image (Upload By: 630 X 448 ) <span class="text-danger">*</span></label>
                            <div class="custom-file">
                                <input type="file" name="who_we_are_image" class="custom-file-input" id="userImage"
                                    accept="image/*">
                                <label class="custom-file-label text-truncate" for="userImage">Choose file</label>
                                <span class="form-text text-muted">The Image must not be greater than 2MB. and file type:
                                    jpg, jpeg, png.</span>
                                @if (isset($data['who_we_are_image']) && !empty($data['who_we_are_image']))
                                    <a href="{{ asset('storage/app/other_page/' . $data['who_we_are_image']) }}"
                                        target="_blank">View Image</a>
                                @endif
                            </div>
                        </div>
                        <div class=" form-group col-lg-6">
                            <label>Description <span class="text-danger">*</span></label>
                            <textarea type="text" name="who_we_are_description" id="description" placeholder="Enter Description"
                                class="form-control">{{ $data['who_we_are_description'] ?? '' }}</textarea>
                        </div> --}}
                        <div class=" form-group col-lg-6">
                            <label>Solutions Text <span class="text-danger">*</span></label>
                            <textarea type="solution_text" name="solution_text" placeholder="Enter Solutions Text"
                                class="form-control">{{ $data['solution_text'] ?? '' }}</textarea>
                        </div>
                        <div class=" form-group col-lg-6">
                            <label> Hiring Needs Text <span class="text-danger">*</span></label>
                            <textarea type="solution_text" name="hiring_needs_text" placeholder="Enter Hiring Needs Text"
                                class="form-control">{{ $data['hiring_needs_text'] ?? '' }}</textarea>
                        </div>
                        <div class=" form-group col-lg-6">
                            <label>Hiring Needs Description <span class="text-danger">*</span></label>
                            <textarea type="solution_text" name="hiring_needs_description" placeholder="Enter Hiring Needs Description"
                                class="form-control">{{ $data['hiring_needs_description'] ?? '' }}</textarea>
                        </div>
                    </div>
                    <div class="kt-portlet__foot">
                        <div class="kt-form__actions">
                            <button type="submit" class="btn btn-brand">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection

@push('script')
    <script src="{{ asset('admin-asset/js/summernote.js') }}"></script>
    <script>
        let conf = {
            columns: [{
                    data: 'name',
                    name: 'name'
                },
                {
                    data: 'work_email',
                    name: 'work_email'
                },
                {
                    data: 'mobile_no',
                    name: 'mobile_no'
                },
                {
                    data: 'action',
                    name: 'action',
                    orderable: false,
                    serachable: false,
                    sClass: 'text-center'
                },
            ]
        };
        makeDataTable('#contact_us_list_table', "{{ route('admin.talent.seeker.list') }}", conf)
    </script>
    <script>
        let confs = {
            rules: {
                who_we_are_title: {
                    required: true,
                },
                who_we_are_image: {
                    required: {{ $data['who_we_are_image'] ? 'false' : true }},
                },
                who_we_are_description: {
                    required: true,
                },
                solution_text: {
                    required: true,
                },
                hiring_needs_text: {
                    required: true,
                },
                hiring_needs_description: {
                    required: true,
                },


            }
        };

        validationFormAndSubmit($('#amenities-add-from'), confs);

        $('.summernote').summernote({
            toolbar: [
                ['style', ['bold', 'italic', 'underline', 'clear']],
                ['color', ['forecolor']],
            ],
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

        ClassicEditor.create(document.querySelector('#description'), {
            height: 150,
        }).catch(error => {
            console.log(error);
        });
    </script>
@endpush
