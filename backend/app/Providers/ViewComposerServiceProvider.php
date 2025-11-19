<?php

namespace App\Providers;

use App\Models\AdminNotification;
use App\Models\Setting;
use App\Models\SocialLinks;
use App\Models\SeoManagers;
use App\Models\BrowseByPositions;
use App\Models\JobPosting;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class ViewComposerServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        View::composer('admin.includes.header', function ($view) {
            $unreadList = AdminNotification::where('read', false)->latest()->get();
            $unreadCount = $unreadList->count();
            $view->with('unreadCount', $unreadCount);
            $view->with('unreadList', $unreadList);
        });

        View::composer('web.includes.header', function ($view) {
            $header = Setting::select('header_text','header_logo','footer_logo','content','registered_address','factory_address','email','phone_number','website')->first();
            $socialLink = SocialLinks::select('facebook_link','twitter_link','instagram_link','linked_link')->first(); // Adjust this to select social link fields
            $view->with('socialLink', $socialLink);
            $view->with('header', $header);
        });

        View::composer('web.includes.footer', function ($view) {
            $footer = Setting::select('footer_logo','content','registered_address','factory_address','email','phone_number')->first();
            $socialLink = SocialLinks::select('facebook_link','twitter_link','instagram_link','linked_link')->first(); // Adjust this to select social link fields
            $Services = JobPosting::where('status',1)->get();
            $BrowseByPositions = BrowseByPositions::where('status',1)->latest()->paginate(6);
            $view->with('footer', $footer);
            $view->with('socialLink', $socialLink);
            $view->with('Services', $Services);
            $view->with('BrowseByPositions', $BrowseByPositions);
        });

        View::composer('web.includes.head', function ($view) {
            $currentRoute = Route::currentRouteName();
            $routeToMenuMap = [
                'web.home' => 'home_page',
                'web.about.us' => 'about_us_page',
                'web.contact.us' => 'contact_us_page',
                'web.jobs.seeker' => 'job_seeker_page',
                'web.apply.job' => 'apply_job_page',
                'web.testimonial' => 'testimonials_page',
                'web.cms.page' => 'cms_page',
                'web.submit.role' => 'submit_role_page',
                'web.talent.seeker' => 'hiring_talent_page',
            ];

            $menuValue = $routeToMenuMap[$currentRoute] ?? null;
            $seoData = [
                'seo_title' => config('app.name'),
                'meta_keyword' => '',
                'meta_description' => '',
            ];
            if ($menuValue) {
                $seoManager = SeoManagers::where('menu', $menuValue)->first();
                if ($seoManager) {
                    $seoData = [
                        'seo_title' => $seoManager->seo_title,
                        'meta_keyword' => $seoManager->meta_keyword,
                        'meta_description' => $seoManager->meta_description,
                    ];
                }
            }

        $view->with('seoData', $seoData);
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
