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