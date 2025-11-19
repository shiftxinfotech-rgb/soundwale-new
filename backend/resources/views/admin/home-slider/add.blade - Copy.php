@extends('admin.layouts.default')
@section('title', 'Banner')
@section('content')
{{-- <link rel="stylesheet" href="{{asset('admin-asset/css/summernote-bs4.min.css')}}"> --}}
    <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-bs4.min.css" rel="stylesheet">

    <!-- begin:: Subheader -->
    <div class="kt-subheader   kt-grid__item" id="kt_subheader">
        <div class="kt-subheader__main">
            <h3 class="kt-subheader__title">Banner</h3>
            <span class="kt-subheader__separator kt-hidden"></span>
            <div class="kt-subheader__breadcrumbs">
                {{-- <span class="kt-subheader__breadcrumbs-separator"></span>
                <a href="{{ route('admin.home.slider.list') }}" class="kt-subheader__breadcrumbs-link"
                    title="Back">List</a> --}}
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
                        {{ $data ? 'Edit' : 'Add' }} Banner
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

            <form class="kt-form" action="{{ route('admin.home.slider.store') }}" id="faq-add-from" method="post"
                isReload="{{ route('admin.home.slider.list') }}" enctype="multipart/form-data">
                @csrf
                <input type="hidden" name="edit_id" value="{{ $data->id ?? null }}">
                <div class="kt-portlet__body">
                    <div class="form-group row">
                        <div class="col-lg-6">
                            <label>Title <span class="text-danger">*</span></label>
                            <textarea name="title" placeholder="Enter title" class="form-control">{{ $data->title ?? null }}</textarea>
                        </div>
                        <div class="col-lg-6">
                            <label>Text <span class="text-danger">*</span></label>
                            <textarea name="text" placeholder="Enter text" class="form-control">{{ $data->text ?? null }}</textarea>
                        </div>
                    </div>
                    {{-- <div class="form-group row">
                    <div class="col-lg-12">
                        <label>Description <span class="text-danger">*</span></label>
                        <textarea  name="description" placeholder="Enter Description" class="form-control" >{{ $data->description ?? null }}</textarea>
                    </div>
                </div> --}}
                    <div class="form-group row">
                        <div class="col-lg-6">
                            <label>Image ( 1349 X 475 ) {!! $data ? '' : '<span class="text-danger">*</span>' !!} </label>
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
                        {{-- <div class="col-lg-6">
                        <label>Sequence <span class="text-danger">*</span></label>
                        <input type="text" name="sequence" placeholder="Enter sequence" value="{{ $data->sequence ?? null }}" class="form-control only-digits" >
                    </div> --}}
                        <input type="hidden" name="sequence" placeholder="Enter sequence"
                            value="{{ $data->sequence ?? null }}" class="form-control only-digits">

                    </div>
                    <input type="hidden" name="status" value="{{ $data->status ?? 1 }}">


                    <div class="kt-portlet__foot">
                        <div class="kt-form__actions">
                            <button type="submit" class="btn btn-brand">Save</button>
                            {{-- <button type="button" class="btn btn-secondary" onclick="window.history.back()">Cancel</button> --}}

                        </div>
                    </div>
                </div>
            </form>
            <!--end::Form-->
        </div>
    </div>
@endsection
@push('script')
    <script src="{{ asset('admin-asset/js/summernote.js') }}"></script>
    <script type="text/javascript">
        let conf = {
            rules: {
                image: {
                    required: {{ $data ? 'false' : true }},
                },
                title: {
                    required: true,
                },
                text: {
                    required: true,
                },
            },
        };

        validationFormAndSubmit($('#faq-add-from'), conf);


        $('.summernote').summernote({
            toolbar: [
                ['style', ['bold', 'italic', 'underline', 'clear']],
                ['color', ['forecolor']],
            ],
            focus: true
        });
    </script>
@endpush
