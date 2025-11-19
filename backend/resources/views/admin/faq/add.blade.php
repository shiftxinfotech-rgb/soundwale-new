@extends('admin.layouts.default')
@section('title', 'Faq')
@section('content')
    <!-- begin:: Subheader -->
    <div class="kt-subheader   kt-grid__item" id="kt_subheader">
        <div class="kt-subheader__main">
            <h3 class="kt-subheader__title">Faq</h3>
            <span class="kt-subheader__separator kt-hidden"></span>
            <div class="kt-subheader__breadcrumbs">
                <span class="kt-subheader__breadcrumbs-separator"></span>
                <a href="{{ route('admin.faq.list') }}" class="kt-subheader__breadcrumbs-link" title="Back">List</a>
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
                        {{ $data ? 'Edit' : 'Add' }} Faq
                    </h3>
                </div>
            </div>
            <!--begin::Portlet-->
            <!--begin::Form-->
            <form class="kt-form" action="{{ route('admin.faq.store') }}" id="faq-add-from" method="post"
                isReload="{{ route('admin.faq.list') }}">
                <div class="kt-portlet__body">
                    @csrf
                    <input type="hidden" name="edit_id" value="{{ $data->id ?? null }}">
                    <div class="form-group row">
                        <div class="col-lg-6">
                            <label>Title <span class="text-danger">*</span></label>
                            <input type="text" name="title" placeholder="Enter title"
                                value="{{ $data->title ?? null }}" class="form-control">
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-lg-12">
                            <label>Description <span class="text-danger">*</span></label>
                            <textarea name="description" class="form-control" placeholder="Enter description" cols="15" rows="5">{{ $data->description ?? null }}</textarea>
                            <label id="description-error" class="text-danger" for="description"></label>
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
            <!--end::Form-->
        </div>
    </div>
@endsection
@push('script')
    <script type="text/javascript">
        ClassicEditor.defaultConfig = {
            toolbar: {
                // items: ['heading','bold','italic','|','bulletedList','|','undo','redo','|','imageUpload','imageResize','imageStyle:side','imageStyle:alignLeft','imageStyle:alignCenter','imageStyle:alignRight','imageStyle:sideLeft','imageTextAlternative','|',"insertTable", "tableColumn", "tableRow", "mergeTableCells"]
                items: ['heading', 'bold', 'italic', '|', 'bulletedList', '|', 'undo', 'redo', '|', "insertTable",
                    "tableColumn", "tableRow", "mergeTableCells"
                ]
            },
            resizeUnit: "px",
            ckfinder: {
                uploadUrl: "{{ route('admin.image.upload') . '?_token=' . csrf_token() }}",
            },
            language: 'en',
        };

        ClassicEditor.create(document.querySelector('#description'), {
            height: 150,
        }).catch(error => {
            console.log(error);
        });

        let conf = {
            rules: {
                title: {
                    required: true,
                    maxlength: 200,
                },
                description: {
                    required: true,
                },
            },
        };
        validationFormAndSubmit($('#faq-add-from'), conf);
    </script>
@endpush
