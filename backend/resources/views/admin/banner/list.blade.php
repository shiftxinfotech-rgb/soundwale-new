@extends('admin.layouts.default')
@section('title', 'Banners')
@section('content')
<!-- begin:: Subheader -->
<div class="kt-subheader   kt-grid__item" id="kt_subheader">
    <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">Banners</h3>
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
                <!-- <span class="kt-portlet__head-icon">
                    <i class="kt-font-brand flaticon2-user"></i>
                </span>
                <h3 class="kt-portlet__head-title">
                    Banners
                </h3> -->
            </div>
            <div class="kt-portlet__head-toolbar">
                    <div class="kt-portlet__head-wrapper">
                    <div class="kt-portlet__head-actions">
                        &nbsp;
                        <a href="{{ route('admin.banners.add') }}" class="btn btn-brand btn-elevate btn-icon-sm" id="add-service-form-modal">
                            <i class="la la-plus"></i>
                            New add
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <!--begin::Portlet-->
            <!--end::Portlet-->
        <div class="kt-portlet__body">
            <!--begin: Datatable -->
            <table class="table table-striped table-hover" id="home_slider_list_table">
                <thead>
                    <tr>
                        <th>Page</th>
                        <th>Title</th>
                        <th>Image</th>
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
            columns: [
                {data: 'page', name: 'page'},
                {data: 'title', name: 'title'},
                {data: 'image', name: 'image', orderable:false, searchable:false,
                    render:function(data,type,row){
                        return "<img src='"+row.image_url+"' class='h-auto img-thumbnail'  style='width: 50px !important;'>"
                    }
                },
                {data: 'action', name: 'action', orderable:false, searchable:false, sClass:'text-center'},
            ]
        };
        makeDataTable('#home_slider_list_table', "{{ route('admin.banners.list') }}", conf);

        function updateStatus(newStatus,checkbox,recordId) {
            var checkbox = checkbox;
            $.ajax({
                url : "{{ route('admin.banners.status.change') }}",
                type : 'POST',
                data : {id:recordId, status:newStatus },
                dataType:'json',
                beforeSend: function() {
                    swal.fire({
                        title: 'Please Wait..!',
                        text: 'Is working..',
                        onOpen: function() {
                            swal.showLoading()
                        }
                    })
                },
                success : function(data) {
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

        $('table').on('change','.home-slider-status-switch', function () {
            var newStatus = $(this).prop('checked');
            updateStatus(newStatus,$(this),$(this).data('id'));
        });
    </script>

@endpush
