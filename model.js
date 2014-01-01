
// Message

Messages = new Meteor.Collection("messages");

Messages.allow({
  insert: function (userId, message) {
    return false; // cannot insert the message directly
  }
});

sendMessage = function (options) {
  Meteor.call('sendMessage',options);
};

var NonEmptyString = Match.Where(function (x) {
  check(x, String);
  return x.length !== 0;
});

Meteor.methods({
	sendMessage : function (options) {
		check(options, {
			message : NonEmptyString,
			sender : Match.Where(function(s){ return true; })
		});
		
		var id = Random.id();
	
		Messages.insert(_.extend({ _id: id, created : new Date() }, options));

		return id;
	}
});


// People

getProfileImage = function(person){
	return "http://graph.facebook.com/" +
		person.services.facebook.id +
		"/picture?width=100&height=100";
};
