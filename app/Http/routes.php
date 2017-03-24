<?php

$app->group([
  'namespace' => 'App\Controllers',
], function($app) {
  $app->get('/', ['uses' => 'Pages@index']);
  $app->get('/guide', ['uses' => 'Pages@guide']);
  $app->get('/tandc', ['uses' => 'Pages@tandc']);
  $app->get('/{id: [a-zA-Z0-9]+}', ['uses' => 'Pages@share']);
  $app->get('/image/{file: [a-zA-Z0-9]+\.jpg}', ['uses' => 'ImageController@process']);
  $app->get('/image/meta/{file: [a-zA-Z0-9]+\.jpg}', ['uses' => 'ImageController@processMeta']);
  $app->get('/download/{file: [a-zA-Z0-9]+\.jpg}', ['uses' => 'ImageController@download']);
  $app->get('/dl/{file: [a-zA-Z0-9]+}', ['uses' => 'Pages@dl']);
  $app->get('/ig/{file: [a-zA-Z0-9]+}', ['uses' => 'Pages@ig']);
});

$app->group([
  'prefix' => 'api',
  'namespace' => 'App\Api',
], function($app) {
    $app->post('upload', ['uses' =>'FileController@upload']);
    $app->get('upload', ['uses' =>'FileController@upload']);
  }
);

