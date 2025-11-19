@props(['url'])
<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
{{-- @if (trim($slot) === 'Laravel') --}}
{{-- <img src="{{ asset('admin-asset/images/logo.png')}}" class="logo" alt=""> --}}
<img src="{{ asset('admin-asset/images/logo.jpg')}}" class="logo" alt="">
{{-- @else
{{ $slot }}
@endif --}}
</a>
</td>
</tr>
