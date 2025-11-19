@extends('admin.layouts.default')
@section('title', 'Apply Job')
@section('content')
<!-- begin:: Subheader -->
<div class="kt-subheader   kt-grid__item" id="kt_subheader">
    <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">Apply Job</h3>
        <span class="kt-subheader__separator kt-hidden"></span>
        <div class="kt-subheader__breadcrumbs">
            <span class="kt-subheader__breadcrumbs-separator"></span>
            <a href="{{ route('admin.apply.job.list') }}" class="kt-subheader__breadcrumbs-link" title="Back">List</a>
            <span class="kt-subheader__breadcrumbs-separator"></span>
            <a href="javascript:;" class="kt-subheader__breadcrumbs-link" title="Back">View</a>
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
                    {{ $data ? 'View' : 'Add' }} Apply Job
                </h3>
            </div>
            <div class="kt-portlet__head-toolbar">
                <div class="kt-portlet__head-wrapper">
                    <a onclick="window.history.back()"class="btn btn-clean btn-icon-sm">
                        <i class="la la-long-arrow-left"></i>
                        Back
                    </a>

                </div>
            </div>

        </div>
        <!--begin::Portlet-->
        <div class="kt-form kt-form--label-right">
            <div class="kt-portlet__body">
                <div class="form-group form-group-xs row">
                    <label class="col-4 col-form-label">Job Name :</label>
                    <div class="col-8">
                        <span class="form-control-plaintext kt-font-bolder">{{ $data->job_name }}</span>
                    </div>
                </div>
                <div class="form-group form-group-xs row">
                    <label class="col-4 col-form-label">Name :</label>
                    <div class="col-8">
                        <span class="form-control-plaintext kt-font-bolder">{{ $data->name }}</span>
                    </div>
                </div>

                <div class="form-group form-group-xs row">
                    <label class="col-4 col-form-label">Phone Number :</label>
                    <div class="col-8">
                        <span class="form-control-plaintext">{{ $data->country_code }} {{ $data->phone_number }}</span>
                    </div>
                </div>
                <div class="form-group form-group-xs row">
                    <label class="col-4 col-form-label">Email :</label>
                    <div class="col-8">
                        <span class="form-control-plaintext kt-font-bolder">
                            <a href="mailto:{{ $data->email }}">{{ $data->email }}</a>
                        </span>
                    </div>
                </div>

                <div class="form-group form-group-xs row">
                    <label class="col-4 col-form-label">Resume :</label>
                    <div class="col-md-8">
                        <span class="form-control-plaintext kt-font-bolder"><a href="{{$data->image_url}}" target="blank">View Resume</a></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>


    </div>
</div>
@endsection
