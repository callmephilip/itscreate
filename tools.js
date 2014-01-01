
getLocation = function(){
	var dfd = $.Deferred();

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			var lat = position.coords.latitude;
			var lng = position.coords.longitude;
			$.when(reverseGeocode(lat,lng))
				.done(function(data){
					dfd.resolve(_.extend({}, data, {lat : lat, lng : lng }));
				})
				.fail(function(){
					dfd.reject();
				})
		}, function(){
			dfd.reject();
		});
	} else {
		dfd.reject();
	}

	return dfd.promise();
}

var reverseGeocode  = function(lat, lng) {

	var dfd = $.Deferred();

	$.when($.ajax({
		url  : 'http://maps.googleapis.com/maps/api/geocode/json',
		data : {
			latlng : lat + "," + lng,
			sensor : "false"
		}
	})).done(function(data){
		if(typeof data.results !== 'undefined' && data.results.length !== 0){
			var addressComponents = data.results[0].address_components;

			var country = _.find(addressComponents, function(ac){
				return ac.types.indexOf('country') !== -1; 
			});

			country =  typeof country !== 'undefined' ? 
				country.long_name : null;

			var city = _.find(addressComponents, function(ac){
				return ac.types.indexOf('administrative_area_level_1') !== -1;
			});

			city = typeof city !== 'undefined' ?
				city.long_name : null;

			dfd.resolve({ city : city, country : country }); 
		} else {
			dfd.reject();
		}
	});

	return dfd.promise();
};