main.directive('searchAutocomplete', ['geolocation', function(geolocation){
	return {
		require: 'ngModel',
		link: function(scope, element, attrs){
			var autocompleteTimer;
			scope.$watch(attrs.ngModel, function(value){
				if(value){
					clearTimeout(autocompleteTimer);
					autocompleteTimer = setTimeout(function(){
						geolocation.searchForLocation(value, function(results){
							scope.autocompleteResults = results;
							scope.$apply();
						});
					}, 700);
				}
				else {
					scope.autocompleteResults = null;
				}
			});
		}
	};
}]);