@extends('admin.layouts.default')
@section('title', 'Dashboard')
@section('content')
<!-- begin:: Content Head -->
<div class="kt-subheader   kt-grid__item" id="kt_subheader">
    <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">Dashboard</h3>
        <span class="kt-subheader__separator kt-subheader__separator--v"></span>
    </div>
</div>
<!-- end:: Content Head -->
<!-- begin:: Content -->
<div class="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">

    <div class="row">
        <div class="col-xl-4">
            <div
                class="kt-portlet kt-portlet--fit kt-portlet--head-lg kt-portlet--head-overlay kt-portlet--skin-solid kt-portlet--height-fluid">
                <div>
                    <div class="kt-portlet__head-label">
                        <h3 class="kt-portlet__head-title">

                        </h3>
                    </div>
                </div>
                <div class="kt-portlet__body kt-portlet__body--fit">
                    <div class="kt-widget17">
                        <div class="kt-widget17__visual kt-widget17__visual--chart kt-portlet-fit--top kt-portlet-fit--sides">
                            <div class="kt-widget17__chart" style="height:170px;">
                                <canvas id="kt_chart_activities"></canvas>
                            </div>
                        </div>
                        <div class="kt-widget17__stats">
                            <div class="kt-widget17__items">
                                <div class="kt-widget17__item">
                                    <a href="{{ route('admin.register.list') }}">
                                        <span class="kt-widget17__icon">
                                            <i class="fa fa-users"></i>
                                        </span>
                                        <span class="kt-widget17__subtitle">
                                            Users & Directory
                                        </span>
                                        <span class="kt-widget17__desc red-color">
                                            {{ $data['user_count'] }} Total Users & Directory
                                        </span>
                                    </a>
                                </div>
                                <div class="kt-widget17__item">
                                    <a href="{{ route('admin.categories.list') }}">
                                        <span class="kt-widget17__icon">
                                            <i class="fas fa-compress"></i>
                                        </span>
                                        <span class="kt-widget17__subtitle">
                                            Company
                                        </span>
                                        <span class="kt-widget17__desc red-color">
                                            {{ $data['company_count'] }} Total Company
                                        </span>
                                    </a>
                                </div>
                                <div class="kt-widget17__item">
                                    <a href="{{ route('admin.category.list') }}">
                                        <span class="kt-widget17__icon">
                                            <i class="fas fa-certificate"></i>
                                        </span>
                                        <span class="kt-widget17__subtitle">
                                            Product
                                        </span>
                                        <span class="kt-widget17__desc red-color">
                                            {{ $data['category_count'] }} Total Product
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div class="kt-widget17__items">
                                <div class="kt-widget17__item">
                                    <a href="{{ route('admin.home_requirment.list') }}">
                                        <span class="kt-widget17__icon">
                                            <i class="fas fa-subscript"></i>
                                        </span>
                                        <span class="kt-widget17__subtitle">
                                            Home Requirment
                                        </span>
                                        <span class="kt-widget17__desc red-color">
                                             {{ $data['home_requirment_count'] }} Total Home Requirment
                                        </span>
                                    </a>
                                </div>
                                <div class="kt-widget17__item">
                                    <a href="{{ route('admin.models.list') }}">
                                        <span class="kt-widget17__icon">
                                            <i class="fab fa-modx"></i>
                                        </span>
                                        <span class="kt-widget17__subtitle">
                                            Model
                                        </span>
                                        <span class="kt-widget17__desc red-color">
                                            {{ $data['models_count'] }} Total Model
                                        </span>
                                    </a>
                                </div>
                                <div class="kt-widget17__item">
                                    <a href="{{ route('admin.manufacturer.list') }}">
                                        <span class="kt-widget17__icon">
                                            <i class="fab fa-product-hunt"></i>
                                        </span>
                                        <span class="kt-widget17__subtitle">
                                            Manufacturer
                                        </span>
                                        <span class="kt-widget17__desc red-color">
                                            {{ $data['manufacturer_count'] }} Total Manufacturer
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div class="kt-widget17__items">
                                <div class="kt-widget17__item">
                                    <a href="{{ route('admin.buyer_requirment.list') }}">
                                        <span class="kt-widget17__icon">
                                            <i class="far fa-building"></i>
                                        </span>
                                        <span class="kt-widget17__subtitle">
                                            Buyer Requirment
                                        </span>
                                        <span class="kt-widget17__desc red-color">
                                            {{ $data['buyer_requirment_count'] }} Total Buyer Requirment
                                        </span>
                                    </a>
                                </div>
                                <div class="kt-widget17__item">
                                    <a href="{{ route('admin.seller_details.list') }}">
                                        <span class="kt-widget17__icon">
                                            <i class="fab fa-sellcast"></i>
                                        </span>
                                        <span class="kt-widget17__subtitle">
                                            Seller Requirment
                                        </span>
                                        <span class="kt-widget17__desc red-color">
                                            {{ $data['seller_details_count'] }} Total Seller Requirment
                                        </span>
                                    </a>
                                </div>
                                <div class="kt-widget17__item">
                                    <a href="{{ route('admin.contact.us.list') }}">
                                        <span class="kt-widget17__icon">
                                            <i class="fa fa-question-circle"></i>
                                        </span>
                                        <span class="kt-widget17__subtitle">
                                            User Inquiry
                                        </span>
                                        <span class="kt-widget17__desc red-color">
                                            {{ $data['user_inquiry_count'] }} Total User Inquiry
                                        </span>
                                    </a>
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
<script src="{{ asset('admin-asset/js/Chart.bundle.js') }}"></script>

<script>

</script>
@endpush
