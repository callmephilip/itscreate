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
    },

    'click .add-smth-create' : function(event,template){
        
        var generateEmoticons = function(){
            return Meteor.render(Template.emoticons);
        };

        var btn = $(template.find('.add-smth-create'));

        btn.popover({
            html : true,
            placement : 'right',
            trigger : 'manual',
            content : generateEmoticons
        }).popover('show');

        $(template.find('.close')).one('click', function(){
            $(template.find('.popover')).remove();
        });   
    }
});

Template.newMessageForm.created = function(){
    var channel = postal.channel();
    var template = this;
    channel.subscribe('emoticon.add', function(emoticon){
        var textArea = $(template.find('.message'));
        textArea.attr('value',textArea.attr('value') + ' ' + 
            emoticon.name + ' ');

        $(template.find('.popover')).remove();
    });
};