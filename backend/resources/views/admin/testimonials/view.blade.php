@extends('admin.layouts.default')
@section('title', 'Testimonials')
@section('content')
    <!-- begin:: Subheader -->
    <div class="kt-subheader kt-grid__item" id="kt_subheader">
        <div class="kt-subheader__main">
            <h3 class="kt-subheader__title">Testimonials</h3>
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
                    <span class="kt-portlet__head-icon">
                        <i class="kt-font-brand flaticon-user-settings"></i>
                    </span>
                    <h3 class="kt-portlet__head-title">
                        Testimonials
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
                    <div class="kt-widget kt-widget--user-profile-3">
                        <div class="kt-widget__top">
                            <div class="kt-widget__media">
                                <img src="{{ $data->image_url }}" alt="image">
                            </div>
                            <div class="kt-widget__content">
                                <div class="kt-widget__head">
                                    <a class="kt-widget__username">
                                        {{ $data->name }}
                                    </a>
                                </div>

                                <div class="kt-widget__subhead">
                                    <b>Type :</b>
                                    {{ $data->type == 0 ? "Clients" : "Candidates" }}
                                </div>

                                @if ($data->designation)
                                    <div class="kt-widget__subhead">
                                        <b>Designation :</b>
                                        {{ $data->designation }}
                                    </div>
                                @endif

                                {{-- <div class="kt-widget__subhead">
                                <b>Rating :</b>
                                    @foreach (range(1, 5) as $i)
                                        <i class="fa {{ $i <= $data->rating ? 'fa-star' : 'fa-star-o' }} text-warning"></i>
                                    @endforeach
                            </div> --}}
                                <div class="kt-widget__subhead">
                                    <b>Message :</b>

                                    <div class="kt-widget__desc">
                                        {{ $data->message }}
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
