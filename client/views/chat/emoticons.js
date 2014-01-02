Template.emoticons.icons = function () {
	return _.sample(Emoticons.all, 60);
};

Template.emoticons.events = {
	'click .emoticon-image' : function(e){
		
		console.log('emoticon is clicked');

		postal.publish({
			topic : 'emoticon.add',
			data : { name : $(e.currentTarget).data('name') }
		});
	}
};