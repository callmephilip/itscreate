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