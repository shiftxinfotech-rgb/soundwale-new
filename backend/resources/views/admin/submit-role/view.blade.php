@extends('admin.layouts.default')
@section('title', 'Submit Role')
@section('content')
    <!-- begin:: Subheader -->
    <div class="kt-subheader   kt-grid__item" id="kt_subheader">
        <div class="kt-subheader__main">
            <h3 class="kt-subheader__title">Submit Role</h3>
            <span class="kt-subheader__separator kt-hidden"></span>
            <div class="kt-subheader__breadcrumbs">
                <span class="kt-subheader__breadcrumbs-separator"></span>
                <a href="{{ route('admin.submit.role.list') }}" class="kt-subheader__breadcrumbs-link" title="Back">List</a>
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
                        {{ $data ? 'View' : 'Add' }} Submit Role
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
                        <label class="col-4 col-form-label">Job Title :</label>
                        <div class="col-8">
                            <span class="form-control-plaintext">{{ $data->job }}</span>
                        </div>
                    </div>

                    <div class="form-group form-group-xs row">
                        <label class="col-4 col-form-label">Hires :</label>
                        <div class="col-8">
                            <span class="form-control-plaintext">{{ $data->hires }}</span>
                        </div>
                    </div>

                    <div class="form-group form-group-xs row">
                        <label class="col-4 col-form-label">Job Description :</label>
                        <div class="col-8">
                            <span class="form-control-plaintext">{{ $data->job_description	 }}</span>
                        </div>
                    </div>

                    <div class="form-group form-group-xs row">
                        <label class="col-4 col-form-label">Time :</label>
                        <div class="col-8">
                            <span class="form-control-plaintext">{{ $data->time  }}</span>
                        </div>
                    </div>


                    <div class="form-group form-group-xs row">
                        <label class="col-4 col-form-label">Location :</label>
                        <div class="col-8">
                            <span class="form-control-plaintext">
                                {{ $data->location }}
                            </span>
                        </div>
                    </div>

                    <div class="form-group form-group-xs row">
                        <label class="col-4 col-form-label">Salary : </label>
                        <div class="col-8">
                            <span class="form-control-plaintext">{{ $data->salary }}</span>
                        </div>
                    </div>

                    <div class="form-group form-group-xs row">
                        <label class="col-4 col-form-label">Start Date :</label>
                        <div class="col-8">
                            <span class="form-control-plaintext">{{ $data->start_date }}</span>
                        </div>
                    </div>

                    <div class="form-group form-group-xs row">
                        <label class="col-4 col-form-label">Name :</label>
                        <div class="col-8">
                            <span class="form-control-plaintext">{{ $data->name }}</span>
                        </div>
                    </div>

                    <div class="form-group form-group-xs row">
                        <label class="col-4 col-form-label">Business :</label>
                        <div class="col-8">
                            <span class="form-control-plaintext">{{ $data->business }}</span>
                        </div>
                    </div>

                    <div class="form-group form-group-xs row">
                        <label class="col-4 col-form-label">Email :</label>
                        <div class="col-8">
                            <span class="form-control-plaintext"> <a
                                    href="mailto:{{ $data->email }}">{{ $data->email }}</a>
                            </span>
                        </div>
                    </div>

                    <div class="form-group form-group-xs row">
                        <label class="col-4 col-form-label">Phone Number :</label>
                        <div class="col-8">
                            <span class="form-control-plaintext">{{ $data->phone_number }}</span>
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
