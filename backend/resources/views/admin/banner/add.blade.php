@extends('admin.layouts.default')
@section('title', 'Banner')
@section('content')
<!-- begin:: Subheader -->
<div class="kt-subheader   kt-grid__item" id="kt_subheader">
    <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">Banner</h3>
        <span class="kt-subheader__separator kt-hidden"></span>
        <div class="kt-subheader__breadcrumbs">
            <span class="kt-subheader__breadcrumbs-separator"></span>
            <a href="{{ route('admin.banners.list') }}" class="kt-subheader__breadcrumbs-link" title="Back">List</a>
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
                {{-- <span class="kt-portlet__head-icon">
                    <i class="kt-font-brand flaticon-user-settings"></i>
                </span>
                <h3 class="kt-portlet__head-title">
                    {{ $data ? 'Edit' : 'Add' }} Banner
                </h3> --}}
            </div>
        </div>
        <!--begin::Portlet-->
        <!--begin::Form-->
        <form class="kt-form" action="{{ route('admin.banners.store') }}" id="faq-add-from" method="post" isReload="{{ route('admin.banners.list') }}" enctype="multipart/form-data">
            @csrf
            <div class="kt-portlet__body">
                <div class="form-group row">
                    <div class="col-md-6">
                        <label>Select Page <span class="text-danger">*</span></label>
                        <select name="page" class="form-control">
                            <option value="">Select Page</option>
                            @php
                                $menus = [
                                    'about_us_page' => 'About Us Page',
                                    'free_estimate_page' => 'Free Estimate Page',
                                    'careers_page' => 'Careers Page',
                                    'services_page' => 'Services Page',
                                    'contact_us_page' => 'Contact Us Page',
                                    'blog_page' => 'Blog Page',
                                    'booking_page' => 'Booking Page',
                                    'cms_page' => 'CMS Page',
                                    // 'terms_of_use_page' => 'Terms of Use Page'
                                ];
                                $existingMenus = \App\Models\Banner::pluck('page')->toArray();
                            @endphp

                            @foreach ($menus as $key => $value)
                                @if ((!in_array($key, $existingMenus)) || (isset($data) && $data->page == $key))
                                    <option value="{{ $key }}" {{ isset($data) && $data->page == $key ? 'selected' : '' }}>
                                        {{ $value }}
                                    </option>
                                @endif
                            @endforeach
                        </select>
                    </div>
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



                </div>
                <input type="hidden" name="edit_id" value="{{ $data->id ?? null }}">

                <div class="form-group row">
                    <div class="col-lg-6">
                        <label>Title <span class="text-danger">*</span></label>
                        <input type="text" name="title" id="title" placeholder="Enter Title" value="{{ $data->title ?? null }}" class="form-control" >
                    </div>
                    <div class="col-lg-6">
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
@endsection
@push('script')

<script type="text/javascript">

    let conf = {
        rules: {
            image: {
                required: {{ ( $data ) ? 'false' : true }},
            },
            title: {
                required: true,
            },
            page: {
                required: true,
            },
            description: {
                required: true,
            },
        },
    };

    validationFormAndSubmit($('#faq-add-from'),conf);

</script>
@endpush

