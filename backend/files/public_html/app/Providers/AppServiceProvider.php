<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\ServiceProvider;
use App\Models\Banner;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        ResetPassword::createUrlUsing(function ($notifiable, string $token) {
            return route('admin.password.reset', $token) . '?email=' . $notifiable->email;
        });
        if (request()->is('api/*')) {
            if (env('API_LOG') == true) {
                $req = ['req_data' => request()->all(), 'header' => request()->header()];
                Log::debug('API Request :: '.request()->path()."\n".json_encode($req));
            }
        }
        view()->composer('*', function ($view) {
            $view->with('settings', Banner::first()); // Adjust the query as needed
        });
    }
}
