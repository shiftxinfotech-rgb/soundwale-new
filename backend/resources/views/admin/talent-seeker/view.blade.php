@extends('admin.layouts.default')
@section('title', 'Hiring Talent')
@section('content')
<!-- begin:: Subheader -->
<div class="kt-subheader   kt-grid__item" id="kt_subheader">
    <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">Hiring Talent</h3>
        <span class="kt-subheader__separator kt-hidden"></span>
        <div class="kt-subheader__breadcrumbs">
            <span class="kt-subheader__breadcrumbs-separator"></span>
            <a href="{{ route('admin.talent.seeker.list') }}" class="kt-subheader__breadcrumbs-link" title="Back">List</a>
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
                    {{ $data ? 'View' : 'Add' }} Hiring Talent
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


                <!-- Add more fields as needed -->
                <div class="form-group form-group-xs row">
                    <label class="col-4 col-form-label">Name:</label>
                    <div class="col-8">
                        <span class="form-control-plaintext">{{ $data->name }}</span>
                    </div>
                </div>

                <div class="form-group form-group-xs row">
                    <label class="col-4 col-form-label">Designation :</label>
                    <div class="col-8">
                        <span class="form-control-plaintext">{{ $data->designation }}</span>
                    </div>
                </div>

                <div class="form-group form-group-xs row">
                    <label class="col-4 col-form-label">Company Name  :</label>
                    <div class="col-8">
                        <span class="form-control-plaintext">{{ $data->company_name }}</span>
                    </div>
                </div>

                <div class="form-group form-group-xs row">
                    <label class="col-4 col-form-label">Phone Number :</label>
                    <div class="col-8">
                        <span class="form-control-plaintext">{{ $data->mobile_no }}</span>
                    </div>
                </div>


                <div class="form-group form-group-xs row">
                    <label class="col-4 col-form-label">Work Email :</label>
                    <div class="col-8">
                        <span class="form-control-plaintext kt-font-bolder">
                            <a href="mailto:{{ $data->work_email }}">{{ $data->work_email }}</a>
                        </span>
                    </div>
                </div>

                <div class="form-group form-group-xs row">
                    <label class="col-4 col-form-label">Skype : </label>
                    <div class="col-8">
                        <span class="form-control-plaintext">{{ $data->skype }}</span>
                    </div>
                </div>

                <div class="form-group form-group-xs row">
                    <label class="col-4 col-form-label">Company Website :</label>
                    <div class="col-8">
                        <span class="form-control-plaintext"><a href="{{ $data->company_website }}" target="_blank">{{ $data->company_website }}</a></span>
                    </div>
                </div>

                <div class="form-group form-group-xs row">
                    <label class="col-4 col-form-label">City  :</label>
                    <div class="col-8">
                        <span class="form-control-plaintext">{{ $data->city }}</span>
                    </div>
                </div>

                <div class="form-group form-group-xs row">
                    <label class="col-4 col-form-label">Job Description :</label>
                    <div class="col-8">
                        <span class="form-control-plaintext">{{ $data->job_description }}</span>
                    </div>
                </div>

            </div>
            <div class="kt-portlet__foot">
                {{-- <div class="kt-form__actions kt-space-between">
                    <a href="#" class="btn btn-label-brand btn-sm btn-bold">Manage company</a>
                    <a href="#" class="btn btn-clean btn-sm btn-bold">Learn more</a>
                </div> --}}
            </div>
        </div>
    </div>
    </div>


    </div>
</div>
@endsection
