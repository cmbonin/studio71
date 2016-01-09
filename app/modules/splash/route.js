import Em from 'ember';

export default Em.Route.extend({
	model: function() {
		return Em.$.getJSON('data/splash.json').then(function(data){
			return data;
		});
	}
});
