@extends('admin.layouts.default')
@section('title', 'SEO Managers')
@section('content')
    <!-- begin:: Subheader -->
    <div class="kt-subheader   kt-grid__item" id="kt_subheader">
        <div class="kt-subheader__main">
            <h3 class="kt-subheader__title">SEO Managers</h3>
            <span class="kt-subheader__separator kt-hidden"></span>
            <div class="kt-subheader__breadcrumbs"></div>
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
                        <i class="kt-font-brand fa fa-cogs"></i>
                    </span>
                    <h3 class="kt-portlet__head-title">
                        SEO Managers
                    </h3>
                </div>
                <div class="kt-portlet__head-toolbar">
                    <div class="kt-portlet__head-wrapper">
                        <div class="kt-portlet__head-actions">
                            <a href="#" class="btn btn-clean btn-icon-sm">
                                <i class="la la-long-arrow-left"></i>
                                Back
                            </a>
                            &nbsp;
                            <a href="{{ route('admin.seo.managers.add') }}" class="btn btn-brand btn-elevate btn-icon-sm"
                                id="add-service-form-modal">
                                <i class="la la-plus"></i>
                                Add New
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <!--begin::Portlet-->
            <!--end::Portlet-->
            <div class="kt-portlet__body">
                <!--begin: Datatable -->
                <table class="table table-striped table-hover" id="amenities_list_table">
                    <thead>
                        <tr>
                            <th>Seo Menu</th>
                            <th>Seo Title</th>
                            <th>Meta keyword</th>
                            <th style="width: 150px">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                <!--end: Datatable -->
            </div>
        </div>
    </div>
    <!-- end:: Content -->

@endsection

@push('script')
    <script>
        let conf = {
            columns: [{
                    data: 'menu',
                    name: 'menu'
                },
                {
                    data: 'seo_title',
                    name: 'seo_title'
                },
                {
                    data: 'meta_keyword',
                    name: 'meta_keyword'
                },
                {
                    data: 'action',
                    name: 'action',
                    orderable: false,
                    serachable: false,
                    sClass: 'text-center'
                },
            ]
        };
        makeDataTable('#amenities_list_table', "{{ route('admin.seo.managers.list') }}", conf);
    </script>
@endpush
