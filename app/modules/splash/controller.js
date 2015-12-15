import Em from 'ember';

var SplashController = Em.Controller.extend({
	actions: {
		startIntro: function () {
			this.transitionToRoute('introduction');
		}
	}
});

export default SplashController;