<?php

use App\Http\Controllers\API\Auth\LoginController;
use App\Http\Controllers\API\Auth\LogoutController;
use App\Http\Controllers\API\Auth\RegisterController;
use App\Http\Controllers\API\CommonDropController;
use App\Http\Controllers\API\SidebarController;
use App\Http\Controllers\API\HomeListController;
use App\Http\Controllers\API\BuyerRequirmentController;
use App\Http\Controllers\API\SellerDetailsController;
use App\Http\Controllers\API\DirectoryController;
use App\Http\Controllers\API\CommentsController;
use App\Http\Controllers\API\CmsController;


use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\ContactUsController;

use App\Http\Controllers\API\BannersController;
use App\Http\Controllers\API\TestimonialsController;
use App\Http\Controllers\API\AnnouncementController;
use App\Http\Controllers\API\SociallinksController;
use App\Http\Controllers\API\LeadsController;
use App\Http\Controllers\API\AboutController;
use App\Http\Controllers\API\TeamController;
use App\Http\Controllers\API\BusinessController;
use App\Http\Controllers\API\PriceQuotationController;
use App\Http\Controllers\API\UserDetailsController;
use App\Http\Controllers\API\HomeController;
use App\Http\Controllers\API\AdvertisementController;

use App\Http\Controllers\API\ReviewController;
use App\Http\Controllers\API\FavController;
use App\Http\Controllers\API\ShortsController;
use App\Http\Controllers\API\NotificationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('login/send_otp', [LoginController::class, 'send_otp']);
Route::post('login/verify_otp', [LoginController::class, 'verify_otp']);
Route::post('registers', [RegisterController::class, 'register']);
Route::get('role_list', [CommonDropController::class, 'role_lists']);
Route::get('country_list', [CommonDropController::class, 'country_lists']);
Route::get('cities_list', [CommonDropController::class, 'cities_lists']);
Route::get('states_list', [CommonDropController::class, 'states_lists']);
Route::get('category_list', [CommonDropController::class, 'category_lists']);
Route::get('main_categories', [CommonDropController::class, 'main_categories_lists']);
Route::get('model_list', [CommonDropController::class, 'model_lists']);
Route::get('manufacturer_list', [CommonDropController::class, 'manufacturer_lists']);
Route::get('requirment_list', [CommonDropController::class, 'requirment_lists']);
Route::get('get_filter_data', [CommonDropController::class, 'get_filter_data']);
Route::get('parts_list', [CommonDropController::class, 'parts_lists']);
Route::get('faq_list', [CommonDropController::class, 'faq_list']);
Route::get('privacy', [CmsController::class, 'privacy']);
Route::get('terms', [CmsController::class, 'terms']);

Route::group(['middleware' => 'auth:sanctum'], function() {
    
    Route::get('profile', [SidebarController::class, 'Profile']);
    Route::get('get_username_search', [SidebarController::class, 'get_username_search']);
    Route::post('update_profile', [RegisterController::class, 'update_profile']);
    Route::post('operating_mixer_names_add', [SidebarController::class, 'operating_mixer_names_add']);
    Route::post('working_with_approval_add', [SidebarController::class, 'working_with_approval_add']);
    Route::get('get_working_with_by_user_id', [SidebarController::class, 'get_working_with_by_user_id']);
    Route::post('working_with_approval_request_by_id', [SidebarController::class, 'working_with_approval_request_by_id']);
    Route::post('update_json_data_by_user_id', [SidebarController::class, 'update_json_data_by_user_id']);
    
    Route::post('add_business_pdf_and_names', [SidebarController::class, 'add_business_pdf_and_names']);
    Route::post('delete_business_pdf_and_names', [SidebarController::class, 'delete_business_pdf_and_names']);
    Route::get('get_business_pdf_and_names', [SidebarController::class, 'get_business_pdf_and_names']);
    
    
    Route::get('home_list_get', [HomeListController::class, 'home_list_get']);
    Route::post('home_list_add', [HomeListController::class, 'home_list_add']);
    Route::post('home_list/home_like_unlike', [HomeListController::class, 'home_like_unlike']);
    
    Route::get('buyer_list_get', [BuyerRequirmentController::class, 'buyer_list_get']);
    Route::post('buyer/add', [BuyerRequirmentController::class, 'add']);
    Route::post('buyer_requirment/buyer_like_unlike', [BuyerRequirmentController::class, 'buyer_like_unlike']);
    
    Route::get('seller_list_get', [SellerDetailsController::class, 'seller_list_get']);
    Route::post('seller/add', [SellerDetailsController::class, 'add']);
    Route::post('seller_requirment/seller_like_unlike', [SellerDetailsController::class, 'seller_like_unlike']);
    
    
    // directory
    Route::get('directory', [DirectoryController::class, 'lists']);
    Route::get('directory/get_by_id', [DirectoryController::class, 'get_by_id']);
    
    Route::get('get_by_user_id_and_type', [HomeListController::class, 'get_by_user_id_and_type']);
    Route::post('delete_by_id_image', [HomeListController::class, 'delete_by_id_image']);
    Route::post('delete_by_id_post', [HomeListController::class, 'delete_by_id_post']);

    Route::get('fav/get_by_type', [FavController::class, 'get_by_type']);
    
    Route::post('comments/add_update_comments', [CommentsController::class, 'add_update_comments']);
    Route::post('comments/delete_comments', [CommentsController::class, 'delete_comments']);
    Route::get('comments/get_comments', [CommentsController::class, 'get_comments']);
    Route::post('comments/like_unlike_comments', [CommentsController::class, 'like_unlike_comments']);
    Route::post('comments/like_unlike_likes', [CommentsController::class, 'like_unlike_likes']);
    
    
    
});







//old code

Route::post('contactus/saves', [ContactUsController::class, 'Contacussave']);

Route::get('refund', [CmsController::class, 'refund']);
Route::get('need_help', [CmsController::class, 'need_help']);
Route::get('short_terms', [CmsController::class, 'short_terms']);

Route::post('login', [LoginController::class, 'login']);

Route::get('banners', [BannersController::class, 'lists']);
Route::get('testimonials', [TestimonialsController::class, 'lists']);
Route::get('announcement', [AnnouncementController::class, 'lists']);
Route::get('sociallinks', [SociallinksController::class, 'lists']);
Route::get('contactus/lists', [ContactUsController::class, 'lists']);
Route::get('leads', [LeadsController::class, 'lists']);
Route::get('about', [AboutController::class, 'lists']);
Route::get('team', [TeamController::class, 'lists']);







Route::get('sub_category_list', [CommonDropController::class, 'sub_category_lists']);
Route::get('unit_list', [CommonDropController::class, 'unit_lists']);
Route::get('grade_list', [CommonDropController::class, 'grade_lists']);
Route::get('requirment_list', [CommonDropController::class, 'requirment_lists']);
Route::get('surface_list', [CommonDropController::class, 'surface_lists']);


Route::get('country_and_state_list', [CommonDropController::class, 'country_and_state_list']);

Route::post('leads/saves', [LeadsController::class, 'LeadsSave']);
Route::post('business/saves', [BusinessController::class, 'BusinessSave']);

Route::post('price_quotation/add', [PriceQuotationController::class, 'PriceQuotationSave']);









//latest



// login
Route::post('login/login_with_mobile_number', [LoginController::class, 'login_with_mobile_number']);


// home 
// buyer
// seller
// shorts video
Route::get('user_details/video_lists', [UserDetailsController::class, 'video_lists']);
Route::post('user_details/video_lists_by_user_id', [UserDetailsController::class, 'video_lists_by_user_id']);
Route::post('user_details/video_comments', [UserDetailsController::class, 'video_comments']);
Route::post('user_details/video_comments_lists', [UserDetailsController::class, 'video_comments_lists']);









Route::group(['middleware' => 'auth:sanctum'], function() {

    

    // profile
    
    
    Route::post('update_profile_specific_fields', [RegisterController::class, 'update_profile_specific_fields']);
    Route::post('update_profile_personal', [RegisterController::class, 'update_profile_personal']);
    Route::post('update_profile_business', [RegisterController::class, 'update_profile_business']);
    Route::post('update_business_specific_fields', [RegisterController::class, 'update_business_specific_fields']);
    Route::post('hide_profile_in_directory', [UserController::class, 'hide_profile_in_directory']);
    Route::post('update_business_company_pdf', [RegisterController::class, 'update_business_company_pdf']);
    Route::post('delete_business_company_pdf', [RegisterController::class, 'delete_business_company_pdf']);

    // home
    Route::get('get_home_data', [HomeController::class, 'get_home_data']);
    Route::get('look_who_s_trending_list', [HomeController::class, 'look_who_s_trending_list']);
    Route::get('our_top_pick_list', [HomeController::class, 'our_top_pick_list']);
    Route::get('home_header_slider', [CommonDropController::class, 'home_header_slider_list']);
    Route::get('home_footer_slider', [CommonDropController::class, 'home_footer_slider_list']);
    Route::post('advertisement/saves', [AdvertisementController::class, 'AdvertisementSave']);
    Route::get('advertisement/lists', [AdvertisementController::class, 'lists']);

    // buyer
    Route::get('buyer_requirment', [BuyerRequirmentController::class, 'lists']);
    Route::get('buyer_requirment/get_by_id', [BuyerRequirmentController::class, 'get_by_id']);
    Route::get('buyer_requirment/get_related_post', [BuyerRequirmentController::class, 'get_related_post']);
    Route::post('buyer_requirment/saves', [BuyerRequirmentController::class, 'BuyerRequirmentSave']);
    
    Route::get('buyer_requirment/requirment_post_by_user_id_post', [BuyerRequirmentController::class, 'requirment_post_by_user_id_post']);

    Route::post('buyer_requirment/update_post', [BuyerRequirmentController::class, 'PostUpdate']);
    Route::post('buyer_requirment/delete_post', [BuyerRequirmentController::class, 'PostDelete']);
    Route::post('buyer_requirment/delete_image_post', [BuyerRequirmentController::class, 'PostImageDelete']);
    
    // seller
    Route::get('seller_details', [SellerDetailsController::class, 'lists']);
    Route::post('seller_details/saves', [SellerDetailsController::class, 'SellerDetailsSave']);
    Route::get('seller_details/get_by_id', [SellerDetailsController::class, 'get_by_id']);
    Route::get('seller_details/get_related_post', [SellerDetailsController::class, 'get_related_post']);
    
    Route::post('seller_details/catalogue_add', [SellerDetailsController::class, 'catalogue_add']);
    Route::post('seller_requirment/catalouge_like_unlike', [SellerDetailsController::class, 'catalouge_like_unlike']);
    Route::get('seller_details/get_catalogue_userwise', [SellerDetailsController::class, 'get_catalogue_userwise']);
    Route::get('seller_details/post_by_user_id', [SellerDetailsController::class, 'post_by_user_id']);

    
    // shorts video
    Route::post('user_details/saves', [UserDetailsController::class, 'UserDetailsSave']);
    Route::post('user_details/video_like_unlike', [UserDetailsController::class, 'video_like_unlike']);

    // review
    Route::post('review/add', [ReviewController::class, 'ReviewAdd']);
    Route::get('review/get_by_user_id', [ReviewController::class, 'get_by_user_id']);

    // fav
    

    
    
//    Route::get('profile', [UserController::class, 'Profile']);

    Route::post('contactus/saves', [ContactUsController::class, 'Contacussave']);
    Route::post('contactus/delete_account_request', [ContactUsController::class, 'delete_account_request']);
    
    // shorts
    Route::post('shorts/add', [ShortsController::class, 'Add']);
    Route::post('shorts/add_comments_and_reply', [ShortsController::class, 'AddCommentsAndReply']);
    Route::get('shorts/all_shorts_lists', [ShortsController::class, 'all_shorts_lists']);
    Route::get('shorts/get_shorts_by_video_id', [ShortsController::class, 'get_shorts_by_video_id']);
    Route::post('shorts/delete_video_by_id', [ShortsController::class, 'delete_video_by_id']);
    Route::post('shorts/shorts_like_unlike', [ShortsController::class, 'shorts_like_unlike']);
    
    // notification
    Route::post('notification/update_fcm_token', [NotificationController::class, 'Update_Fcm_Token']);
    Route::get('notification/get_all', [NotificationController::class, 'Get_All']);
    Route::get('notification/unread_count', [NotificationController::class, 'Unread_Count']);
    Route::get('notification/mark_all_read', [NotificationController::class, 'Mark_All_Read']);
    Route::post('notification/delete', [NotificationController::class, 'Delete_By_Id']);
    Route::post('notification/mark_read_by_id', [NotificationController::class, 'Mark_Read_By_Id']);
    Route::post('notification/send_notification', [NotificationController::class, 'Send_Notification']);
    Route::post('notification/send_chat_notification', [NotificationController::class, 'send_chat_notification']);
    
	//  Business Images and Video
    Route::post('add_business_shop_images', [BusinessController::class, 'add_business_shop_images']);
    Route::post('add_business_shop_video', [BusinessController::class, 'add_business_shop_video']);
    Route::post('remove_business_shop_image_by_id', [RegisterController::class, 'remove_business_shop_image_by_id']);
    Route::post('remove_business_shop_image_video', [BusinessController::class, 'remove_business_shop_image_video']);
    Route::get('get_business_image_video_list', [BusinessController::class, 'get_business_image_video_list']);
    Route::post('add_business_shop_image_video', [BusinessController::class, 'add_business_shop_image_video']);
    
    
    Route::post('logout', [LogoutController::class, 'logout']);
});
