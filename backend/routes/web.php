<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Web\HomeController;
use App\Http\Controllers\Web\CmsPageController;
use App\Http\Controllers\Web\ContactUsController;
use App\Http\Controllers\Web\TalentSeekerController;
use App\Http\Controllers\Web\SubmitRoleController;
use App\Http\Controllers\Web\UserContactUsController;
use App\Http\Controllers\Web\AboutUsController;
use App\Http\Controllers\Web\GalleriesController;
use App\Http\Controllers\Web\JobSeekerController;
use App\Http\Controllers\Web\CookieController;
use App\Http\Controllers\Web\ActivityController;
use App\Http\Controllers\Web\TestimonialController;


Route::get('st-link', function () {
    Artisan::call('storage:link');

    return back()->with('success', 'Storage link generate successfully');
});

Route::fallback(function () {
    return response()->view('web.errors.404', [], 404);
});
Route::get('/cookie/manage', function () {
    return view('cookie.manage');
})->name('cookie.manage.page');

Route::post('/track-activity', [ActivityController::class, 'store'])->name('web.track.activity');

//Home Page
//Route::get('/', function () {
//    return redirect('/index.html');
//});

Route::get('/', [HomeController::class, 'index'])->name('web.home');
Route::get('/privacy_policy', [HomeController::class, 'privacy_policy'])->name('privacy_policy');
Route::get('/terms_and_conditions', [HomeController::class, 'terms_and_conditions'])->name('terms_and_conditions');

//About Us
Route::get('about-us', [AboutUsController::class, 'index'])->name('web.about.us');

// Testimonial
Route::get('testimonial', [TestimonialController::class, 'index'])->name('web.testimonial');


//jobs-seeker
Route::controller(JobSeekerController::class)->group(function () {
    Route::get('jobs-seeker', 'index')->name('web.jobs.seeker');
    Route::get('apply-job/{slug}','detail')->name('web.apply.job');
    Route::post('apply-job-save','save')->name('web.apply.job.save');
});

//Contact Us
Route::get('contact-us', [ContactUsController::class, 'index'])->name('web.contact.us');
Route::post('user-contact-us',[UserContactUsController::class, 'save'])->name('user.contact.us.save');

// cms page
Route::get('cms/{slug}', [CmsPageController::class, 'cmsPage'])->name('web.cms.page');

Route::post('/cookie/accept', [CookieController::class, 'accept'])->name('cookie.accept');
Route::post('/cookie/reject', [CookieController::class, 'reject'])->name('cookie.reject');
Route::post('/cookie/manage', [CookieController::class, 'manage'])->name('cookie.manage');

//Submit Role
Route::get('submit-role', [SubmitRoleController::class, 'index'])->name('web.submit.role');
Route::post('submit-role-save',[SubmitRoleController::class, 'save'])->name('web.submit.role.save');

//Talent Seeker
Route::get('talent-seeker', [TalentSeekerController::class, 'index'])->name('web.talent.seeker');
Route::post('talent-seeker-save',[TalentSeekerController::class, 'save'])->name('web.talent.seeker.save');
