@extends('admin.layouts.default')
@section('title', 'Announcement')
@section('content')
    <!-- begin:: Subheader -->
    <div class="kt-subheader   kt-grid__item" id="kt_subheader">
        <div class="kt-subheader__main">
            <h3 class="kt-subheader__title">Announcement</h3>
            <span class="kt-subheader__separator kt-hidden"></span>
            <div class="kt-subheader__breadcrumbs">
                <span class="kt-subheader__breadcrumbs-separator"></span>
                <a href="{{ route('admin.leaders.list') }}" class="kt-subheader__breadcrumbs-link" title="Back">List</a>
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
                        {{ $data ? 'Edit' : 'Add' }} Announcement
                    </h3>
                </div>
            </div>
            <!--begin::Portlet-->
            <!--begin::Form-->
            <form class="kt-form" action="{{ route('admin.leaders.store') }}" id="amenities-add-from" method="post"
                isReload="{{ route('admin.leaders.list') }}" enctype="multipart/form-data">
                @csrf
                <input type="hidden" name="edit_id" value="{{ $data->id ?? null }}">
                <input type="hidden" name="status" value="{{ $data->status ?? '1' }}">
                <div class="kt-portlet__body">
                    <div class="form-group row">
                        <div class="col-lg-6">
                            <label>Title <span class="text-danger">*</span></label>
                            <input type="text" name="title" id="title" placeholder="Enter Title"
                                value="{{ $data->title ?? null }}" class="form-control">
                        </div>
                        <div class="col-lg-6">
                            <label>Description <span class="text-danger">*</span></label>
                            <textarea name="description" class="ckeditor  form-control" placeholder="Enter description"
                                cols="15" rows="5">{{ $data->description ?? null }}</textarea>
                            <label id="description-error" class="text-danger" for="description"></label>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="form-group col-lg-6">
                            <label>Image  (Upload By: 45 X 45 ) {!! $data && $data->image ? '' : '<span class="text-danger">*</span>' !!} </label>
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

                    </div>
                    <div class="kt-portlet__foot">
                        <div class="kt-form__actions">
                            <button type="submit" class="btn btn-brand">Save</button>
                            <button type="button" class="btn btn-secondary" onclick="window.history.back()">Cancel</button>

                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
@endsection
@push('script')
    <script type="text/javascript">
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
        let conf = {
            rules: {
                image: {
                    required: {{ $data ? 'false' : true }},
                },
                title: {
                    required: true,
                },
                description: {
                    required: true,
                },
            },
        };
        validationFormAndSubmit($('#amenities-add-from'), conf);


    </script>
@endpush
