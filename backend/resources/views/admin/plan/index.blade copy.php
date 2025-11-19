@extends('admin.layouts.default')
@section('title', 'Banner')
@section('content')
<!-- begin:: Subheader -->
<div class="kt-subheader   kt-grid__item" id="kt_subheader">
    <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">Banner</h3>
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
                {{-- <span class="kt-portlet__head-icon">
                    <i class="kt-font-brand flaticon-user-settings"></i>
                </span>
                <h3 class="kt-portlet__head-title">
                    {{ $data ? 'Edit' : 'Add' }} FAQ
                </h3> --}}
            </div>
        </div>
        <!--begin::Portlet-->
        <!--begin::Form-->
        <form class="kt-form" action="{{ route('admin.banner.update') }}" isReload="{{ route('admin.banner.index') }}" id="seller-add-from" method="post">
            <div class="kt-portlet__body">
                @csrf
                <div class="form-group row">
                    <div class="col-lg-6">
                        <label>Image ( 1358 X 240 ) {!! $data ? '' : '<span class="text-danger">*</span>' !!}  </label>
                        <div class="custom-file">
                            <input type="file" name="image" class="custom-file-input" id="userImage" accept="image/*">
                            <label class="custom-file-label text-truncate" for="userImage">Choose file</label>
                            <span class="form-text text-muted">The image must not be greater than 2MB. and file type: jpg, jpeg, png.</span>
                            @if ( $data && $data->image)
                                <a href="{{ $data->image_url }}" target="_blank">View Image</a>
                            @endif
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <label>Title <span class="text-danger">*</span></label>
                        <input type="text" name="title" id="title" placeholder="Enter Title" value="{{ $data->title ?? null }}" class="form-control" >
                    </div>

                </div>
                <input type="hidden" name="edit_id" value="{{ $data->id ?? null }}">

                <div class="form-group row">
                    <div class="col-lg-12">
                        <label>Description <span class="text-danger">*</span></label>
                        <textarea name="description" id="description" class="ckeditor  form-control" placeholder="Enter description" cols="15" rows="5">{{ $data->description ?? null }}</textarea>
                        <label id="description-error" class="text-danger" for="description"></label>
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

<script src="{{ asset('admin-asset/js/ckeditor.js') }}"></script>

<script type="text/javascript">

    ClassicEditor.defaultConfig = {
        toolbar: {
            // items: ['heading','bold','italic','|','bulletedList','|','undo','redo','|','imageUpload','imageResize','imageStyle:side','imageStyle:alignLeft','imageStyle:alignCenter','imageStyle:alignRight','imageStyle:sideLeft','imageTextAlternative','|',"insertTable", "tableColumn", "tableRow", "mergeTableCells"]
            items: ['heading','bold','italic','|','bulletedList','|','undo','redo','|',"insertTable", "tableColumn", "tableRow", "mergeTableCells"]
        },
        resizeUnit: "px",
        ckfinder: {
                uploadUrl: "{{ route('admin.image.upload').'?_token='.csrf_token() }}",
        },
        language: 'en',
    };

    ClassicEditor.create( document.querySelector( '#description' ), {
        height : 150,
    }).catch( error => {
        console.log( error );
    });



    let conf = {
        rules: {
            title: {
                required: true,
            },
            description: {
                required: true,
            },
            image: {
                required: {{ ( $data ) ? 'false' : true }},
            },
        },
    };
    validationFormAndSubmit($('#seller-add-from'),conf);
</script>
@endpush
