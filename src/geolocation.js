define("geolocation", ['jquery'], function($){
	var exports = $({});
	function hasLocation(position){
		exports.status = 0;
		exports.trigger("statusChanged");
		exports.position = position.coords;
		exports.trigger("positionChanged");
	}
	function locationUnavailable(){
		exports.status = 1;
		exports.trigger("statusChanged");
		exports.message = "GeoLocation is required at the moment";
		exports.trigger("messageChanged");
	}
	function handleError(){
		return locationUnavailable();
	}

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(hasLocation, handleError);
	}
	else{
		locationUnavailable();
	}

	return exports;
});