@extends('admin.layouts.default')
@section('title', 'Recent Activities')
@section('content')
<!-- begin:: Subheader -->
<div class="kt-subheader   kt-grid__item" id="kt_subheader">
    <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">Recent Activities</h3>
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
                    <i class="kt-font-brand fa fa-briefcase"></i>
                </span>
                <h3 class="kt-portlet__head-title">
                    Recent Activities
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
                    </div>
                </div>
            </div>
        </div>

        <div class="kt-portlet__body">
            <table class="table table-striped table-hover" id="contact_us_list_table">
                <thead>
                    <tr>
                        <th>IP Address</th>
                        {{-- <th>Email</th> --}}
                        {{-- <th>Phone Number</th> --}}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
</div>

@endsection

@push('script')
    <script>

        let conf = {
            columns: [
                {data: 'ip_address', name: 'ip_address'},
                {data: 'action', name: 'action', orderable:false, serachable:false, sClass:'text-center'},
            ]
        };
        makeDataTable('#contact_us_list_table', "{{ route('admin.activity.log.list') }}", conf)
    </script>

@endpush
