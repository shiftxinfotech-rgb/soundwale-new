<?php

namespace App\Services;

use Google_Client;
use GuzzleHttp\Client;
use App\Models\Notifications;

class FCMService {

    protected $client;

    public function __construct() {
        $this->client = new Client;
    }

    public function sendNotification($deviceTokens, $notification_title, $notification_body, $data = []) {
        $url = 'https://fcm.googleapis.com/v1/projects/soundwale-ea05d/messages:send';

        $notification = [
            'message' => [
                'token' => $deviceTokens,
                'notification' => [
                    'title' => $notification_title,
                    'body' => $notification_body,
                ],
            ],
        ];

        if (count($data) > 0) {
            $notification['message']['data'] = $this->convertNumericToString($data);
        }

        $headers = [
            'Authorization' => 'Bearer ' . $this->getAccessToken(),
            'Content-Type' => 'application/json',
        ];

        $response = $this->client->post($url, [
            'headers' => $headers,
            'json' => $notification,
        ]);

//        Notifications::where('id', $data['notification_id'])->update([
//            'return_data' => $response->getBody()->getContents(),
//        ]);
        return json_decode($response->getBody(), true);
    }

    private function getAccessToken() {
        $credentialsPath = storage_path('soundwale-ea05d-firebase-adminsdk-fbsvc-615a9915c8.json');

        $client = new Google_Client;
        $client->setAuthConfig($credentialsPath);
        $client->addScope('https://www.googleapis.com/auth/firebase.messaging');
        $token = $client->fetchAccessTokenWithAssertion();

        return $token['access_token'];
    }

    private function convertNumericToString($array) {
        $convertedArray = collect($array)->map(function ($value) {
                    return is_numeric($value) ? (string) $value : $value;
                })->toArray();

        return $convertedArray;
    }

}
