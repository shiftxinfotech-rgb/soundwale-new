@extends('admin.layouts.default')
@section('title', 'Announcement')
@section('content')
    <!-- begin:: Subheader -->
    <div class="kt-subheader   kt-grid__item" id="kt_subheader">
        <div class="kt-subheader__main">
            <h3 class="kt-subheader__title">Announcement</h3>
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
                        <i class="kt-font-brand fa fa-user-tie"></i>
                    </span>
                    <h3 class="kt-portlet__head-title">
                        Announcement
                    </h3>
                </div>
                <div class="kt-portlet__head-toolbar">
                    <div class="kt-portlet__head-wrapper">
                        <a href="#" class="btn btn-clean btn-icon-sm">
                            <i class="la la-long-arrow-left"></i>
                            Back
                        </a>
                        &nbsp;
                        <div class="dropdown dropdown-inline">
                            <a href="{{ route('admin.leaders.add') }}" class="btn btn-brand btn-icon-sm">
                                <i class="flaticon2-plus"></i> Add New
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
                            <th>Image</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Actions</th>
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
                    data: 'image',
                    name: 'image',
                    orderable: false,
                    searchable: false,
                    render: function(data, type, row) {
                        return "<img src='" + row.image_url +
                            "' class='h-auto img-thumbnail'  style='width: 50px !important;'>"
                    }
                },
                {
                    data: 'title',
                    name: 'title',
                },
                {
                    data: 'status',
                    name: 'status',
                    orderable: false,
                    searchable: false,
                    sClass: 'text-center',
                    render: function(data, type, row) {
                        var checked = (row.status == 1) ? 'checked' : '';
                        return '<span class="kt-switch kt-switch--outline kt-switch--icon kt-switch--success">' +
                            '<label>' +
                            '<input type="checkbox" class="amenities-status-switch" ' + checked +
                            '  value="1" data-id="' + row.id + '">' +
                            '<span></span>' +
                            '</label>' +
                            '</span>'
                    }
                },
                {
                    data: 'action',
                    name: 'action',
                    orderable: false,
                    serachable: false,
                    sClass: 'text-center'
                },
            ],
            stateSave: true,
        };
        makeDataTable('#amenities_list_table', "{{ route('admin.leaders.list') }}", conf);

        function updateStatus(newStatus, checkbox, recordId) {
            var checkbox = checkbox;
            $.ajax({
                url: "{{ route('admin.leaders.status.change') }}",
                type: 'POST',
                data: {
                    id: recordId,
                    status: newStatus
                },
                dataType: 'json',
                beforeSend: function() {
                    swal.fire({
                        title: 'Please Wait..!',
                        text: 'Is working..',
                        onOpen: function() {
                            swal.showLoading()
                        }
                    })
                },
                success: function(data) {
                    swal.fire(
                        'Changed!',
                        data.message,
                        'success'
                    )
                    checkbox.prop('checked', newStatus);
                },
                complete: function() {
                    swal.hideLoading();
                },
                error: function(errorData) {
                    checkbox.prop('checked', !newStatus);
                    swal.hideLoading();
                    console.log(errorData);
                    // printErrorMsg(errorData, null);
                }
            });
        }

        $('table').on('change', '.amenities-status-switch', function() {
            var newStatus = $(this).prop('checked');
            updateStatus(newStatus, $(this), $(this).data('id'));
        });
    </script>
@endpush
