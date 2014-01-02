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