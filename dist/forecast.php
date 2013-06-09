<?php
	include_once 'route.php';
	$route = new route();
	$route->map('playground/ShouldIJump/dist/forecast/{latitude}/{longitude}/{time}');
	//Time is ignored for the moment in favor of using the forecast for the next 30 mins because forecast.io doesn't provide minutely data for time machine requests.

	$API_KEY = 'eac26d42e9bb85f983071f09af5561e5';
	$URL = "https://api.forecast.io/forecast/$API_KEY/$route->latitude,$route->longitude";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $URL);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	$response = curl_exec($ch);
	curl_close($ch);

	echo $response;
?>