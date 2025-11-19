@extends('admin.layouts.default')
@section('title', 'Sellar Details')
@section('content')
<!-- begin:: Subheader -->
<div class="kt-subheader kt-grid__item" id="kt_subheader">
    <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">Sellar Details</h3>
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
                    Sellar Details
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

        <div class="kt-portlet__body">
            <div class="row">
                <div class="col-lg-6">
                    <label><strong>User:</strong></label>
                    <p>{{ $data->register->name ?? 'N/A' }}</p>
                </div>
                <div class="col-lg-6">
                    <label><strong>Product Type:</strong></label>
                    <p>{{ $data->requirment->name ?? 'N/A' }}</p>
                </div>
                <div class="col-lg-6">
                    <label><strong>Product:</strong></label>
                    <p>{{ $data->category->name ?? 'N/A' }}</p>
                </div>
                <div class="col-lg-6">
                    <label><strong>Sub Product:</strong></label>
                    <p>{{ $data->sub_category->name ?? 'N/A' }}</p>
                </div>
                <div class="col-lg-6">
                    <label><strong>Company:</strong></label>
                    <p>{{ $data->categories->name ?? 'N/A' }}</p>
                </div>
                <div class="col-lg-6">
                    <label><strong>Who Can See This Post?:</strong></label>
                    <p>N/A</p>
                </div>
                <div class="col-lg-6">
                    <label><strong>Type Of Manufacturer:</strong></label>
                    <p>N/A</p>
                </div>
                <div class="col-lg-6">
                    <label><strong>Price:</strong></label>
                    <p>{{ $data->price ?? 'N/A' }}</p>
                </div>
                <div class="col-lg-6">
                    <label><strong>Country:</strong></label>
                    <p>{{ $data->country->country_name ?? 'N/A' }}</p>
                </div>
                <div class="col-lg-6">
                    <label><strong>State:</strong></label>
                    <p>{{ $data->states->state_name ?? 'N/A' }}</p>
                </div>
                <div class="col-lg-6">
                    <label><strong>City:</strong></label>
                    <p>{{ $data->cities->city_name ?? 'N/A' }}</p>
                </div>
                <div class="col-lg-12">
                    <label><strong>Product Details:</strong></label>
                    <p>{{ $data->description ?? 'N/A' }}</p>
                </div>
            </div>
        </div>
        <div class="kt-form kt-form--label-right">
            <div class="kt-portlet__body">
                <div class="kt-widget kt-widget--user-profile-3">
                    <div class="kt-widget__top">
                        <div class="kt-widget__media">
                            <div class="media-item">
                                <div class="row">
                                    <label><strong>Image:</strong></label>
                                    @foreach($images_data as $images_data_row)
                                    <div class="col-lg-4">
                                        <a href="{{ $images_data_row->image_url }}" target="_blank">
                                            <img src="{{ $images_data_row->image_url }}" alt="Image">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        </a>
                                    </div>
                                    @endforeach
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
