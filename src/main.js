require(['geolocation', 'suggestions', 'locationManager'], function(geolocation, suggestion, locationManager){
	geolocation.bind('positionChanged', function(){
		$.getJSON('forecast.json.php/' + geolocation.position.latitude + '/' + geolocation.position.longitude)
		.success(function(data){
			var windspeed = Math.round(data.currently.windSpeed);
			var maxWindspeed = 0;
			$(data.hourly.data).each(function(hour){
				maxWindspeed = maxWindspeed < data.hourly.data[hour].windSpeed ? data.hourly.data[hour].windSpeed : maxWindspeed;
			});
			maxWindspeed = Math.round(maxWindspeed);

			var jumpStatus = maxWindspeed > 15 ? "userShouldNotJump" : "userShouldJump";
			var messageSeed = Math.floor(Math.random() * suggestion[jumpStatus].length);
			var message = suggestion[jumpStatus][messageSeed];

			var windBearing = data.currently.windBearing;
			var windDirection;
			switch(true){
				case (330 < windBearing || windBearing < 30):
					windDirection = "N";
					break;
				case (31 < windBearing < 59):
					windDirection = "NE";
					break;
				case (60 < windBearing < 120):
					windDirection = "E";
					break;
				case (121 < windBearing < 149):
					windDirection = "SE";
					break;
				case (150 < windBearing < 210):
					windDirection = "S";
					break;
				case (211 < windBearing < 239):
					windDirection = "SW";
					break;
				case (240 < windBearing < 300):
					windDirection = "W";
					break;
				case (301 < windBearing < 329):
					windDirection = "NW";
					break;
				default:
					windDirection = "--";
					break;
			}


			$("#windspeed").text(windspeed);
			$("#maxWindspeed").text(maxWindspeed);
			$("#jumpStatusText").text(message);
			$("#windDirection").text(windDirection);
		});
	});
});