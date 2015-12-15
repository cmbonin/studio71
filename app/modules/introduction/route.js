import Em from 'ember';

export default Ember.Route.extend({
	model: function() {
		return Em.$.getJSON('/data/intro.json').then(function(data){
			return data;
		});
	},

	setupController: function(controller, model) {
    controller.set('content', model);
  }
});
