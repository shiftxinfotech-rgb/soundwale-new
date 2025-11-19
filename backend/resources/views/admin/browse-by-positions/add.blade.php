@extends('admin.layouts.default')
@section('title', 'Browse by Positions')
@section('content')
    <!-- begin:: Subheader -->
    <div class="kt-subheader   kt-grid__item" id="kt_subheader">
        <div class="kt-subheader__main">
            <h3 class="kt-subheader__title">Browse by Positions</h3>
            <span class="kt-subheader__separator kt-hidden"></span>
            <div class="kt-subheader__breadcrumbs">
                <span class="kt-subheader__breadcrumbs-separator"></span>
                <a href="{{ route('admin.browse.by.positions.list') }}" class="kt-subheader__breadcrumbs-link"
                    title="Back">List</a>
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
                        {{ $data ? 'Edit' : 'Add' }} Browse by Positions
                    </h3>
                </div>
            </div>
            <!--begin::Portlet-->
            <!--begin::Form-->
            <form class="kt-form" action="{{ route('admin.browse.by.positions.store') }}" id="amenities-add-form"
                method="post" isReload="{{ route('admin.browse.by.positions.list') }}" enctype="multipart/form-data">
                @csrf
                <input type="hidden" name="edit_id" value="{{ $data->id ?? null }}">
                <input type="hidden" name="status" value="{{ $data->status ?? '1' }}">

                <div class="kt-portlet__body">
                    <div class="form-group row">
                        <div class="col-lg-6">
                            <label>Image ( 64 X 64 ) {!! $data ? '' : '<span class="text-danger">*</span>' !!} </label>
                            <div class="custom-file">
                                <input type="file" name="image" class="custom-file-input" id="image"
                                    accept="image/*">
                                <label class="custom-file-label text-truncate" for="image">Choose file</label>
                                <span class="form-text text-muted">The Image must not be greater than 2MB. and file
                                    type: jpg, jpeg, png.</span>
                                @if ($data && $data->image)
                                    <a href="{{ $data->image_url }}" target="_blank">View Image</a>
                                @endif
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <label>Title <span class="text-danger">*</span></label>
                            <input type="text" name="title" placeholder="Enter Title"
                                value="{{ $data->title ?? null }}" class="form-control">
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-lg-6">
                            <label>Jobs <span class="text-danger">*</span></label>
                            <input type="number" name="description" placeholder="Enter Jobs" class="form-control"
                                value="{{ $data->description ?? null }}" min="0">
                        </div>
                        <div class="col-lg-6">
                            <label>Sequence <span class="text-danger">*</span></label>
                            <input type="text" name="sequence" placeholder="Enter sequence"
                                value="{{ $data->sequence ?? null }}" class="form-control only-digits">
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
            <!--end::Form-->
        </div>
    </div>
@endsection

@push('script')
    <script type="text/javascript">
        document.addEventListener("DOMContentLoaded", function() {
            // Validation configuration
            let conf = {
                rules: {
                    title: {
                        required: true,
                    },
                    image: {
                        required: {{ $data ? 'false' : 'true' }},
                    },
                    description: {
                        required: true,
                    },
                    sequence: {
                        required: true,
                    },
                },
                messages: {
                    content: {
                        required: "This field is required.",
                    },
                },
            };

            ClassicEditor
                .create(document.querySelector('#description'), {
                    toolbar: {
                        items: [
                            'heading', 'bold', 'italic', '|', 'bulletedList', '|', 'undo', 'redo', '|',
                            'insertTable', 'tableColumn', 'tableRow', 'mergeTableCells', '|',
                        ]
                    },
                    ckfinder: {
                        uploadUrl: "{{ route('admin.image.upload') . '?_token=' . csrf_token() }}", // CSRF token for security
                    },
                    language: 'en',
                    image: {
                        toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side']
                    }
                })
                .catch(error => {
                    console.error(error);
                });



            validationFormAndSubmit($('#amenities-add-form'), conf);
        });
    </script>
    <script src="{{ asset('admin-asset/js/ckeditor.js') }}"></script>
@endpush
