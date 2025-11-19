@extends('admin.layouts.default')
@section('title', 'Edit Role')
@section('content')
<!-- begin:: Subheader -->
<div class="kt-subheader   kt-grid__item" id="kt_subheader">
    <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">Edit Role</h3>
        <span class="kt-subheader__separator kt-hidden"></span>
        <div class="kt-subheader__breadcrumbs">
            <a href="{{ route('admin.roles.index') }}" class="kt-subheader__breadcrumbs-home"><i class="fa fa-arrow-left"></i></a>
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
                    <i class="kt-font-brand flaticon-user-settings"></i>
                </span>
                <h3 class="kt-portlet__head-title">
                    Edit Role
                </h3>
            </div>
        </div>
        <!--begin::Portlet-->
        <!--begin::Form-->
        <form class="kt-form"  action="{{ route('admin.roles.update', $role->id) }}" enctype="multipart/form-data" method="post" >
            @method('PUT')
            <div class="kt-portlet__body">
                <div class="form-group row">
                    <div class="col-lg-6">
                        <label>Name:<span class="text-danger">*</span></label>
                        <input type="text" name="name" placeholder="Enter name" class="form-control" value="{{ $role->name }}">
                        @csrf
                    </div>
                    <div class="col-lg-6">
                        <label>Permission:<span class="text-danger">*</span></label>
                        <div class="select-custom">
                            <select class="form-control select-nice" name="permissions[]" multiple>
                                @foreach($permissions as $permission)
                                    <option value="{{ $permission->id }}" @if(in_array($permission->id, $rolePermissions) ) selected @endif> {{ $permission->name }} </option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                </div>
                <div class="kt-portlet__foot">
                    <div class="kt-form__actions">
                        <button type="submit" class="btn btn-primary">Update</button>
                    </div>
                </div>
            </div>
        </form>
        <!--end::Form-->
    </div>
</div>
@endsection
