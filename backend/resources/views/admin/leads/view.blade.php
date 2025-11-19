@extends('admin.layouts.default')
@section('title', 'Leads')
@section('content')
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
                <span class="kt-portlet__head-icon">
                    <i class="kt-font-brand flaticon-user-settings"></i>
                </span>
                <h3 class="kt-portlet__head-title">
                    Leads
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
                    <p>{{ $data->register->first_name ?? 'N/A' }}</p>
                </div>
                <div class="col-lg-6">
                    <label><strong>City:</strong></label>
                    <p>{{ $data->cities->name ?? 'N/A' }}</p>
                </div>
                <div class="col-lg-6">
                    <label><strong>Main Categories:</strong></label>
                    <p>{{ $data->categories->name ?? 'N/A' }}</p>
                </div>
                <div class="col-lg-6">
                    <label><strong>Category:</strong></label>
                    <p>{{ $data->category->name ?? 'N/A' }}</p>
                </div>
                <div class="col-lg-6">
                    <label><strong>Sub Category:</strong></label>
                    <p>{{ $data->sub_category->name ?? 'N/A' }}</p>
                </div>
                <div class="col-lg-6">
                    <label><strong>Unit:</strong></label>
                    <p>{{ $data->unit->name ?? 'N/A' }}</p>
                </div>
                <div class="col-lg-6">
                    <label><strong>Grade:</strong></label>
                    <p>{{ $data->grade->name ?? 'N/A' }}</p>
                </div>
                <div class="col-lg-6">
                    <label><strong>Requirment Type:</strong></label>
                    <p>{{ $data->requirment->name ?? 'N/A' }}</p>
                </div>
                <div class="col-lg-6">
                    <label><strong>Surface Type:</strong></label>
                    <p>{{ $data->surface->name ?? 'N/A' }}</p>
                </div>
                <div class="col-lg-6">
                    <label><strong>quantity:</strong></label>
                    <p>{{ $data->quantity ?? 'N/A' }}</p>
                </div>
                <div class="col-lg-12">
                    <label><strong>Description:</strong></label>
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
                                <label><strong>Image:</strong></label>
                                @if ($data->image)
                                <div>
                                    <a href="{{ $data->image_url }}" target="_blank">
                                        <img src="{{ $data->image_url }}" alt="Image">
                                    </a>
                                </div>
                                @endif
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
