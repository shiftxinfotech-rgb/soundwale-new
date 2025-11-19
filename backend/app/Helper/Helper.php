<?php

namespace App\Helper;

use App\Models\Admin;
use App\Models\Register;
use App\Models\Notifications;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Services\FCMService;

class Helper {

    public static function isJson($string, $return_data = false, $returnArray = false) {
        $data = json_decode($string, $returnArray);

        return (json_last_error() == JSON_ERROR_NONE) ? ($return_data ? $data : true) : false;
    }

    public static function uploadImage(UploadedFile $image, string $path): string {
        // Ensure the directory exists
        if (!Storage::exists($path)) {
            // Create the directory
            Storage::makeDirectory($path);

            // Construct the full path to the directory
            $fullPath = storage_path('app/' . $path);

            // Set the correct permissions
            if (File::exists($fullPath)) {
                File::chmod($fullPath, 0777);
            }
        }

        $imageName = Str::random(10) . '.' . $image->getClientOriginalExtension();
        Storage::putFileAs($path, $image, $imageName, 'public');

        return $imageName;
    }

//    public static function uploadImage(UploadedFile $image, string $path): string
//{
//    // 1?? Save the original file as-is
//    if (!Storage::exists($path)) {
//        Storage::makeDirectory($path);
//    }
//
//    $imageName = Str::random(10) . '.' . $image->getClientOriginalExtension();
//    Storage::putFileAs($path, $image, $imageName, 'public');
//
//    $originalPath = storage_path('app/' . $path . '/' . $imageName);
//
//    // 2?? Make a binary temp copy — work only on this
//    $tempPath = storage_path('app/temp_copied_' . $imageName);
//    copy($originalPath, $tempPath);
//
//    // 3?? Detect image type from temp file
//    $imageType = @exif_imagetype($tempPath);
//    if (!$imageType) {
//        unlink($tempPath);
//        throw new \Exception('Invalid or unsupported image file.');
//    }
//
//    // Load ONLY temp copy into GD
//    switch ($imageType) {
//        case IMAGETYPE_JPEG:
//            $img = imagecreatefromjpeg($tempPath);
//            break;
//        case IMAGETYPE_PNG:
//            $img = imagecreatefrompng($tempPath);
//            break;
//        case IMAGETYPE_GIF:
//            $img = imagecreatefromgif($tempPath);
//            break;
//        case IMAGETYPE_WEBP:
//            $img = imagecreatefromwebp($tempPath);
//            break;
//        default:
//            unlink($tempPath);
//            throw new \Exception('Unsupported image type.');
//    }
//
//    // 4?? Handle EXIF orientation (temp copy only)
//    if ($imageType === IMAGETYPE_JPEG && function_exists('exif_read_data')) {
//        $exif = @exif_read_data($tempPath);
//        if (!empty($exif['Orientation'])) {
//            switch ($exif['Orientation']) {
//                case 3:
//                    $img = imagerotate($img, 180, 0);
//                    break;
//                case 6:
//                    $img = imagerotate($img, -90, 0);
//                    break;
//                case 8:
//                    $img = imagerotate($img, 90, 0);
//                    break;
//            }
//        }
//    }
//
//    $width = imagesx($img);
//    $height = imagesy($img);
//
//    // 5?? Create Thumbnail
//    if ($width > 2000) {
//        $scale = 0.7;
//    } elseif ($width > 1500) {
//        $scale = 0.5;
//    } else {
//        $scale = 0.35;
//    }
//
//    $thumbWidth = (int)($width * $scale);
//    $thumbHeight = (int)($height * $scale);
//
//    $thumbnail = imagecreatetruecolor($thumbWidth, $thumbHeight);
//    if (in_array($imageType, [IMAGETYPE_PNG, IMAGETYPE_GIF])) {
//        imagecolortransparent($thumbnail, imagecolorallocatealpha($thumbnail, 0, 0, 0, 127));
//        imagealphablending($thumbnail, false);
//        imagesavealpha($thumbnail, true);
//    }
//    imagecopyresampled($thumbnail, $img, 0, 0, 0, 0, $thumbWidth, $thumbHeight, $width, $height);
//
//    $thumbDir = $path . '/thumbnails/';
//    if (!Storage::exists($thumbDir)) {
//        Storage::makeDirectory($thumbDir);
//    }
//    $thumbFile = storage_path('app/' . $thumbDir . $imageName);
//
//    switch ($imageType) {
//        case IMAGETYPE_JPEG:
//            imagejpeg($thumbnail, $thumbFile, 85);
//            break;
//        case IMAGETYPE_PNG:
//            imagepng($thumbnail, $thumbFile, 7);
//            break;
//        case IMAGETYPE_WEBP:
//            imagewebp($thumbnail, $thumbFile, 80);
//            break;
//        case IMAGETYPE_GIF:
//            imagegif($thumbnail, $thumbFile);
//            break;
//    }
//
//    // 6?? Create Compressed Copy (same resolution)
//    $compressedDir = $path . '/compressed/';
//    if (!Storage::exists($compressedDir)) {
//        Storage::makeDirectory($compressedDir);
//    }
//    $compressedFile = storage_path('app/' . $compressedDir . $imageName);
//
//    $originalSize = filesize($originalPath);
//    $quality = 90;
//    if ($originalSize > 8 * 1024 * 1024) $quality = 70;
//    elseif ($originalSize > 5 * 1024 * 1024) $quality = 75;
//    elseif ($originalSize > 3 * 1024 * 1024) $quality = 80;
//
//    switch ($imageType) {
//        case IMAGETYPE_JPEG:
//            imagejpeg($img, $compressedFile, $quality);
//            break;
//        case IMAGETYPE_PNG:
//            imagetruecolortopalette($img, false, 256);
//            imagepng($img, $compressedFile, 8);
//            break;
//        case IMAGETYPE_WEBP:
//            imagewebp($img, $compressedFile, 75);
//            break;
//        case IMAGETYPE_GIF:
//            imagegif($img, $compressedFile);
//            break;
//    }
//
//    // 7?? Cleanup (memory + temp copy)
//    imagedestroy($img);
//    imagedestroy($thumbnail);
//    @unlink($tempPath);
//
//    return $imageName;
//}

public static function uploadImageWithOrientation(UploadedFile $image, string $path): array
{
    // Ensure main dir exists
    if (!Storage::exists($path)) {
        Storage::makeDirectory($path);
    }

    // Generate random name
    $imageName = Str::random(10) . '.' . $image->getClientOriginalExtension();

    // Save original untouched
    Storage::putFileAs($path, $image, $imageName, 'public');
    $originalPath = storage_path('app/' . $path . '/' . $imageName);

    // Create temp working copy
    $tempPath = storage_path('app/temp_' . $imageName);
    copy($originalPath, $tempPath);

    // Detect type
    $imageType = exif_imagetype($tempPath);
    switch ($imageType) {
        case IMAGETYPE_JPEG:
            $img = imagecreatefromjpeg($tempPath);
            break;
        case IMAGETYPE_PNG:
            $img = imagecreatefrompng($tempPath);
            break;
        case IMAGETYPE_GIF:
            $img = imagecreatefromgif($tempPath);
            break;
        case IMAGETYPE_WEBP:
            $img = imagecreatefromwebp($tempPath);
            break;
        default:
            @unlink($tempPath);
            throw new \Exception('Unsupported image type.');
    }

    // Handle EXIF orientation (affects only thumbnail + compressed)
    if ($imageType === IMAGETYPE_JPEG && function_exists('exif_read_data')) {
        $exif = @exif_read_data($tempPath);
        if (!empty($exif['Orientation'])) {
            switch ($exif['Orientation']) {
                case 3: $img = imagerotate($img, 180, 0); break;
                case 6: $img = imagerotate($img, -90, 0); break;
                case 8: $img = imagerotate($img, 90, 0); break;
            }
        }
    }

    // Get original dimensions (for scaling logic)
    $width = imagesx($img);
    $height = imagesy($img);

    // ---------- Thumbnail ----------
    if ($width > 2000) $scale = 0.7;
    elseif ($width > 1500) $scale = 0.5;
    else $scale = 0.35;

    $thumbWidth = (int)($width * $scale);
    $thumbHeight = (int)($height * $scale);
    $thumbnail = imagecreatetruecolor($thumbWidth, $thumbHeight);

    if (in_array($imageType, [IMAGETYPE_PNG, IMAGETYPE_GIF])) {
        imagecolortransparent($thumbnail, imagecolorallocatealpha($thumbnail, 0, 0, 0, 127));
        imagealphablending($thumbnail, false);
        imagesavealpha($thumbnail, true);
    }

    imagecopyresampled($thumbnail, $img, 0, 0, 0, 0, $thumbWidth, $thumbHeight, $width, $height);

    $thumbDir = $path . '/thumbnails/';
    if (!Storage::exists($thumbDir)) {
        Storage::makeDirectory($thumbDir);
    }
    $thumbFile = storage_path('app/' . $thumbDir . $imageName);

    switch ($imageType) {
        case IMAGETYPE_JPEG: imagejpeg($thumbnail, $thumbFile, 85); break;
        case IMAGETYPE_PNG: imagepng($thumbnail, $thumbFile, 7); break;
        case IMAGETYPE_WEBP: imagewebp($thumbnail, $thumbFile, 80); break;
        case IMAGETYPE_GIF: imagegif($thumbnail, $thumbFile); break;
    }

    // ? Get thumbnail dimensions (real one)
    $thumbSize = getimagesize($thumbFile);
    $thumbW = $thumbSize[0];
    $thumbH = $thumbSize[1];
    $orientation = $thumbW > $thumbH ? 'landscape' : ($thumbW < $thumbH ? 'portrait' : 'square');

    // ---------- Compressed Copy ----------
    $compressedDir = $path . '/compressed/';
    if (!Storage::exists($compressedDir)) {
        Storage::makeDirectory($compressedDir);
    }
    $compressedFile = storage_path('app/' . $compressedDir . $imageName);

    $originalSize = filesize($originalPath);
    $quality = 90;
    if ($originalSize > 8 * 1024 * 1024) $quality = 70;
    elseif ($originalSize > 5 * 1024 * 1024) $quality = 75;
    elseif ($originalSize > 3 * 1024 * 1024) $quality = 80;

    switch ($imageType) {
        case IMAGETYPE_JPEG:
            imagejpeg($img, $compressedFile, $quality);
            break;
        case IMAGETYPE_PNG:
            imagetruecolortopalette($img, false, 256);
            imagepng($img, $compressedFile, 8);
            break;
        case IMAGETYPE_WEBP:
            imagewebp($img, $compressedFile, 75);
            break;
        case IMAGETYPE_GIF:
            imagegif($img, $compressedFile);
            break;
    }

    // Cleanup
    imagedestroy($img);
    imagedestroy($thumbnail);
    @unlink($tempPath);

    // Return metadata (? correct thumbnail dimensions + orientation)
    return [
        'file_name'       => $imageName,
        'thumb_width'     => $thumbW,
        'thumb_height'    => $thumbH,
        'orientation'     => $orientation,
    ];
}


 

//    public static function uploadImage(UploadedFile $image, string $path): string
//{
//    // Ensure main directory exists
//    if (!Storage::exists($path)) {
//        Storage::makeDirectory($path);
//    }
//
//    // Generate a random filename
//    $imageName = Str::random(10) . '.' . $image->getClientOriginalExtension();
//
//    // Save the original image as-is
//    Storage::putFileAs($path, $image, $imageName, 'public');
//
//    $imagePath = storage_path('app/' . $path . '/' . $imageName);
//
//    // Detect image type
//    $imageType = exif_imagetype($imagePath);
//    switch ($imageType) {
//        case IMAGETYPE_JPEG:
//            $img = imagecreatefromjpeg($imagePath);
//            break;
//        case IMAGETYPE_PNG:
//            $img = imagecreatefrompng($imagePath);
//            break;
//        case IMAGETYPE_GIF:
//            $img = imagecreatefromgif($imagePath);
//            break;
//        case IMAGETYPE_WEBP:
//            $img = imagecreatefromwebp($imagePath);
//            break;
//        default:
//            throw new \Exception('Unsupported image type: ' . $imageType);
//    }
//
//    // Handle orientation correction (JPEG)
//    if ($imageType === IMAGETYPE_JPEG && function_exists('exif_read_data')) {
//        $exif = @exif_read_data($imagePath);
//        if (!empty($exif['Orientation'])) {
//            switch ($exif['Orientation']) {
//                case 3:
//                    $img = imagerotate($img, 180, 0);
//                    break;
//                case 6:
//                    $img = imagerotate($img, -90, 0);
//                    break;
//                case 8:
//                    $img = imagerotate($img, 90, 0);
//                    break;
//            }
//        }
//    }
//
//    // Get dimensions (after orientation correction)
//    $width = imagesx($img);
//    $height = imagesy($img);
//
//    // Determine scaling percentage for thumbnail
//    if ($width > 2000) {
//        $scale = 0.7;
//    } elseif ($width > 1500) {
//        $scale = 0.5;
//    } else {
//        $scale = 0.35;
//    }
//
//    $thumbWidth = (int)($width * $scale);
//    $thumbHeight = (int)($height * $scale);
//
//    // Create a true color image for thumbnail
//    $thumbnail = imagecreatetruecolor($thumbWidth, $thumbHeight);
//
//    // Preserve transparency for PNG and GIF
//    if (in_array($imageType, [IMAGETYPE_PNG, IMAGETYPE_GIF])) {
//        imagecolortransparent($thumbnail, imagecolorallocatealpha($thumbnail, 0, 0, 0, 127));
//        imagealphablending($thumbnail, false);
//        imagesavealpha($thumbnail, true);
//    }
//
//    // Resize proportionally (no crop or stretch)
//    imagecopyresampled(
//        $thumbnail,
//        $img,
//        0, 0, 0, 0,
//        $thumbWidth,
//        $thumbHeight,
//        $width,
//        $height
//    );
//
//    // Ensure thumbnail directory exists
//    $thumbnailPath = $path . '/thumbnails/';
//    if (!Storage::exists($thumbnailPath)) {
//        Storage::makeDirectory($thumbnailPath);
//    }
//
//    $thumbnailFile = storage_path('app/' . $thumbnailPath . $imageName);
//
//    // Save thumbnail to disk
//    switch ($imageType) {
//        case IMAGETYPE_JPEG:
//            imagejpeg($thumbnail, $thumbnailFile, 90);
//            break;
//        case IMAGETYPE_PNG:
//            imagepng($thumbnail, $thumbnailFile, 7);
//            break;
//        case IMAGETYPE_GIF:
//            imagegif($thumbnail, $thumbnailFile);
//            break;
//        case IMAGETYPE_WEBP:
//            imagewebp($thumbnail, $thumbnailFile, 80);
//            break;
//    }
//
//    // Clean up memory
//    imagedestroy($img);
//    imagedestroy($thumbnail);
//
//    return $imageName;
//}

    public static function reportError(string $message, array $data = [], array $notificationChannel = [], string $type = 'info') {
        if (in_array('slack', $notificationChannel)) {
            Log::channel('slack')->emergency($message, [
                'details' => $data,
                'request' => [
                    'url' => request()->fullUrl(),
                    'input' => request()->all(),
                ],
            ]);
        }
        if (in_array('mail', $notificationChannel)) {
            Log::channel('mail')->emergency($message, [
                'details' => $data,
                'request' => [
                    'url' => request()->fullUrl(),
                    'input' => request()->all(),
                ],
            ]);
        }

        Log::$type($message, $data);

        return true;
    }

    public static function getImageUrl($file, $filename = null) {
        if ($filename) {
            $tempp = str_replace("demo//", "demo/", Storage::url($file));
            return str_replace("public//", "public/", $tempp);
        }

        return self::dummyImage();
    }

    public static function dummyImage($text = 'Image', $size = '500x500') {
        return asset('admin-asset/images/200x200.png');
    }

    public static function getImageUrlCategories($file, $filename = null) {
        if ($filename) {
            return Storage::url($file);
        }

        return self::dummyImageCategories();
    }

    public static function dummyImageCategories($text = 'Image', $size = '500x500') {
        return asset('admin-asset/images/company_default.jpg');
    }

    public static function getImageUrlProfile($file, $filename = null) {
        if ($filename) {
            return Storage::url($file);
        }

        return self::dummyImageProfile();
    }

    public static function dummyImageProfile($text = 'Image', $size = '500x500') {
        return asset('admin-asset/images/profile_default_image.png');
    }

    public static function mimesFileValidation($type = 'image') {
        if ($type == 'image') {
            return 'mimes:jpg,jpeg,png';
        } elseif ($type == 'video') {
            $types = '3g2,3gp,aaf,asf,avchd,avi,drc,flv,m2v,m3u8,m4p,m4v,mkv,mng,mov,mp2,mp4,mpe,mpeg,mpg,mpv,mxf,nsv,ogg,ogv,qt,rm,rmvb,roq,svi,vob,webm,wmv,yu';

            return "mimes:{$types}";
        }
    }

    public static function removeLeadingZeroFromMobileNumber($phoneNumber) {
        // Remove all spaces
        $phoneNumber = str_replace(' ', '', $phoneNumber);
        // Check if the first character is a zero
        if (substr($phoneNumber, 0, 1) === '0') {
            // Remove the leading zero
            $phoneNumber = substr($phoneNumber, 1);
        }

        return $phoneNumber;
    }

    public static function getAdminMail() {
        $admin = Admin::first();

        return $admin->email ?? 'admin@admin.com';
    }

    public static function notifyToAdmin($message, $type, $relationId = null) {
        $notification = [
            'title' => $message,
            'type' => $type,
            'relation_id' => $relationId,
        ];

        AdminNotification::create($notification);
    }

    public static function adminNotifyDelete($type, $relationId) {
        if ($type && $relationId) {
            AdminNotification::where('type', $type)->where('relation_id', $relationId)->limit(1)->delete();
        }
    }

    public static function notifyToUser($notification_title, $notification_body, $notification_type, $notification_modules_type, $notification_relation_id, $notification_user_id, $notification_token_user_id, $categories_id = null) {
        // Save notification to database
        $notification = [
            'title' => $notification_title,
            'body' => $notification_body,
            'type' => $notification_type,
            'modules_type' => $notification_modules_type,
            'relation_id' => $notification_relation_id,
            'user_id' => $notification_user_id,
            'categories_id' => $categories_id,
        ];

        $userNotification = Notifications::create($notification);

        // Send push notification if device_token exists
        $register = Register::find($notification_token_user_id);
        if ($register && $register->fcm_token) {

            $fcmService = new FCMService;
            $fcmService->sendNotification(
                    $register->fcm_token, $notification_title, $notification_body, ['notification_id' => $userNotification->id, 'type' => $notification_type, 'modules_type' => $notification_modules_type, 'relation_id' => $notification_relation_id, 'user_id' => $notification_user_id]
            );
        }
    }

    public static function app_token_msg($uid) {
        // Load service account JSON
        $serviceAccount = json_decode(file_get_contents(storage_path('soundwale-ea05d-firebase-adminsdk-fbsvc-615a9915c8.json')), true);

        if (!$uid) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing uid']);
            exit;
        }

// Header for JWT
        $header = [
            'alg' => 'RS256',
            'typ' => 'JWT'
        ];

// Claim set (payload)
        $now = time();
        $payload = [
            'iss' => $serviceAccount['client_email'],
            'sub' => $serviceAccount['client_email'],
            'aud' => 'https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit',
            'iat' => $now,
            'exp' => $now + 3600,
            'uid' => $uid
        ];

// Encode to base64 URL-safe
        function base64UrlEncode($data) {
            return rtrim(strtr(base64_encode(json_encode($data)), '+/', '-_'), '=');
        }

        $headerEncoded = base64UrlEncode($header);
        $payloadEncoded = base64UrlEncode($payload);
        $signatureInput = $headerEncoded . '.' . $payloadEncoded;

// Sign with private key
        $privateKey = $serviceAccount['private_key'];

        openssl_sign($signatureInput, $signature, $privateKey, 'sha256WithRSAEncryption');
        $signatureEncoded = rtrim(strtr(base64_encode($signature), '+/', '-_'), '=');

// Final JWT
        $jwt = $headerEncoded . '.' . $payloadEncoded . '.' . $signatureEncoded;

// Output as JSON
        return $jwt;
//        header('Content-Type: application/json');
//        echo json_encode([
//            'firebase_custom_token' => $jwt
//        ]);
    }

}
