import Em from 'ember';

export default Em.Component.extend({
	classNames: ['hotspot'],
	attributeBindings: ['style'],

	style: function() {
  	var styles = Object.create({}),
		  	styleString = '';

  	styles.left = this.get('content.xPos') + 'px';
  	styles.top = this.get('content.yPos') + 'px';

  	for (let item in styles) {
  		if (styles.hasOwnProperty(item)) {
  			styleString += item + ':' + styles[item] + ';';
  		}
  	}
  	return Em.String.htmlSafe(styleString);
  }.property()
});
