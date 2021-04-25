<?php

$app->hook("slim.before.router",function() use ($app){
      
    $pathInfo = explode("/", $app->request()->getPathInfo());
    //app request get path info gets the path from the bases routes file. 
    //$app->post('/api/'.$product.'/getclasslist', '\\'.$product.':getclasslist'); here the api product method are exploded by the forward slash. 
    $product = $pathInfo[2];
    $method = $pathInfo[3];
    
    if ($product == 'locker_base') {
        require $_SERVER['PHP_INCLUDE_ROUTE'].'locker_base.php';    
        //product passed in the url. based on the product we include that api class. 
        
    }else{
        if (file_exists($_SERVER['PHP_INCLUDE_ROUTE'].$product.'.php')) {
            require $_SERVER['PHP_INCLUDE_ROUTE'].'locker_base.php';
            require $_SERVER['PHP_INCLUDE_ROUTE'].$product.'.php';
            //include both the product and locker base classes. 
        }else{
            $app->log->error('Request path : ' . $app->request()->getPathInfo(). ' - incorrect product in api call');
            $app->halt(404, 'incorrect product in api call: '.$app->request()->getPathInfo());
        }
    $rc = new ReflectionClass($product);//calls or instantiates the product class . FACTORY design pattern. 
    $rm = new ReflectionMethod($product, $method);//calls the method passed in the request object of the url query string. 

    if(!$rc->hasMethod($method) ){
            $app->log->error('Request path : ' . $app->request()->getPathInfo(). ' - incorrect method in api call');
            //loggin the errors. 
            $app->halt(404, 'incorrect method in api call: '.$app->request()->getPathInfo());
    }
        
    } 
});

$app->hook('slim.after.router', function () use ($app) {
	//this hook actually passes the request and response objects. 
    $request = $app->request;
    $response = $app->response;
    $app->log->info('Request path : ' . $request->getPathInfo().' | Response status : ' . $response->getStatus());
});