Meteor.publish("people", function () {
	return Meteor.users.find();
});

Meteor.publish("messages", function () {
	return Messages.find({}, {sort: {created: -1}});
});