<?php

namespace App\Traits;

use Illuminate\Http\Response;

trait ApiResponseBuilderTrait
{
    /**
     * Build Success Response
     *
     * @return Response
     */
    public function buildSuccessfulResponse(string $message = 'Response given successfully.', int $code = Response::HTTP_OK, array|object|null $data = null, array $meta = []): Response
    {
        $response = [
            'success' => true, 'message' => $message,
        ];
        $response['data'] = $data;

        if (! empty($meta)) {
            $response['meta'] = $meta;
        }

        return Response($response, $code);
    }

    /**
     * Build Failed Response
     *
     * @return Response
     */
    public function buildFailedResponse(string $message = 'There is an error while processing your request.', int $code = Response::HTTP_INTERNAL_SERVER_ERROR): Response
    {
        return Response(['success' => false, 'message' => $message], $code);
    }
}
