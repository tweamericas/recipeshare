<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

use Laravel\Lumen\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        AuthorizationException::class,
        HttpException::class,
        ModelNotFoundException::class,
        ValidationException::class,
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $e
     * @return void
     */
    public function report(Exception $e)
    {
        parent::report($e);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $e
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $e)
    {

      // custom 404 page
      if ($e instanceof NotFoundHttpException || env('APP_ENV') === 'production') {
        return response(view('pages.notfound'), 404);
      }

      $whoops = new \Whoops\Run;

      if ($request->wantsJson()) {
        $handler = (new \Whoops\Handler\JsonResponseHandler())->setJsonApi(true);
        $whoops->pushHandler($handler);
      } else {
        $handler = new \Whoops\Handler\PrettyPageHandler();
        if (config('app.editor')) {
          $handler->setEditor(config('app.editor'));
        }
        $whoops->pushHandler($handler);
      }

      return $whoops->handleException($e);

        //return parent::render($request, $e);
    }
}
