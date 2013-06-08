main.factory('geolocation', function(){
	var $scope = {};
	$scope.utilizeCurrentLocation = function(callback){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(function(position){
				$scope.currentLocation = position.coords;
				var geocoder = new google.maps.Geocoder();
				var latlng = new google.maps.LatLng($scope.currentLocation.latitude,$scope.currentLocation.longitude);

				geocoder.geocode({'latLng': latlng}, function(results, status) {
					if (status === google.maps.GeocoderStatus.OK) {
						if (results[1]) {
							$scope.currentLocation = $scope.parseGoogleResult(results[2]);
							(callback || function(){})($scope.currentLocation);
						}
					}
				});
			});
		}
	};

	$scope.searchForLocation = function(value, callback){
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({'address': value}, function(results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				(callback || function(){})(results);
			}
		});
	};

	$scope.parseGoogleResult = function(result){
		result.latitude = result.geometry.location.lat();
		result.longitude = result.geometry.location.lng();
		result.city = result.address_components[0].short_name;
		result.state = result.address_components[2].short_name;
		result.country = result.address_components[3].short_name;
		return result;
	};
	
	return $scope;
});