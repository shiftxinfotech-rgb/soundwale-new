@extends('admin.layouts.default')
@section('title', 'Leads')
@section('content')
    @php
        use Carbon\Carbon;
    @endphp
    <!-- begin:: Subheader -->
    <div class="kt-subheader kt-grid__item" id="kt_subheader">
        <div class="kt-subheader__main">
            <h3 class="kt-subheader__title">Leads</h3>
            <div class="kt-subheader__breadcrumbs">
                <a href="javascript:history.back()" class="kt-subheader__breadcrumbs-link" title="Back">List</a>
                <span class="kt-subheader__breadcrumbs-separator"></span>
                <a href="javascript:;" class="kt-subheader__breadcrumbs-link" title="Back">View</a>
            </div>
        </div>
    </div>
    <!-- end:: Subheader -->
    <!-- begin:: Content -->
    <div class="kt-content kt-grid__item kt-grid__item--fluid" id="kt_content">
        @include('admin.layouts.flash-message')
        <div class="kt-portlet kt-portlet--mobile">
            <div class="kt-portlet__head kt-portlet__head--lg">
                <div class="kt-portlet__head-label">
                    <div>
                        <h3 class="kt-portlet__head-title"><span class="kt-portlet__head-icon">
                                <i class="kt-font-brand flaticon-user-settings"></i>
                            </span>
                            {{ $data->title }}
                        </h3>
                    </div>
                </div>
                <div class="kt-portlet__head-toolbar">
                    <div>
                        <h6 class="kt-portlet__head-title"><span class="kt-portlet__head-icon">
                                <i class="kt-font-brand fa fa-calendar"></i>
                            </span>
                            {{ Carbon::parse($data->created_at)->format('d M, Y H:i A') }}
                        </h6>
                    </div>
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
                    <div class="kt-widget kt-widget--user-profile-3">
                        <div class="kt-widget__top">

                            <div class="kt-widget__content">

                                <div class="kt-widget__subhead">
                                    <b>Location :</b>
                                    {{ $data->location }}
                                </div>

                                <div class="kt-widget__subhead">
                                    <b>Salary :</b>
                                    {{ $data->salary }}
                                </div>
                                <div class="kt-widget__subhead">
                                    <b>Experience Need  :</b>
                                    {{ $data->sub_title }}
                                </div>
                                <div class="kt-widget__subhead">
                                    <b>Job Description :</b>
                                    <div class="kt-widget__desc">
                                    {!! $data->content !!}
                                    </div>
                                </div>
                                <div class="kt-widget__subhead">
                                    <b>Responsibilities :</b>
                                    <div class="kt-widget__desc">
                                        {!! $data->short_content !!}
                                    </div>
                                </div>
                                <div class="kt-widget__subhead">
                                    <b>Advantages :</b>
                                    <div class="kt-widget__desc">
                                        {!! $data->work_type !!}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
@push('script')
@endpush
