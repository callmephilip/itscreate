Template.listMessages.messages = function(){
    return Messages.find({}, {sort: {created: -1}});
};