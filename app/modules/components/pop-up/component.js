import Em from 'ember';

var PopupComponent = Em.Component.extend({
	needs: ['application'],
	classNames: ['pop-up'],
	attributeBindings: ['style'],

	visible: Em.computed.alias('showing'),

	originElement: Em.computed.alias('parentView'),

	originOffset: function () {
		return this.get('originElement').$().offset();
	}.property(),

	willInsertElement: function (){
		// remove all the other pop ups
		Em.$('.pop-up').remove();
	},

	didInsertElement: function() {
		var attachTo = this.container.lookup('application:main').get('rootElement')||'body';
		// appent to body so we can use absolute poistioning
		Em.$(attachTo).append(this.$());
	},

  /**
   * Creates a string of inline styles to position the pop up
   * @property.style
   */
	style: function() {
		var styles = Object.create({}),
				styleString = '',
				originWidth = Number(this.get('originElement').$().css('width').split('px')[0]);

		styles.left = this.get('originOffset.left') + originWidth + 'px';
		styles.top = this.get('originOffset.top') + 'px';

		for (let item in styles) {
			if (styles.hasOwnProperty(item)) {
				styleString += item + ':' + styles[item] + ';';
			}
		}
		return Em.String.htmlSafe(styleString);
	}.property(),

  /**
   * Use the data to postiion the hotspot
   * @property.imageUrl
   */
   imageUrl: function (){
   	return 'assets/' + this.get('content.image');
   }.property(),

   actions: {
   	closePopUp: function () {
   		var self = this;
   		Em.$('.pop-up').fadeOut(400, function (){
   			self.set('visible', false);
   		});
   	}
   }
 });

export default PopupComponent;