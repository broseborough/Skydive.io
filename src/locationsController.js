function locationsController($scope, geolocation){
	if(!('localStorage' in window) || (window['localStorage'] == null)){
		return { locations: null };
	}

	var locationsItem = localStorage.getItem("locations");
	$scope.locations = locationsItem ? angular.fromJson(localStorage.getItem("locations")) : [];

	$scope.save = function(location){
		$scope.locations.push(location);
		localStorage.setItem("locations", angular.toJson($scope.locations));
	};
	$scope.clearAll = function(){
		if(window.confirm("Are you sure you want to clear all locations?")){
			localStorage.removeItem("locations", null);
			$scope.locations = [];
		}
	};
	$scope.isInSavedLocations = function(location){
		for(var i=0; i< $scope.locations.length; i++){
			if(location && location.city === $scope.locations[i].city && location.state === $scope.locations[i].state){
				return true;
			}
		}
		return false;
	};
	$scope.setCurrentLocation = function(location){
		$scope.searchTerm = null;
		$scope.autocompleteResults = null;
		$scope.currentLocation = geolocation.parseGoogleResult(location);
		$scope.$emit('locationChange', location);
	};

	geolocation.utilizeCurrentLocation(function(geolocation){
		$scope.setCurrentLocation(geolocation);
	});

}
locationsController.$inject = ['$scope', 'geolocation'];