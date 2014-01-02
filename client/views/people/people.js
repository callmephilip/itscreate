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
