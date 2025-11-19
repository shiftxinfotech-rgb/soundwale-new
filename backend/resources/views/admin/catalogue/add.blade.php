@extends('admin.layouts.default')
@section('title', 'Catalogue')
@section('content')
<!-- begin:: Subheader -->
<div class="kt-subheader   kt-grid__item" id="kt_subheader">
    <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">Catalogue</h3>
        <span class="kt-subheader__separator kt-hidden"></span>
        <div class="kt-subheader__breadcrumbs">
            <span class="kt-subheader__breadcrumbs-separator"></span>
            <a href="{{ route('admin.catalogue.list') }}" class="kt-subheader__breadcrumbs-link" title="Back">List</a>
            <span class="kt-subheader__breadcrumbs-separator"></span>
            <a href="javascript:;" class="kt-subheader__breadcrumbs-link"
               title="Back">{{ $data ? 'Edit' : 'Add' }}</a>
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
                    {{ $data ? 'Edit' : 'Add' }} Catalogue
                </h3>
            </div>
        </div>
        <!--begin::Portlet-->
        <!--begin::Form-->
        <form class="kt-form" action="{{ route('admin.catalogue.store') }}" id="user-add-from" method="post"
              isReload="{{ route('admin.catalogue.list') }}" enctype="multipart/form-data">
            @csrf
            <input type="hidden" name="edit_id" value="{{ $data->id ?? null }}">
            <input type="hidden" name="status" value="{{ $data->status ?? '1' }}">
            <div class="kt-portlet__body">
                <div class="form-group row">
                    <div class="col-lg-6">
                        <label>Catalogue Name<span class="text-danger">*</span></label>
                        <input type="text" name="name" id="name" placeholder="Enter Catalogue Name" value="{{ $data->name ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-6">
                        <label>User: <span class="text-danger">*</span></label>
                        <select id="user_id" name="user_id" class="form-control">
                            <option value="">Select User</option>
                            @foreach($register as $register_row)
                            <option value="{{ $register_row->id }}"
                                    @if(isset($data) && $data->user_id == $register_row->id) selected @endif>
                                    {{ $register_row->name }}
                            </option>
                            @endforeach
                        </select>
                    </div>
                </div>
                
                <div class="form-group row">
                    <div class="col-lg-6">
                        <label>Other Details</label>
                        <input type="text" name="other_details" id="other_details" placeholder="Enter Other Details" value="{{ $data->other_details ?? null }}" class="form-control">
                    </div>
                    <div class="form-group col-lg-6">
                        <label>Pdf </label>
                        <div class="custom-file">
                            <input type="file" name="image" class="custom-file-input" id="userImage3"
                                        accept="application/pdf">
                                    <label class="custom-file-label text-truncate" for="userImage3">Choose file</label>
                                    @if ($data && $data->image)
                                        <a href="{{ $data->image_url }}" target="_blank">View Pdf</a>
                                    @endif
                        </div>
                    </div>
                </div>
                <div class="kt-portlet__foot">
                    <div class="kt-form__actions">
                        <button type="submit" class="btn btn-brand">Save</button>
                        <button type="button" class="btn btn-secondary" onclick="window.history.back()">Cancel</button>

                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
@endsection
@push('script')
<script type="text/javascript">
    let conf = {
    rules: {
    image: {
    required: {{ $data ? 'false' : true }},
    },
            name: {
            required: true,
            },
            user_id: {
            required: true,
            },
            other_details: {
            required: true,
            },
    },
    };
    validationFormAndSubmit($('#user-add-from'), conf);


</script>
@endpush
