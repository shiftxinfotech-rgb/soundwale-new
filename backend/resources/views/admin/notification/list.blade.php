@extends('admin.layouts.default')
@section('title', 'Notification')
@section('content')
<!-- begin:: Subheader -->
<div class="kt-subheader   kt-grid__item" id="kt_subheader">
    <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">Notification</h3>
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
                <!-- <span class="kt-portlet__head-icon">
                    <i class="kt-font-brand flaticon2-user"></i>
                </span>
                <h3 class="kt-portlet__head-title">
                    FAQ
                </h3> -->
            </div>
            <div class="kt-portlet__head-toolbar">
                    <div class="kt-portlet__head-wrapper">
                    <div class="kt-portlet__head-actions">
                        &nbsp;
                        <button href="{{ route('admin.notification.read.all') }}" data-title='Read all notification?' data-text='Are you sure you want to read all notification?' class="mark-all-read btn btn-brand btn-elevate btn-icon-sm de">
                            Mark all as read
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!--begin::Portlet-->
            <!--end::Portlet-->
        <div class="kt-portlet__body">
            <!--begin: Datatable -->
            <table class="table table-striped table-hover" id="faq_list_table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Time</th>
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
                {
                    data: 'title',
                    name: 'title',
                    render:function(data,type,row){
                        // return '<a href="'+'{{route('admin.notification.redirect','')}}/'+row.id+'"> '+data+' </a>'
                        var routeTemplate = '{{ route('admin.notification.redirect', '') }}/';
                       
                        var linkUrl = routeTemplate + row.id;
                       
                        var anchor = document.createElement('a');
                        anchor.href = linkUrl;
                        anchor.innerHTML = data;
                        
                        if (!row.read ) {
                            var badge = document.createElement('span');
                            badge.className = 'kt-badge kt-badge--brand kt-badge--inline kt-badge--pill kt-badge--rounded ml-2';
                            badge.innerHTML = 'new';
                            anchor.appendChild(badge);
                        }
                        return anchor.outerHTML;
                    }

                },
                {data: 'created_at', name: 'created_at'},
                {data: 'action', name: 'action', orderable:false, searchable:false, sClass:'text-center'},
            ]
        };
        var datatable = makeDataTable('#faq_list_table', "{{ route('admin.notification.list') }}", conf);

        $('button.mark-all-read').on('click', function () {
            event.preventDefault();
            let self = $(this);
            let data = $(this).data();
            var tag_id = self.attr('data-id');
            
            if(tag_id == ''){
                swal.fire({
                    title: 'Something went wrong, try again later',
                    type: 'error',
                    animation: false,
                    customClass: 'animated tada'
                })
                return false;
            }
            swal.fire({
                title: data?.title ? data?.title : 'Are you sure?',
                text: data?.text ? data?.text : "Are you sure you want to proceed ? ",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes'
                
            }).then(function(result) { 
                if (result.value) {
                    $.ajax({
                        url : self.attr('href'),
                        type : 'POST',
                        data : {id:tag_id },
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
                            // console.log(data);
                            swal.fire(
                                'Success!',
                                data.message,
                                'success'
                            )
                            // $('.check-all').prop("checked", false).change();    
                            datatable.draw();
                            $('#notificationBadgeCount').html('0');
                        },
                        complete: function() {
                            swal.hideLoading();
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            swal.hideLoading();
                            swal.fire("!Opps ", "Something went wrong, try again later", "error");
                        }
                    });
                }
            });
        });
    </script>
    
@endpush