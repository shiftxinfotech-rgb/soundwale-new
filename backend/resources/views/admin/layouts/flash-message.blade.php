@if ($errors->any())
    <div class="alert alert-danger fade show" role="alert">
        <div class="alert-text">
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </div>
        <div class="alert-close">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true"><i class="la la-close"></i></span>
            </button>
        </div>
    </div>
@endif
@if(session()->has('message'))
    <div class="alert alert-success fade show" role="alert">
        <div class="alert-text">{{ session()->get('message') }}</div>
        <div class="alert-close">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true"><i class="la la-close"></i></span>
            </button>
        </div>
    </div>
@endif
@if(session()->has('success'))
    <div class="alert alert-success fade show" role="alert">
        <div class="alert-text">{{ session()->get('success') }}</div>
        <div class="alert-close">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true"><i class="la la-close"></i></span>
            </button>
        </div>
    </div>
@endif
@if(session()->has('error'))
    <div class="alert alert-danger fade show" role="alert">
        <div class="alert-text">{{ session()->get('error') }}</div>
        <div class="alert-close">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true"><i class="la la-close"></i></span>
            </button>
        </div>
    </div>
@endif
@if(session()->has('warning'))
    <div class="alert alert-warning fade show" role="alert">
        <div class="alert-text">{{ session()->get('warning') }}</div>
        <div class="alert-close">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true"><i class="la la-close"></i></span>
            </button>
        </div>
    </div>
@endif