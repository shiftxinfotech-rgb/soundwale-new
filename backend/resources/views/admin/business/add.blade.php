@extends('admin.layouts.default')
@section('title', 'Business')
@section('content')
<!-- begin:: Subheader -->
<div class="kt-subheader   kt-grid__item" id="kt_subheader">
    <div class="kt-subheader__main">
        <h3 class="kt-subheader__title">Business</h3>
        <span class="kt-subheader__separator kt-hidden"></span>
        <div class="kt-subheader__breadcrumbs">
            <span class="kt-subheader__breadcrumbs-separator"></span>
            <a href="{{ route('admin.business.list') }}" class="kt-subheader__breadcrumbs-link" title="Back">List</a>
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
                    {{ $data ? 'Edit' : 'Add' }} Business
                </h3>
            </div>
        </div>
        <!--begin::Portlet-->
        <!--begin::Form-->
        <form class="kt-form" action="{{ route('admin.business.store') }}" id="user-add-from" method="post"
              isReload="{{ route('admin.business.list') }}" enctype="multipart/form-data">
            @csrf
            <input type="hidden" name="edit_id" value="{{ $data->id ?? null }}">
            <input type="hidden" name="status" value="{{ $data->status ?? '1' }}">
            <div class="kt-portlet__body">
                <div class="form-group row">
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
                <div class="col-lg-6">
                    <label>Business Name<span class="text-danger">*</span></label>
                    <input type="text" name="name" id="name" placeholder="Enter Business Name" value="{{ $data->name ?? null }}" class="form-control">
                </div>

                <div class="col-lg-6">
                    <label>Business Address<span class="text-danger">*</span></label>
                    <input type="text" name="address" id="address" placeholder="Enter Business Address" value="{{ $data->address ?? null }}" class="form-control">
                </div>
                <div class="form-group col-lg-6">
                    <label>Business Card and Shop Images (anyone) {!! $data && $data->image ? '' : '<span class="text-danger">*</span>' !!} </label>
                    <div class="custom-file">
                        <input type="file" name="image" class="custom-file-input" id="userImage"
                               accept="image/*">
                        <label class="custom-file-label text-truncate" for="userImage">Choose file</label>
                        <span class="form-text text-muted">The Image must not be greater than 2MB. and file type:
                            jpg, jpeg, png.</span>
                        @if ($data && $data->image)
                        <a href="{{ $data->image_url }}" target="_blank">View Image</a>
                        @endif
                    </div>
                </div>
                <div class="form-group col-lg-6">
                    <label>Add Companies You Deal With: <span class="text-danger">*</span></label>
                    <select id="companies_id" name="companies_id" class="form-control">
                        <option value="">Select Companies</option>
                        @foreach($companies as $companies_row)
                        <option value="{{ $companies_row->id }}"
                                @if(isset($data) && $data->companies_id == $companies_row->id) selected @endif>
                                {{ $companies_row->name }}
                    </option>
                    @endforeach
                </select>
            </div>
        </div>
        <div class="kt-portlet__head kt-portlet__head--lg">
            <div class="kt-portlet__head-label">
                <h3 class="kt-portlet__head-title">
                    Your Business Verification
                </h3>
            </div>
        </div>
        <div class="kt-portlet__body">
            <div class="form-group row">
                <div class="form-group col-lg-6">
                    <label>Company Website<span class="text-danger">*</span></label>
                    <input type="text" name="company_website" id="company_website" placeholder="Enter Company Website" value="{{ $data->company_website ?? null }}" class="form-control">
                </div>
                <div class="form-group col-lg-6">
                    <label>GST Number (Only for india)</label>
                    <input type="text" name="gst_number" id="gst_number" placeholder="Enter GST Number" value="{{ $data->gst_number ?? null }}" class="form-control">
                </div>
                <div class="form-group col-lg-6">
                    <label>Establishment Year<span class="text-danger">*</span></label>
                    <input type="text" name="establishment_year" id="establishment_year" placeholder="Enter Establishment Year" value="{{ $data->establishment_year ?? null }}" class="form-control">
                </div>
                <div class="form-group col-lg-6">
                    <label>Annual Turnover<span class="text-danger">*</span></label>
                    <input type="text" name="annual_turnover" id="annual_turnover" placeholder="Enter Annual Turnover" value="{{ $data->annual_turnover ?? null }}" class="form-control">
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
            address: {
            required: true,
            },
            companies_id: {
            required: true,
            },
            user_id: {
            required: true,
            },
            category_id: {
            required: true,
            },
            company_website: {
            required: true,
            },
            establishment_year: {
            required: true,
            },
            annual_turnover: {
            required: true,
            },
    },
    };
    validationFormAndSubmit($('#user-add-from'), conf);


</script>
@endpush
