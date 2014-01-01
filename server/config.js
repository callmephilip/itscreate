Accounts.loginServiceConfiguration.remove({
	service: "facebook"
});

Accounts.loginServiceConfiguration.insert({
	service: "facebook",
	appId: Meteor.settings.facebook.appId,
	secret: Meteor.settings.facebook.secret
});