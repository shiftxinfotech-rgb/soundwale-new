<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;

class Handler extends ExceptionHandler
{
    protected $dontReport = [
        // Add exceptions that should not be reported
    ];

    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    public function render($request, Exception $exception)
    {
        // Check if the exception is a NotFoundHttpException
        if ($exception instanceof NotFoundHttpException) {
            return response()->view('errors.404', [], 404);
        }

        // Check for other types of HTTP exceptions if needed
        if ($exception instanceof HttpException) {
            return response()->view('errors.custom', [], $exception->getStatusCode());
        }

        // For all other exceptions, you can use the default error page or customize further
        return parent::render($request, $exception);
    }
}
