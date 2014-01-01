Meteor.subscribe("people");
Meteor.subscribe("messages");

// Transitions for the panels

Template.landing.rendered = function(){
    if(Meteor.user()){
        setTimeout(function(){
            $('.container').removeClass('inital-shift')
                .addClass('chat-shift');
        },3000);
    }
};

Template.landing.events({
    'click .login' : function(){
        Meteor.loginWithFacebook({}, function(error){
            if(typeof error === 'undefined'){
                setTimeout(function(){
                    $('.container').removeClass('inital-shift')
                        .addClass('chat-shift');
                    $('.wheres-waldo').removeClass('hidden');
                },3000);
            }
        });

        return false;
    },

    'click .logout' : function(){
        Meteor.logout();
    }
});


Template.people.events({
    'click .panel-heading' : function(){
        $('.container')
            .removeClass('chat-shift')
            .addClass('people-shift');   
    }
});

Template.people.allPeople = function(){
    return Meteor.users.find();
};

Template.people.peopleCount = function(){
    return Meteor.users.find().count();  
};

Template.chat.events({
    'click' : function(){
        $('.container')
            .removeClass('people-shift')
            .addClass('chat-shift');   
    },
    'click textarea' : function(){
        $('.container')
            .removeClass('map-shift')
            .addClass('chat-shift');   
    }
});

Template.map.events({
    'click .map-canvas' : function(){
        $('.container')
            .removeClass('people-shift')
            .addClass('map-shift');   
    }
});

var map;

Deps.autorun(function () {
    var query = Meteor.users.find({ 'profile.location' : { $exists : true }});
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
});

Template.map.rendered = function(){
    map = L.mapbox.map(this.find('.map-canvas'),
        'examples.map-9ijuk24y').setView([0, 0], 3);
};

// message composing interface 

Template.newMessageForm.events({
    'submit form' : function (event, template) {
        var message = template.find('.message').value;

        sendMessage({
            message : message, 
            sender : {
                name : Meteor.user().profile.name,
                location : Meteor.user().profile.location,
                picture : getProfileImage(Meteor.user())
            }
        });

        $(template.find('.message')).attr('value','');

        return false;
    }
});

// message display

Template.listMessages.messages = function(){
    return Messages.find({}, {sort: {created: -1}});
};

// location indicator

Template.locationIndicator.currentLocation = function(){
    var person = Meteor.user(); 
    return person ? person.profile.location : null;
};

Template.locationIndicator.events({
    'click .locate' : function(){
        $.when(getLocation()).done(function(location){
            var person = Meteor.user();
            if(person){
                Meteor.users.update(person._id, {$set: {'profile.location': location}});
            }
        }).fail(function(){
            alert('cannot locate you, bru');
        });

        return false;
    }
});