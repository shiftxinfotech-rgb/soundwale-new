<?php

namespace App\Http\Controllers\Web;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

class CookieController extends Controller
{
    public function accept(Request $request)
    {
        $this->setCookie('cookie_consent', 'accepted');
        return redirect()->back();
    }

    public function reject(Request $request)
    {
        $this->setCookie('cookie_consent', 'rejected');
        return redirect()->back();
    }

    public function manage(Request $request)
    {
        return redirect()->route('cookie.manage.page');
    }

    private function setCookie($name, $value)
    {
        $minutes = 60 * 24 * 365; // 1 year
        cookie()->queue($name, $value, $minutes);
    }
}
