define("locationManager", function(){
	var exports = {};
	var locations = [];
	if(!('localStorage' in window) || (window['localStorage'] == null)){
		return { locations: null };
	}

	exports.save = function(location){
		locations.push(location);
		localStorage.setItem("locations", JSON.stringify(locations));
	};
	exports.clearAll = function(){
		if(window.confirm("Are you sure you want to clear all locations?")){
			localStorage.removeItem("locations", null);
		}
	};
	exports.locations = JSON.parse(localStorage.getItem("locations")) || [];

	return exports;
});