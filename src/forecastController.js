function forecastController($scope, $http, $rootScope, geolocation){
	$scope.forcastAvailable = "pending";
	$rootScope.$on('locationChange', function(event, location){
		retreiveForcast(location);
	});
	geolocation.utilizeCurrentLocation(function(geolocation){
		retreiveForcast(geolocation);
	});

	function retreiveForcast(geolocation){
		$scope.forcastAvailable = "pending";
		var targetTime = new Date((new Date().getTime()-1800000)/1000);
		$http({
			method: 'GET', 
			url: 'forecast.php/' + geolocation.latitude + '/' + geolocation.longitude + '/' + targetTime.getTime() //UNIX Time
			//targetTime is ignored for the moment in favor of using the forecast for the next 30 mins because forecast.io doesn't provide minutely data for time machine requests.
		})
		.success(function(data){
			$scope.forcastAvailable = true;
			$scope.alert = data.alert ? data.alert[1] : null;
			$scope.windspeed = Math.round(data.currently.windSpeed);
			
			var maxWindspeed = 0;
			for(var i=0; i<data.minutely.data.length; i++){
				var minute = data.minutely.data[i];
				window.console.log(new Date(minute.time*1000));
				maxWindspeed = maxWindspeed < minute.windSpeed ? minute.windSpeed : maxWindspeed;
			}
			$scope.maxWindspeed = Math.round(maxWindspeed);

			var jumpStatus = maxWindspeed > 15 ? "userShouldNotJump" : "userShouldJump";
			var messageSeed = Math.floor(Math.random() * suggestion[jumpStatus].length);
			$scope.message = suggestion[jumpStatus][messageSeed];

			var windBearing = data.currently.windBearing;
			switch(true){
				case (330 < windBearing || windBearing < 30):
					$scope.windDirection = "N";
					break;
				case (31 < windBearing < 59):
					$scope.windDirection = "NE";
					break;
				case (60 < windBearing < 120):
					$scope.windDirection = "E";
					break;
				case (121 < windBearing < 149):
					$scope.windDirection = "SE";
					break;
				case (150 < windBearing < 210):
					$scope.windDirection = "S";
					break;
				case (211 < windBearing < 239):
					$scope.windDirection = "SW";
					break;
				case (240 < windBearing < 300):
					$scope.windDirection = "W";
					break;
				case (301 < windBearing < 329):
					$scope.windDirection = "NW";
					break;
			}
		})
		.error(function(){
			$scope.forcastAvailable = false;
		});
	}
}
forecastController.$inject = ['$scope', '$http', '$rootScope', 'geolocation'];