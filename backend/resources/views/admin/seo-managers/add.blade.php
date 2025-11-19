@extends('admin.layouts.default')
@section('title', 'SEO Managers')
@section('content')
<style>
    .iti__dial-code{
        display:none;
    }
    .iti {
        position: relative !important;
        display: block !important;;
    }
</style>
<div class="kt-subheader   kt-grid__item" id="kt_subheader">
    <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">SEO Managers</h3>
        <span class="kt-subheader__separator kt-hidden"></span>
        <div class="kt-subheader__breadcrumbs">
            <span class="kt-subheader__breadcrumbs-separator"></span>
            <a href="{{ route('admin.seo.managers.list') }}" class="kt-subheader__breadcrumbs-link" title="Back">List</a>
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
                    {{ $data ? 'Edit' : 'Add' }} SEO Managers
                </h3>
            </div>
        </div>
        <!--begin::Portlet-->
        <!--begin::Form-->
        <form class="kt-form" action="{{ route('admin.seo.managers.store') }}" id="amenities-add-from" method="post" isReload="{{ route('admin.seo.managers.list') }}" enctype="multipart/form-data">
            <div class="kt-portlet__body">

                <div class="form-group row">
                    @csrf
                    <input type="hidden" name="edit_id" value="{{ $data->id ?? null }}">
                    <div class="col-md-6">
                        <label>Select Menu <span class="text-danger">*</span></label>
                        <select name="menu" class="form-control">
                            <option value="">Select Menu</option>
                            @php
                                $menus = [
                                    'home_page' => 'Home Page',
                                    'about_us_page' => 'About Us Page',
                                    'hiring_talent_page' => 'Hiring Talent Page',
                                    'job_seeker_page' => 'Job Seeker Page',
                                    'submit_role_page' => 'Submit Role Page',
                                    'contact_us_page' => 'Contact Us Page',
                                    'testimonials_page' => 'Testimonials Page',
                                    'cms_page' => 'CMS Page',
                                    'apply_job_page' => 'Apply Job Page',
                                    // 'terms_of_use_page' => 'Terms of Use Page'
                                ];
                                $existingMenus = \App\Models\SeoManagers::pluck('menu')->toArray();
                            @endphp

                            @foreach ($menus as $key => $value)
                                @if ((!in_array($key, $existingMenus)) || (isset($data) && $data->menu == $key))
                                    <option value="{{ $key }}" {{ isset($data) && $data->menu == $key ? 'selected' : '' }}>
                                        {{ $value }}
                                    </option>
                                @endif
                            @endforeach
                        </select>
                    </div>

                    <div class="col-md-6">
                        <label>SEO Title <span class="text-danger">*</span></label>
                        <input name="seo_title" class="form-control" placeholder="Enter SEO Title" value="{{ $data->seo_title ?? null }}">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-md-12">
                        <label>Meta keyword <span class="text-danger">*</span></label>
                        <input name="meta_keyword" class="form-control" placeholder="Enter Meta keyword" value="{{ $data->meta_keyword ?? null }}">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="form-group col-lg-12">
                        <label>Meta description  <span class="text-danger">*</span></label>
                        <textarea name="meta_description" placeholder="Enter Meta description " class="form-control" >{{ $data->meta_description ?? null }}</textarea>
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

    let conf = {
        rules: {
            menu: {
                required: true,
            },
            seo_title: {
                required: true,
            },
            meta_keyword: {
                required: true,
            },
            meta_description: {
                required: true,
            },
        },
    };

    validationFormAndSubmit($('#amenities-add-from'),conf);

</script>
@endpush

