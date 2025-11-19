@extends('admin.layouts.default')
@section('title', 'Roles management')
@section('content')
<!-- begin:: Subheader -->
<div class="kt-subheader   kt-grid__item" id="kt_subheader">
    <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">Roles management</h3>
        <span class="kt-subheader__separator kt-hidden"></span>
        <div class="kt-subheader__breadcrumbs">
            <a href="{{ route('admin.home') }}" class="kt-subheader__breadcrumbs-home"><i class="fa fa-arrow-left"></i></a>
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
                    <i class="kt-font-brand flaticon2-user"></i>
                </span>
                <h3 class="kt-portlet__head-title">
                    Roles management
                </h3>
            </div>
            <div class="kt-portlet__head-toolbar">
                    <div class="kt-portlet__head-wrapper">
                    <div class="kt-portlet__head-actions">
                        &nbsp;
                        @can('role-create')
                            <a href="{{ route('admin.roles.create') }}" class="btn btn-brand btn-elevate btn-icon-sm" id="add-service-form-modal">
                                <i class="la la-plus"></i>
                                New Role
                            </a>
                        @endcan
                    </div>
                </div>
            </div>
        </div>
        <!--begin::Portlet-->
            <!--end::Portlet-->
        <div class="kt-portlet__body">
            <!--begin: Datatable -->
            <table class="table table-hover">
                <thead class="thead-light">
                    <tr>
                        <th>Name</th>
                        <th>Action</th>
                      </tr>
                </thead>
                <tbody>
                    @foreach ($roles as $key => $role)
                        <tr>
                            <td>{{ $role->name }}</td>
                            <td>
                            <a class="btn btn-icon btn-outline-info btn-sm" data-container="body" data-toggle="kt-tooltip" data-placement="top" title="" data-original-title="Show detail" href="{{ route('admin.roles.show',$role->id) }}"><i class="la la-info"></i></a>
                            @can('role-edit')
                                <a class="btn btn-icon btn-outline-brand btn-sm" href="{{ route('admin.roles.edit',$role->id) }}"><i class="la la-edit"></i></a>
                            @endcan
                            @can('role-delete')
                                <form action="{{route('admin.roles.destroy',$role->id)}}" style="display:inline" method="post" >
                                    @csrf
                                    <input type="hidden" name="_method" value="DELETE">
                                    <button type="submit" class="btn btn-icon btn-outline-danger btn-sm delete-role-admin" ><i class="la la-trash"></i></button>
                                </form>
                            @endcan
                            </td>
                        </tr>
                        @endforeach
                </tbody>
            </table>
            <div class="d-flex justify-content-end kt-pagination kt-pagination--info">
                    {!! $roles->links() !!}
            </div>
        </div>
    </div>
</div>  
<!-- end:: Content -->
@endsection
@push('script')
    <script>

        $('.delete-role-admin').on('click', function () {
            event.preventDefault(); 
            var form = $(this).parent('form');
            swal.fire({
                title: 'Are you sure?',
                text: "Are you sure you want to proceed ? ",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes'
            }).then(function(isConfirm) { 
                if(isConfirm.value){
                    form.submit();
                    return true;
                }else{
                    return false;
                }
            });
        });
    </script>
@endpush