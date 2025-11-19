@extends('admin.layouts.default')
@section('title', 'Testimonials')
@section('content')
<!-- begin:: Subheader -->
<div class="kt-subheader   kt-grid__item" id="kt_subheader">
    <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">Testimonials</h3>
        <span class="kt-subheader__separator kt-hidden"></span>
        <div class="kt-subheader__breadcrumbs">
            <span class="kt-subheader__breadcrumbs-separator"></span>
            <a href="{{ route('admin.testimonials.list') }}" class="kt-subheader__breadcrumbs-link" title="Back">List</a>
            <span class="kt-subheader__breadcrumbs-separator"></span>
            <a href="javascript:;" class="kt-subheader__breadcrumbs-link" title="Back">{{ $data ? 'Edit' : 'Add' }}</a>
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
                    {{ $data ? 'Edit' : 'Add' }} Testimonials
                </h3>
            </div>
        </div>
        <!--begin::Portlet-->
        <!--begin::Form-->
        <form class="kt-form" action="{{ route('admin.testimonials.store') }}" id="amenities-add-from" method="post" isReload="{{ route('admin.testimonials.list') }}" enctype="multipart/form-data">
            <div class="kt-portlet__body">
                <div class="form-group row">
                    <div class="form-group col-lg-6">
                        @csrf
                        <input type="hidden" name="edit_id" value="{{ $data->id ?? null }}">
                        <label>Name <span class="text-danger">*</span></label>
                        <input type="text" name="name" placeholder="Enter Name" value="{{ $data->name ?? null }}" class="form-control" >
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Type <span class="text-danger">*</span></label>
                        <select name="type" class="form-control">
                            <option value="">Select Type</option>
                            <option value="0" {{ isset($data) && $data->type == 0 ? 'selected' : '' }}>Clients</option>
                            <option value="1" {{ isset($data) && $data->type == 1 ? 'selected' : '' }}>Candidates</option>
                        </select>
                    </div>
                    <div class=" form-group col-lg-6">
                        <label>Designation</label>
                        <input type="text" name="designation" placeholder="Enter Designation" value="{{ $data->designation ?? null }}" class="form-control" >
                    </div>
                    <div class="form-group col-lg-6" >
                        <label>Image (Upload By: 59 X 59 ) </label>
                        <div class="custom-file">
                            <input type="file" name="image" class="custom-file-input" id="userImage" accept="image/*">
                            <label class="custom-file-label text-truncate" for="userImage">Choose file</label>
                            <span class="form-text text-muted">The image must not be greater than 2MB. and file type: jpg, jpeg, png.</span>
                            @if ( $data && $data->image)
                                <a href="{{ $data->image_url }}" target="_blank">View Image</a>
                            @endif
                        </div>
                    </div>
                    <div class="form-group col-lg-12">
                        <label>Message <span class="text-danger">*</span></label>
                        <textarea name="message" placeholder="Enter Message" class="form-control" >{{ $data->message ?? null }}</textarea>
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
                maxlength:150,
            },
            // image: {
            //     required: {{ ( $data ) ? 'false' : true }},
            // },
            rating: {
                required: true,
                number  : true
            },
            // designation: {
            //     required: true,
            // },
            message: {
                required: true,
            },
            type: {
                required: true,
            },
        },
    };

    validationFormAndSubmit($('#amenities-add-from'),conf);
    document.getElementById('userImage').addEventListener('change', function() {
        let fileName = this.files[0] ? this.files[0].name : 'Choose file';
        let nextSibling = this.nextElementSibling;
        if (nextSibling && nextSibling.classList.contains('custom-file-label')) {
            nextSibling.textContent = fileName;
        }
        $(this).valid();
    });

</script>
@endpush

