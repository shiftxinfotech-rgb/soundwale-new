<?php

use App\Http\Controllers\Admin\AdminHomeController;
use App\Http\Controllers\Admin\AdminProfileController;
use App\Http\Controllers\Admin\Auth\AdminForgotPasswordController;
use App\Http\Controllers\Admin\Auth\AdminLoginController;
use App\Http\Controllers\Admin\AboutUsControllers;
use App\Http\Controllers\Admin\BrowseByPositionsController;
use App\Http\Controllers\Admin\BannerControllers;
use App\Http\Controllers\Admin\CmsPageController;
use App\Http\Controllers\Admin\ContactUsControllers;
use App\Http\Controllers\Admin\TalentSeekerControllers;
use App\Http\Controllers\Admin\SubmitRoleControllers;
use App\Http\Controllers\Admin\HomeSlidersController;
use App\Http\Controllers\Admin\NotificationControllers;
use App\Http\Controllers\Admin\MailConfigurationController;
use App\Http\Controllers\Admin\JobPostingController;
use App\Http\Controllers\Admin\SettingsControllers;
use App\Http\Controllers\Admin\SocialLinksControllers;
use App\Http\Controllers\Admin\TeamsControllers;
use App\Http\Controllers\Admin\TestimonialsControllers;
use App\Http\Controllers\Admin\OurValuesControllers;
use App\Http\Controllers\Admin\SeoManagersControllers;
use App\Http\Controllers\Admin\LeadersControllers;
use App\Http\Controllers\Admin\ActivityLogControllers;
use App\Http\Controllers\Admin\SolutionsControllers;
use App\Http\Controllers\Admin\ApplyJobControllers;
use App\Http\Controllers\Admin\RegisterControllers;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\PlanControllers;
use App\Http\Controllers\Admin\CategoriesControllers;
use App\Http\Controllers\Admin\CategoryControllers;
use App\Http\Controllers\Admin\SubCategoryControllers;
use App\Http\Controllers\Admin\UnitControllers;
use App\Http\Controllers\Admin\RequirmentControllers;
use App\Http\Controllers\Admin\GradeControllers;
use App\Http\Controllers\Admin\SurfaceControllers;
use App\Http\Controllers\Admin\LeadsControllers;
use App\Http\Controllers\Admin\CatalogueControllers;
use App\Http\Controllers\Admin\BusinessControllers;
use App\Http\Controllers\Admin\CompaniesControllers;
use App\Http\Controllers\Admin\DirectoryControllers;
use App\Http\Controllers\Admin\RoleControllers;
use App\Http\Controllers\Admin\HomeSliderControllers;
use App\Http\Controllers\Admin\CsvImportController;
use App\Http\Controllers\Admin\FaqControllers;
use App\Http\Controllers\Admin\HomeFooterSliderControllers;
use App\Http\Controllers\Admin\BuyerRequirmentControllers;
use App\Http\Controllers\Admin\SellerDetailsControllers;
use App\Http\Controllers\Admin\AdvertisementControllers;
use App\Http\Controllers\Admin\DeleteAccountControllers;
use App\Http\Controllers\Admin\ShortsControllers;
use App\Http\Controllers\Admin\ModelsControllers;
use App\Http\Controllers\Admin\ManufacturerControllers;
use App\Http\Controllers\Admin\PartsControllers;
use App\Http\Controllers\Admin\HomeRequirmentControllers;
use App\Http\Controllers\Admin\WorkingWithControllers;
use Illuminate\Support\Facades\Route;

Route::get('/cache-clear', function () {
    Artisan::call('cache:clear');
    Artisan::call('config:clear');

    return back()->with('success', 'cache clear');
});

// table migrate
Route::get('/migrate', function () {
    Artisan::call('migrate');

    return back()->with('success', 'migration successfully.');
});

Route::get('/migrate-fresh', function () {
    Artisan::call('migrate:fresh');

    return back()->with('success', 'migration fresh successfully.');
});

// DB seed
Route::get('/db-seed', function () {
    Artisan::call('db:seed');

    return back()->with('success', 'Seeding database');
});

Route::get('st-link', function () {
    Artisan::call('storage:link');

    return back()->with('success', 'Storage link generate successfully');
});

Route::get('/phpinfo', function () {
    phpinfo();
});

// Route::get('/', function () {
//     return 'Admin route';
// });

Route::controller(AdminLoginController::class)->group(function () {
    Route::get('login', 'showLoginForm')->name('login.form');
    Route::post('login', 'login')->name('login.post');
    Route::post('logout', 'logout')->name('logout');
});

Route::controller(AdminForgotPasswordController::class)->group(function () {
    Route::post('send-mail', 'forgetPassword')->middleware('guest')->name('sendForgetPasswordLink');
    Route::get('reset-password/{token}', 'ResetPasswordForm')->middleware('guest')->name('password.reset');
    Route::post('reset-password/{token}', 'resetPasswordStore')->middleware('guest')->name('password.reset');
});

Route::group(['middleware' => ['auth:authority']], function () {
    Route::get('/', [AdminHomeController::class, 'index'])->name('home');
    Route::get('user-list', [AdminHomeController::class, 'index'])->name('user.list');
    Route::post('image-upload', [AdminHomeController::class, 'storeImage'])->name('image.upload');

    Route::controller(AdminProfileController::class)->group(function () {
        Route::get('profile', 'profileEdit')->name('profile.edit');
        Route::post('update-profile', 'profileUpdate')->name('profile.update');
        Route::get('admin-password-change', 'adminPasswordChange')->name('profile.change.password');
        Route::post('update-admin-password-change', 'passwordUpdate')->name('profile.change.password.update');
    });

    Route::group(['prefix' => 'cms-page'], function () {
        Route::controller(CmsPageController::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('cms.page.list');
            Route::get('add', 'add')->name('cms.page.add');
            Route::get('edit/{id}', 'add')->name('cms.page.edit');
            Route::post('store', 'store')->name('cms.page.store');
            Route::post('delete', 'delete')->name('cms.page.delete');
        });
    });

    Route::group(['prefix' => 'home-slider'], function () {
        Route::controller(HomeSlidersController::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('home.slider.list');
            Route::get('add', 'add')->name('home.slider.add');
            Route::get('edit/{id}', 'add')->name('home.slider.edit');
            Route::post('status-change', 'statusChange')->name('home.slider.status.change');
            Route::post('store', 'store')->name('home.slider.store');
            Route::post('delete', 'delete')->name('home.slider.delete');
        });
    });

    Route::group(['prefix' => 'teams'], function () {
        Route::controller(TeamsControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('teams.list');
            Route::get('add', 'add')->name('teams.add');
            Route::get('edit/{id}', 'add')->name('teams.edit');
            Route::post('status-change', 'statusChange')->name('teams.status.change');
            Route::post('home-status-change', 'HomeStatusChange')->name('teams.home.status.change');
            Route::post('store', 'store')->name('teams.store');
            Route::post('delete', 'delete')->name('teams.delete');
            Route::get('view/{id}', 'view')->name('teams.view');
        });
    });

    Route::group(['prefix' => 'social-links'], function () {
        Route::controller(SocialLinksControllers::class)->group(function () {
            Route::get('/', 'index')->name('social.link.index');
            Route::post('/update', 'update')->name('social.link.update');
        });
    });

    Route::group(['prefix' => 'contact-us'], function () {
        Route::controller(ContactUsControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('contact.us.list');
            Route::get('view/{id}', 'view')->name('contact.us.view');
            Route::post('delete', 'delete')->name('contact.us.delete');
        });
    });

    Route::group(['prefix' => 'job-posting'], function () {
        Route::controller(JobPostingController::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('job.posting.list');
            Route::get('add', 'add')->name('job.posting.add');
            Route::get('edit/{id}', 'add')->name('job.posting.edit');
            Route::get('view/{id}', 'view')->name('job.posting.view');
            Route::post('status-change', 'statusChange')->name('job.posting.status.change');
            Route::post('store', 'store')->name('job.posting.store');
            Route::post('delete', 'delete')->name('job.posting.delete');
        });
    });

    Route::group(['prefix' => 'notification'], function () {
        Route::controller(NotificationControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('notification.list');
            Route::post('delete', 'delete')->name('notification.delete');
            Route::post('read-all-notification', 'readAllNotification')->name('notification.read.all');
            Route::get('notification-redirect/{id}', 'notificationRedirect')->name('notification.redirect');
            Route::get('unread-notifications', 'getUnreadNotifications')->name('notification.unread');
        });
    });

    Route::group(['prefix' => 'settings'], function () {
        Route::controller(SettingsControllers::class)->group(function () {
            Route::get('/', 'index')->name('settings.index');
            Route::post('/update', 'update')->name('settings.update');
        });
    });

    Route::group(['prefix' => 'our-values'], function () {
        Route::controller(OurValuesControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('our.values.list');
            Route::get('add', 'add')->name('our.values.add');
            Route::get('edit/{id}', 'add')->name('our.values.edit');
            Route::post('store', 'store')->name('our.values.store');
            Route::post('delete', 'delete')->name('our.values.delete');
        });
    });

    Route::group(['prefix' => 'about-us'], function () {
        Route::controller(AboutUsControllers::class)->group(function () {
            Route::get('/', 'index')->name('about.us.index');
            Route::post('/update', 'update')->name('about.us.update');
        });
    });

    Route::group(['prefix' => 'banners'], function () {
        Route::controller(BannerControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('banners.list');
            Route::get('add', 'add')->name('banners.add');
            Route::get('edit/{id}', 'add')->name('banners.edit');
            Route::post('status-change', 'statusChange')->name('banners.status.change');
            Route::post('store', 'store')->name('banners.store');
            Route::post('delete', 'delete')->name('banners.delete');
        });
    });

    Route::group(['prefix' => 'plans'], function () {
        Route::controller(PlanControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('plans.list');
            Route::get('add', 'add')->name('plans.add');
            Route::get('edit/{id}', 'add')->name('plans.edit');
            Route::post('status-change', 'statusChange')->name('plans.status.change');
            Route::post('store', 'store')->name('plans.store');
            Route::post('delete', 'delete')->name('plans.delete');
        });
    });
    Route::group(['prefix' => 'mail-configuration'], function () {
        Route::controller(MailConfigurationController::class)->group(function () {
            Route::get('/', 'index')->name('mail.configuration.index');
            Route::post('/update', 'update')->name('mail.configuration.update');
        });
    });

    Route::group(['prefix' => 'seo-managers'], function () {
        Route::controller(SeoManagersControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('seo.managers.list');
            Route::get('add', 'add')->name('seo.managers.add');
            Route::get('edit/{id}', 'add')->name('seo.managers.edit');
            Route::post('status-change', 'statusChange')->name('seo.managers.status.change');
            Route::post('store', 'store')->name('seo.managers.store');
            Route::post('delete', 'delete')->name('seo.managers.delete');
            Route::get('view/{id}', 'view')->name('seo.managers.view');
        });
    });

    Route::group(['prefix' => 'testimonials'], function () {
        Route::controller(TestimonialsControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('testimonials.list');
            Route::get('add', 'add')->name('testimonials.add');
            Route::get('edit/{id}', 'add')->name('testimonials.edit');
            Route::post('status-change', 'statusChange')->name('testimonials.status.change');
            Route::post('store', 'store')->name('testimonials.store');
            Route::post('delete', 'delete')->name('testimonials.delete');
            Route::get('view/{id}', 'view')->name('testimonials.view');
        });
    });

    Route::group(['prefix' => 'browse-by-positions'], function () {
        Route::controller(BrowseByPositionsController::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('browse.by.positions.list');
            Route::get('add', 'add')->name('browse.by.positions.add');
            Route::get('edit/{id}', 'add')->name('browse.by.positions.edit');
            Route::post('status-change', 'statusChange')->name('browse.by.positions.status.change');
            Route::post('store', 'store')->name('browse.by.positions.store');
            Route::post('delete', 'delete')->name('browse.by.positions.delete');
        });
    });

    Route::group(['prefix' => 'leaders'], function () {
        Route::controller(LeadersControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('leaders.list');
            Route::get('add', 'add')->name('leaders.add');
            Route::get('edit/{id}', 'add')->name('leaders.edit');
            Route::post('status-change', 'statusChange')->name('leaders.status.change');
            Route::post('store', 'store')->name('leaders.store');
            Route::post('delete', 'delete')->name('leaders.delete');
            Route::get('view/{id}', 'view')->name('leaders.view');
        });
    });

    Route::group(['prefix' => 'register'], function () {
        Route::controller(RegisterControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('register.list');
            Route::get('add', 'add')->name('register.add');
            Route::get('edit/{id}', 'add')->name('register.edit');
            Route::post('status-change', 'statusChange')->name('register.status.change');
            Route::post('store', 'store')->name('register.store');
            Route::post('store_view', 'store_view')->name('register.store_view');
            Route::post('delete', 'delete')->name('register.delete');
            Route::get('view/{id}', 'view')->name('register.view');
            Route::get('get-state/{country_id}', 'getState')->name('register.getstate');
            Route::get('get-city/{state_id}', 'getCity')->name('register.getcity');
            Route::post('gallery_image_delete', 'gallery_image_delete')->name('register.gallery_image_delete');
            Route::post('common_business_delete', 'common_business_delete')->name('register.common_business_delete');
            Route::get('get-sub-category', 'getSubCategory')->name('register.getsubcategory');
            Route::post('delete_visiting_card', 'delete_visiting_card')->name('register.delete_visiting_card');
            Route::post('delete_user_profile', 'delete_user_profile')->name('register.delete_user_profile');
            Route::post('delete_review', 'delete_review')->name('register.delete_review');
            Route::post('json_object_remove', 'json_object_remove')->name('register.json_object_remove');
        });
    });

    Route::group(['prefix' => 'submit-role'], function () {
        Route::controller(SubmitRoleControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('submit.role.list');
            Route::get('view/{id}', 'view')->name('submit.role.view');
            Route::post('delete', 'delete')->name('submit.role.delete');
            Route::post('store', 'storeOther')->name('submit.role.other.page.store');
        });
    });

    Route::group(['prefix' => 'talent-seeker'], function () {
        Route::controller(TalentSeekerControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('talent.seeker.list');
            Route::get('view/{id}', 'view')->name('talent.seeker.view');
            Route::post('delete', 'delete')->name('talent.seeker.delete');
            Route::post('store', 'storeOther')->name('talent.seeker.other.page.store');
        });
    });

    Route::group(['prefix' => 'activity-logs'], function () {
        Route::controller(ActivityLogControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('activity.log.list');
            Route::get('view/{id}', 'view')->name('activity.log.view');
            Route::post('delete', 'delete')->name('activity.log.delete');
        });
    });

    Route::group(['prefix' => 'solutions'], function () {
        Route::controller(SolutionsControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('solutions.list');
            Route::get('add', 'add')->name('solutions.add');
            Route::get('edit/{id}', 'add')->name('solutions.edit');
            Route::post('store', 'store')->name('solutions.store');
            Route::post('delete', 'delete')->name('solutions.delete');
        });
    });

    Route::group(['prefix' => 'apply-job'], function () {
        Route::controller(ApplyJobControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('apply.job.list');
            Route::get('view/{id}', 'view')->name('apply.job.view');
            Route::post('delete', 'delete')->name('apply.job.delete');
        });
    });

    Route::group(['prefix' => 'categories'], function () {
        Route::controller(CategoriesControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('categories.list');
            Route::get('add', 'add')->name('categories.add');
            Route::get('edit/{id}', 'add')->name('categories.edit');
            Route::post('status-change', 'statusChange')->name('categories.status.change');
            Route::post('store', 'store')->name('categories.store');
            Route::post('delete', 'delete')->name('categories.delete');
            Route::get('view/{id}', 'view')->name('categories.view');
        });
    });

    Route::group(['prefix' => 'category'], function () {
        Route::controller(CategoryControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('category.list');
            Route::get('add', 'add')->name('category.add');
            Route::get('edit/{id}', 'add')->name('category.edit');
            Route::post('status-change', 'statusChange')->name('category.status.change');
            Route::post('store', 'store')->name('category.store');
            Route::post('delete', 'delete')->name('category.delete');
            Route::get('view/{id}', 'view')->name('category.view');
        });
    });

    Route::group(['prefix' => 'models'], function () {
        Route::controller(ModelsControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('models.list');
            Route::get('add', 'add')->name('models.add');
            Route::get('edit/{id}', 'add')->name('models.edit');
            Route::post('status-change', 'statusChange')->name('models.status.change');
            Route::post('store', 'store')->name('models.store');
            Route::post('delete', 'delete')->name('models.delete');
            Route::get('view/{id}', 'view')->name('models.view');
        });
    });
    
    Route::group(['prefix' => 'manufacturer'], function () {
        Route::controller(ManufacturerControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('manufacturer.list');
            Route::get('add', 'add')->name('manufacturer.add');
            Route::get('edit/{id}', 'add')->name('manufacturer.edit');
            Route::post('status-change', 'statusChange')->name('manufacturer.status.change');
            Route::post('store', 'store')->name('manufacturer.store');
            Route::post('delete', 'delete')->name('manufacturer.delete');
            Route::get('view/{id}', 'view')->name('manufacturer.view');
        });
    });
    
    Route::group(['prefix' => 'parts'], function () {
        Route::controller(PartsControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('parts.list');
            Route::get('add', 'add')->name('parts.add');
            Route::get('edit/{id}', 'add')->name('parts.edit');
            Route::post('status-change', 'statusChange')->name('parts.status.change');
            Route::post('store', 'store')->name('parts.store');
            Route::post('delete', 'delete')->name('parts.delete');
            Route::get('view/{id}', 'view')->name('parts.view');
        });
    });

    Route::group(['prefix' => 'sub-category'], function () {
        Route::controller(SubCategoryControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('sub.category.list');
            Route::get('add', 'add')->name('sub.category.add');
            Route::get('edit/{id}', 'add')->name('sub.category.edit');
            Route::post('status-change', 'statusChange')->name('sub.category.status.change');
            Route::post('store', 'store')->name('sub.category.store');
            Route::post('delete', 'delete')->name('sub.category.delete');
            Route::get('view/{id}', 'view')->name('sub.category.view');
            Route::get('get-subcategories/{categories_id}', 'getCategory')->name('sub.category.get');
        });
    });

    Route::group(['prefix' => 'unit'], function () {
        Route::controller(UnitControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('unit.list');
            Route::get('add', 'add')->name('unit.add');
            Route::get('edit/{id}', 'add')->name('unit.edit');
            Route::post('status-change', 'statusChange')->name('unit.status.change');
            Route::post('store', 'store')->name('unit.store');
            Route::post('delete', 'delete')->name('unit.delete');
            Route::get('view/{id}', 'view')->name('unit.view');
        });
    });

    Route::group(['prefix' => 'requirment'], function () {
        Route::controller(RequirmentControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('requirment.list');
            Route::get('add', 'add')->name('requirment.add');
            Route::get('edit/{id}', 'add')->name('requirment.edit');
            Route::post('status-change', 'statusChange')->name('requirment.status.change');
            Route::post('store', 'store')->name('requirment.store');
            Route::post('delete', 'delete')->name('requirment.delete');
            Route::get('view/{id}', 'view')->name('requirment.view');
        });
    });

    Route::group(['prefix' => 'grade'], function () {
        Route::controller(GradeControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('grade.list');
            Route::get('add', 'add')->name('grade.add');
            Route::get('edit/{id}', 'add')->name('grade.edit');
            Route::post('status-change', 'statusChange')->name('grade.status.change');
            Route::post('store', 'store')->name('grade.store');
            Route::post('delete', 'delete')->name('grade.delete');
            Route::get('view/{id}', 'view')->name('grade.view');
        });
    });

    Route::group(['prefix' => 'surface'], function () {
        Route::controller(SurfaceControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('surface.list');
            Route::get('add', 'add')->name('surface.add');
            Route::get('edit/{id}', 'add')->name('surface.edit');
            Route::post('status-change', 'statusChange')->name('surface.status.change');
            Route::post('store', 'store')->name('surface.store');
            Route::post('delete', 'delete')->name('surface.delete');
            Route::get('view/{id}', 'view')->name('surface.view');
        });
    });

    Route::group(['prefix' => 'leads'], function () {
        Route::controller(LeadsControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('leads.list');
            Route::get('add', 'add')->name('leads.add');
            Route::get('edit/{id}', 'add')->name('leads.edit');
            Route::post('status-change', 'statusChange')->name('leads.status.change');
            Route::post('store', 'store')->name('leads.store');
            Route::post('delete', 'delete')->name('leads.delete');
            Route::get('view/{id}', 'view')->name('leads.view');
            Route::get('get-subcategories/{categories_id}', 'getCategory')->name('leads.get');
            Route::get('get-subcategory/{category_id}', 'getSubCategory')->name('leads.getsubcategory');
        });
    });

    Route::group(['prefix' => 'catalogue'], function () {
        Route::controller(CatalogueControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('catalogue.list');
            Route::get('add', 'add')->name('catalogue.add');
            Route::get('edit/{id}', 'add')->name('catalogue.edit');
            Route::post('status-change', 'statusChange')->name('catalogue.status.change');
            Route::post('store', 'store')->name('catalogue.store');
            Route::post('delete', 'delete')->name('catalogue.delete');
            Route::get('view/{id}', 'view')->name('catalogue.view');
        });
    });

    Route::group(['prefix' => 'companies'], function () {
        Route::controller(CompaniesControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('companies.list');
            Route::get('add', 'add')->name('companies.add');
            Route::get('edit/{id}', 'add')->name('companies.edit');
            Route::post('status-change', 'statusChange')->name('companies.status.change');
            Route::post('store', 'store')->name('companies.store');
            Route::post('delete', 'delete')->name('companies.delete');
            Route::get('view/{id}', 'view')->name('companies.view');
        });
    });

    Route::group(['prefix' => 'business'], function () {
        Route::controller(BusinessControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('business.list');
            Route::get('add', 'add')->name('business.add');
            Route::get('edit/{id}', 'add')->name('business.edit');
            Route::post('status-change', 'statusChange')->name('business.status.change');
            Route::post('store', 'store')->name('business.store');
            Route::post('delete', 'delete')->name('business.delete');
            Route::get('view/{id}', 'view')->name('business.view');
        });
    });

    Route::group(['prefix' => 'directory'], function () {
        Route::controller(DirectoryControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('directory.list');
            Route::get('add', 'add')->name('directory.add');
            Route::get('edit/{id}', 'add')->name('directory.edit');
            Route::post('status-change', 'statusChange')->name('directory.status.change');
            Route::post('store', 'store')->name('directory.store');
            Route::post('delete', 'delete')->name('directory.delete');
            Route::get('view/{id}', 'view')->name('directory.view');
            Route::get('get-subcategories/{categories_id}', 'getCategory')->name('directory.get');
            Route::get('get-subcategory/{category_id}', 'getSubCategory')->name('directory.getsubcategory');
            Route::post('delete_slider_image', 'delete_slider_image')->name('directory.delete.slider.images');
            Route::post('delete_gallery_image', 'delete_gallery_image')->name('directory.delete.gallery.images');
            Route::post('delete_catalogue_pdf', 'delete_catalogue_pdf')->name('directory.delete.catalogue.pdf');
        });
    });

    Route::group(['prefix' => 'role'], function () {
        Route::controller(RoleControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('role.list');
            Route::get('add', 'add')->name('role.add');
            Route::get('edit/{id}', 'add')->name('role.edit');
            Route::post('status-change', 'statusChange')->name('role.status.change');
            Route::post('store', 'store')->name('role.store');
            Route::post('delete', 'delete')->name('role.delete');
            Route::get('view/{id}', 'view')->name('role.view');
        });
    });

    Route::group(['prefix' => 'home_slider'], function () {
        Route::controller(HomeSliderControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('home_slider.list');
            Route::get('add', 'add')->name('home_slider.add');
            Route::get('edit/{id}', 'add')->name('home_slider.edit');
            Route::post('status-change', 'statusChange')->name('home_slider.status.change');
            Route::post('store', 'store')->name('home_slider.store');
            Route::post('delete', 'delete')->name('home_slider.delete');
            Route::get('view/{id}', 'view')->name('home_slider.view');
        });
    });

    Route::group(['prefix' => 'csv-import'], function () {
        Route::controller(CsvImportController::class)->group(function () {
            Route::get('/', 'index')->name('csv.import.index');
            Route::post('/update', 'update')->name('csv.import.update');
            Route::get('export', 'export')->name('csv.import.export');
        });
    });

    Route::group(['prefix' => 'faq'], function () {
        Route::controller(FaqControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('faq.list');
            Route::get('add', 'add')->name('faq.add');
            Route::get('edit/{id}', 'add')->name('faq.edit');
            Route::post('store', 'store')->name('faq.store');
            Route::post('delete', 'delete')->name('faq.delete');
        });
    });

    Route::group(['prefix' => 'home_footer_slider'], function () {
        Route::controller(HomeFooterSliderControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('home_footer_slider.list');
            Route::get('add', 'add')->name('home_footer_slider.add');
            Route::get('edit/{id}', 'add')->name('home_footer_slider.edit');
            Route::post('status-change', 'statusChange')->name('home_footer_slider.status.change');
            Route::post('store', 'store')->name('home_footer_slider.store');
            Route::post('delete', 'delete')->name('home_footer_slider.delete');
            Route::get('view/{id}', 'view')->name('home_footer_slider.view');
        });
    });
    
    Route::group(['prefix' => 'home_requirment'], function () {
        Route::controller(HomeRequirmentControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('home_requirment.list');
            Route::get('add', 'add')->name('home_requirment.add');
            Route::get('edit/{id}', 'add')->name('home_requirment.edit');
            Route::post('status-change', 'statusChange')->name('home_requirment.status.change');
            Route::post('store', 'store')->name('home_requirment.store');
            Route::post('delete', 'delete')->name('home_requirment.delete');
            Route::get('view/{id}', 'view')->name('home_requirment.view');
//            Route::get('get-subcategories/{categories_id}', 'getCategory')->name('home_requirment.get');
//            Route::get('get-subcategory/{category_id}', 'getSubCategory')->name('home_requirment.getsubcategory');
            Route::post('gallery_image_delete', 'gallery_image_delete')->name('home_requirment.gallery_image_delete');
        });
    });
    
    Route::group(['prefix' => 'working_with'], function () {
        Route::controller(WorkingWithControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('working_with.list');
            Route::get('add', 'add')->name('working_with.add');
            Route::get('edit/{id}', 'add')->name('working_with.edit');
            Route::post('status-change', 'statusChange')->name('working_with.status.change');
            Route::post('store', 'store')->name('working_with.store');
            Route::post('delete', 'delete')->name('working_with.delete');
            // ? Add Approve and Reject routes here
            Route::get('approve/{id}', 'approve')->name('working_with.approve');
            Route::get('reject/{id}', 'reject')->name('working_with.reject');
        });
    });

    Route::group(['prefix' => 'buyer_requirment'], function () {
        Route::controller(BuyerRequirmentControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('buyer_requirment.list');
            Route::get('add', 'add')->name('buyer_requirment.add');
            Route::get('edit/{id}', 'add')->name('buyer_requirment.edit');
            Route::post('status-change', 'statusChange')->name('buyer_requirment.status.change');
            Route::post('store', 'store')->name('buyer_requirment.store');
            Route::post('delete', 'delete')->name('buyer_requirment.delete');
            Route::get('view/{id}', 'view')->name('buyer_requirment.view');
            Route::get('get-subcategories/{categories_id}', 'getCategory')->name('buyer_requirment.get');
            Route::get('get-subcategory/{category_id}', 'getSubCategory')->name('buyer_requirment.getsubcategory');
            Route::post('gallery_image_delete', 'gallery_image_delete')->name('buyer_requirment.gallery_image_delete');
        });
    });

    Route::group(['prefix' => 'seller_details'], function () {
        Route::controller(SellerDetailsControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('seller_details.list');
            Route::get('add', 'add')->name('seller_details.add');
            Route::get('edit/{id}', 'add')->name('seller_details.edit');
            Route::post('status-change', 'statusChange')->name('seller_details.status.change');
            Route::post('store', 'store')->name('seller_details.store');
            Route::post('delete', 'delete')->name('seller_details.delete');
            Route::get('view/{id}', 'view')->name('seller_details.view');
            Route::get('get-subcategories/{categories_id}', 'getCategory')->name('seller_details.get');
            Route::get('get-subcategory/{category_id}', 'getSubCategory')->name('seller_details.getsubcategory');
            Route::post('gallery_image_delete', 'gallery_image_delete')->name('seller_details.gallery_image_delete');
        });
    });

    Route::group(['prefix' => 'advertisement'], function () {
        Route::controller(AdvertisementControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('advertisement.list');
            Route::get('add', 'add')->name('advertisement.add');
            Route::get('edit/{id}', 'add')->name('advertisement.edit');
            Route::post('status-change', 'statusChange')->name('advertisement.status.change');
            Route::post('store', 'store')->name('advertisement.store');
            Route::post('delete', 'delete')->name('advertisement.delete');
            Route::get('view/{id}', 'view')->name('advertisement.view');
        });
    });

    Route::group(['prefix' => 'delete_account_request'], function () {
        Route::controller(DeleteAccountControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('delete_account_request.list');
            Route::post('status-change', 'statusChange')->name('delete_account_request.status.change');
            Route::post('delete', 'delete')->name('delete_account_request.delete');
        });
    });

    Route::group(['prefix' => 'shorts'], function () {
        Route::controller(ShortsControllers::class)->group(function () {
            Route::match(['get', 'post'], 'list', 'list')->name('shorts.list');
            Route::post('status-change', 'statusChange')->name('shorts.status.change');
            Route::post('delete', 'delete')->name('shorts.delete');
        });
    });

    /** Roles */
    Route::resource('roles', RoleController::class);
});
