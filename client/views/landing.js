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