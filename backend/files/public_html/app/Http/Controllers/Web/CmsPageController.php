<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\CmsPages;
use Illuminate\Http\Request;
use App\Models\Banner;
use Illuminate\Support\Facades\Route;

class CmsPageController extends Controller
{

    public function cmsPage($slug){

        $cmsPage = CmsPages::select('title','id','slug','description')->whereSlug($slug)->first();
        $currentRoute = Route::currentRouteName();
        $routeToPageMap = [
            'web.about.us' => 'about_us_page',
            'web.contact.us' => 'contact_us_page',
            'web.services' => 'services_page',
            'web.services.details' => 'services_page',
            'web.blogs' => 'blog_page',
            'web.blogs' => 'blog_page',
            'web.blogs.details' => 'blog_page',
            'web.booking.online' => 'booking_page',
            'web.cms.page' => 'cms_page',

        ];

        $pageValue = $routeToPageMap[$currentRoute] ?? null;
        $pageData = [
            'title' => '',
            'image' => '',
            'description' => '',
        ];
        if ($pageValue) {
            $pageManager = Banner::where('page', $pageValue)->first();
            if ($pageManager) {
                $pageData = [
                    'title' => $pageManager->title,
                    'image' => $pageManager->image_url,
                    'description' => $pageManager->description,
                ];
            }
        }
        return view('web.cms-pages.cmspage',compact('cmsPage','pageData'));
    }
}
