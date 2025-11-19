@extends('admin.layouts.default')
@section('title', 'CmaPage')
@section('content')
<!-- begin:: Subheader -->
<div class="kt-subheader   kt-grid__item" id="kt_subheader">
    <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">CMS Pages</h3>
        <span class="kt-subheader__separator kt-hidden"></span>
        <div class="kt-subheader__breadcrumbs">
            <span class="kt-subheader__breadcrumbs-separator"></span>
            <a href="{{ route('admin.cms.page.list') }}" class="kt-subheader__breadcrumbs-link" title="Back">List</a>
            <span class="kt-subheader__breadcrumbs-separator"></span>
            <a href="javascript:;" class="kt-subheader__breadcrumbs-link" title="Back">{{ $cmspage ? 'Edit' : 'Add' }}</a>
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
                    {{ isset($cmspage->id) ? 'Edit CMS Page' : 'Add CMS Page' }}
                </h3>
            </div>
        </div>
        <!--begin::Portlet-->
        <!--begin::Form-->
        <form class="kt-form" action="{{ route('admin.cms.page.store') }}" id="cms-page-add-from" method="post" isReload="{{ route('admin.cms.page.list') }}">
            <div class="kt-portlet__body">
                <div class="form-group row">
                    <div class="col-lg-12">
                        <label>Title <span class="text-danger">*</span></label>
                        <input type="text" name="title" placeholder="Enter title" value="{{ $cmspage->title ?? null }}" class="form-control" >
                        @csrf
                        <input type="hidden" name="edit_id" value="{{ $cmspage->id ?? null }}">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-lg-12">
                        <label>Description <span class="text-danger">*</span></label>
                        <textarea name="description" id="description" class="ckeditor  form-control" placeholder="Enter description" cols="15" rows="5">{{ $cmspage->description ?? null }}</textarea>
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

    ClassicEditor.defaultConfig = {
        toolbar: {
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
    })
    .catch( error => {
        console.log( error );
    } );

    let conf = {
        rules: {
            title: {
                required: true,
                maxlength:150,
            },
            description: {
                required: true,
            },
        },
    };

    validationFormAndSubmit($('#cms-page-add-from'),conf);

</script>
@endpush

