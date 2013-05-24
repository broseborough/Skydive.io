module("geolocationTests", ['geolocation'], function(){
	test("Geolocation sets the window.location object", function(){
		ok(window.location, "window.location exists");
	});
});