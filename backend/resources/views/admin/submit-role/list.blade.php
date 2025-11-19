@extends('admin.layouts.default')
@section('title', 'Submit Role')
@section('content')
    <!-- begin:: Subheader -->
    <div class="kt-subheader   kt-grid__item" id="kt_subheader">
        <div class="kt-subheader__main">
            <h3 class="kt-subheader__title">Submit Role</h3>
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
                        <i class="kt-font-brand fa fa-user"></i>
                    </span>
                    <h3 class="kt-portlet__head-title">
                         Submit Role
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
                            <th>Job Title </th>
                            <th>Hires</th>
                            <th>Location</th>
                            <th>Start Date</th>
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
    <div class="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
        <div class="kt-portlet kt-portlet--mobile">
            <div class="kt-portlet__head kt-portlet__head--lg">
                <div class="kt-portlet__head-label">
                    <span class="kt-portlet__head-icon">
                        <i class="kt-font-brand fa fa-user"></i>
                    </span>
                    <h3 class="kt-portlet__head-title">
                        Edit  Submit Role
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
                <form class="kt-form" action="{{ route('admin.submit.role.other.page.store') }}" id="amenities-add-from"
                    method="post" isReload="{{ route('admin.submit.role.list') }}" enctype="multipart/form-data">
                    <div class="form-group row">
                        <div class="form-group col-lg-6">
                            @csrf
                            <label>Title <span class="text-danger">*</span></label>
                            <textarea type="text" name="submit_role_title" placeholder="Enter Title" value=""
                                class="form-control ">{{ $data['submit_role_title'] ?? '' }}</textarea>
                        </div>

                        <div class=" form-group col-lg-6">
                            <label>Description <span class="text-danger">*</span></label>
                            <textarea type="text" name="submit_role_description"  placeholder="Enter Description"
                                class="form-control">{{ $data['submit_role_description'] ?? '' }}</textarea>
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
    <!-- end:: Content -->

@endsection

@push('script')

    <script>
        let conf = {
            columns: [{
                    data: 'job',
                    name: 'job'
                },
                {
                    data: 'hires',
                    name: 'hires'
                },
                {
                    data: 'location',
                    name: 'location'
                },
                {
                    data: 'start_date',
                    name: 'start_date'
                },
                {
                    data: 'name',
                    name: 'name'
                },
                {
                    data: 'email',
                    name: 'email'
                },
                {
                    data: 'phone_number',
                    name: 'phone_number'
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
        makeDataTable('#contact_us_list_table', "{{ route('admin.submit.role.list') }}", conf)
    </script>
    <script>
        let confs = {
            rules: {
                submit_role_title: {
                    required: true,
                },
                submit_role_description: {
                    required: true,
                },
            }
        };

        validationFormAndSubmit($('#amenities-add-from'), confs);

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
