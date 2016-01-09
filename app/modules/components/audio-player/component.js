import Em from 'ember';

export default Em.Component.extend({
	classNames: ['audio-player'],

  /**
   * ID assigned to the player element
   * @property.playerId
   */
   playerId: function() {
   	return 'player' + this.elementId;
   }.property().readOnly(),

  /**
   * Create audio player event listeners
   * @return void
   */
	didInsertElement: function() {
		var self = this,
				audioPlayer = document.getElementById(this.get('playerId'));

		if(audioPlayer) {
			audioPlayer.addEventListener('timeupdate', function(e) {
				self.timeEventHandler(e);
			}.bind(self), false);
		}
  },

  /**
   * Check if current time equals a trigger
   *
   * @param  Object e Audio player event
   * @return void
   */
  timeEventHandler: function(e) {
  	var self = this,
  			currentTime = Math.round(e.currentTarget.currentTime),
				triggers = this.get('triggers');

  	triggers.forEach(function(item, index) {
			if(currentTime === Math.round(item)) {
				Em.run.debounce(self, self.timeDebouncer, {index}, 500);
			}
		});
  },

  /**
   * Send event to controller
   * @return void
   */
  timeDebouncer: function(params) {
  	var hotspotIndex = params.index,
  			control = this.get('control');
  	if(control && control.audioTimeTrigger) {
			control.audioTimeTrigger(hotspotIndex);
  	}
  }

});
