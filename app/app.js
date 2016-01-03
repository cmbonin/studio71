import Em from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

var App;

Em.MODEL_FACTORY_INJECTIONS = true;

App = Em.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver,
 	rootElement: '#studio71-app',

	// holds the sequence of pages
  // @property.sequence
  sequence: Em.A({}),


  ready: function () {

  }
});

loadInitializers(App, config.modulePrefix);

export default App;
