import Em from 'ember';

var IntroductionController = Em.Controller.extend({

	init: function () {
		this._super();
	},

	// hotspots: Em.computed.alias('content.hotspots'),
	hotspots: function() {
		var hs = this.get('content.hotspots');
		hs.forEach(function(item) {
			item.highlighted = false;
		});
		return hs;
	}.property(),

  /**
   * Fetches the time triggers for each hotspot
   * Used by the audio player
   * @property.hotspotTriggers
   */
	hotspotTriggers: function (){
		var times = Em.A(),
				hotspots = this.get('hotspots');

		if(Em.isArray(hotspots)){
			hotspots.forEach(function (item) {
				if (item.trigger){
					times.push(item.trigger);
				}
			});
		}
		return times;
	}.property(),

	/**
	 * Fired from audio player component when time matches hotspot sequence point
	 *
	 * @param  Number i Index of the hotpot to trigger
	 * @return void
	 */
	audioTimeTrigger: function(i) {
		// do nothing if we have no index
		if(i === undefined){ return false;}

		this.highlightHotspot(i);
	},

	/**
	 * Set hotspot highlighted property to true temporarily
	 * @return void
	 */
	highlightHotspot: function(i) {
		var self = this,
				hotspotIndex = i,
				hotspots = this.get('hotspots'),
				hotspot = {};
		if(hotspots && hotspots[hotspotIndex]) {
			hotspot = hotspots[hotspotIndex];
			Em.set(hotspot, 'highlighted', true);
			Em.run.later(self, function() {
				Em.set(hotspot, 'highlighted', false);
			}, 5000);
		}
	}

});

export default IntroductionController;