@extends('admin.layouts.default')
@section('title', 'Social Links')
@section('content')
<!-- begin:: Subheader -->
<div class="kt-subheader   kt-grid__item" id="kt_subheader">
    <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">Social Links</h3>
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
                    <i class="kt-font-brand fa fa-link"></i>
                </span>
                <h3 class="kt-portlet__head-title">
                    Social Links
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
        <!--begin::Portlet-->
        <!--begin::Form-->
        <form class="kt-form" action="{{ route('admin.social.link.update') }}" isReload="{{ route('admin.social.link.index') }}" id="seller-add-from" method="post">
            <div class="kt-portlet__body">
                <div class="form-group row">
                    <div class="col-lg-6">
                        <label>Facebook Link</label>
                        <input type="text" name="facebook_link" placeholder="Enter Facebook Link " value="{{ $data->facebook_link ?? null }}" class="form-control" >
                        @csrf
                    </div>
                    <div class="col-lg-6">
                        <label>Linked Link</label>
                        <input type="text" name="linked_link" placeholder="Enter Linked Link " value="{{ $data->linked_link ?? null }}" class="form-control" >
                    </div>
                </div>
                <input type="hidden" name="edit_id" value="{{ $data->id ?? null }}">
                <div class="form-group row">
                    <div class="col-lg-6">
                        <label>Twitter Link</label>
                        <input type="text" name="twitter_link" placeholder="Enter Twitter Link " value="{{ $data->twitter_link ?? null }}" class="form-control" >
                    </div>
                    <div class="col-lg-6">
                        <label>Instagram Link</label>
                        <input type="text" name="instagram_link" placeholder="Enter Instagram Link " value="{{ $data->instagram_link ?? null }}" class="form-control" >
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
<script type="text/javascript">

    let conf = {
        rules: {
            facebook_link: {
             url: true,
            },
            twitter_link: {
                url: true,
            },
            instagram_link: {
                url: true,
            },
            linked_link: {
                url: true,
            }
        },
    };
    validationFormAndSubmit($('#seller-add-from'),conf);
</script>
@endpush
