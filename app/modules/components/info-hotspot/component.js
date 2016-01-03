import Em from 'ember';

export default Em.Component.extend({
	classNames: ['info-hotspot'],
  classNameBindings: ['highlight'],
	attributeBindings: ['style'],

  highlight: Em.computed.oneWay('content.highlighted'),

  // popup visibility
  isShowing: false,

  xPos: Em.computed.oneWay('content.xPos'),

  yPos: Em.computed.oneWay('content.xPos'),

  /**
   * Use the data to postiion the hotspot
   * @property.style
   */
	style: function() {
  	var styles = Object.create({}),
		  	styleString = '';

  	styles.left = this.get('xPos') + 'px';
  	styles.top = this.get('yPos') + 'px';

  	for (let item in styles) {
  		if (styles.hasOwnProperty(item)) {
  			styleString += item + ':' + styles[item] + ';';
  		}
  	}
  	return Em.String.htmlSafe(styleString);
  }.property(),

  actions: {
    toggleModal: function() {
      this.toggleProperty('isShowing');
    }
  }
});
