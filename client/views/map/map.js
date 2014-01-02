var renderMarkers = function(query){
    var markers = query.map(function (person) {
        return {
            // this feature is in the GeoJSON format: see geojson.org
            // for the full specification
            type: 'Feature',
            geometry: {
                type: 'Point',
                // coordinates here are in longitude, latitude order because
                // x, y is the standard for GeoJSON and many formats
                coordinates: [
                    person.profile.location.lng, 
                    person.profile.location.lat
                ]
            },
            properties: {
                title: person.profile.name,
                //description: 'Just one of me',
                'marker-size': 'large',
                'marker-color': '#f0a'
            }
        };
    });

    if(map){
        L.mapbox.markerLayer(markers).addTo(map);
    }
};

var map;

Template.map.events({
    'click .map-canvas' : function(){
        $('.container')
            .removeClass('people-shift')
            .addClass('map-shift');   
    }
});

Deps.autorun(function () {
    var query = Meteor.users.find({ 'profile.location' : { $exists : true }});    
    renderMarkers(query);
});

Template.map.rendered = function(){
    map = L.mapbox.map(this.find('.map-canvas'),
        'examples.map-9ijuk24y').setView([0, 0], 3);
    var query = Meteor.users.find({ 'profile.location' : { $exists : true }});
    renderMarkers(query);
};