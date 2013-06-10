var main = angular.module('main', []).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.
			when('/settings', {templateUrl: 'partials/settings.html', controller:window.settingsController}).
			when('/about', {templateUrl: 'partials/about.html', controller:null}).
			when('/forecast', {templateUrl: 'partials/forecast.html', controller:window.forecastController}).
			otherwise({redirectTo:'/forecast'});
	}]);
main = main;