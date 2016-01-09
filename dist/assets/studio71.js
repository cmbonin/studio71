"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('studio71/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'studio71/config/environment'], function (exports, Em, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Em['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Em['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default'],
    rootElement: '#studio71-app',

    // holds the sequence of pages
    // @property.sequence
    sequence: Em['default'].A({}),

    ready: function ready() {}
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('studio71/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'studio71/config/environment'], function (exports, AppVersionComponent, config) {

  'use strict';

  var _config$APP = config['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;

  exports['default'] = AppVersionComponent['default'].extend({
    version: version,
    name: name
  });

});
define('studio71/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('studio71/controllers/object', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('studio71/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'studio71/config/environment'], function (exports, initializerFactory, config) {

  'use strict';

  var _config$APP = config['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;

  exports['default'] = {
    name: 'App Version',
    initialize: initializerFactory['default'](name, version)
  };

});
define('studio71/initializers/export-application-global', ['exports', 'ember', 'studio71/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (config['default'].exportApplicationGlobal !== false) {
      var value = config['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember['default'].String.classify(config['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('studio71/modules/application/controller', ['exports', 'ember'], function (exports, Em) {

	'use strict';

	var ApplicationController = Em['default'].Controller.extend({});

	exports['default'] = ApplicationController;

});
define('studio71/modules/application/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 0
          }
        },
        "moduleName": "studio71/modules/application/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","wrapper");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h1");
        dom.setAttribute(el2,"id","site-title");
        var el3 = dom.createTextNode("Lulu's sweet animation studio");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]),3,3);
        return morphs;
      },
      statements: [
        ["content","outlet",["loc",[null,[4,0],[4,10]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('studio71/modules/components/audio-player/component', ['exports', 'ember'], function (exports, Em) {

  'use strict';

  exports['default'] = Em['default'].Component.extend({
    classNames: ['audio-player'],

    /**
     * ID assigned to the player element
     * @property.playerId
     */
    playerId: (function () {
      return 'player' + this.elementId;
    }).property().readOnly(),

    /**
     * Create audio player event listeners
     * @return void
     */
    didInsertElement: function didInsertElement() {
      var self = this,
          audioPlayer = document.getElementById(this.get('playerId'));

      if (audioPlayer) {
        audioPlayer.addEventListener('timeupdate', (function (e) {
          self.timeEventHandler(e);
        }).bind(self), false);
      }
    },

    /**
     * Check if current time equals a trigger
     *
     * @param  Object e Audio player event
     * @return void
     */
    timeEventHandler: function timeEventHandler(e) {
      var self = this,
          currentTime = Math.round(e.currentTarget.currentTime),
          triggers = this.get('triggers');

      triggers.forEach(function (item, index) {
        if (currentTime === Math.round(item)) {
          Em['default'].run.debounce(self, self.timeDebouncer, { index: index }, 500);
        }
      });
    },

    /**
     * Send event to controller
     * @return void
     */
    timeDebouncer: function timeDebouncer(params) {
      var hotspotIndex = params.index,
          control = this.get('control');
      if (control && control.audioTimeTrigger) {
        control.audioTimeTrigger(hotspotIndex);
      }
    }

  });

});
define('studio71/modules/components/audio-player/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 8
          }
        },
        "moduleName": "studio71/modules/components/audio-player/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("audio");
        dom.setAttribute(el1,"controls","");
        var el2 = dom.createTextNode("\n ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("source");
        dom.setAttribute(el2,"type","audio/mpeg");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1]);
        var morphs = new Array(2);
        morphs[0] = dom.createAttrMorph(element0, 'id');
        morphs[1] = dom.createAttrMorph(element1, 'src');
        return morphs;
      },
      statements: [
        ["attribute","id",["get","playerId",["loc",[null,[1,12],[1,20]]]]],
        ["attribute","src",["get","content",["loc",[null,[2,15],[2,22]]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('studio71/modules/components/info-hotspot/component', ['exports', 'ember'], function (exports, Em) {

  'use strict';

  exports['default'] = Em['default'].Component.extend({
    classNames: ['info-hotspot'],
    classNameBindings: ['highlight'],
    attributeBindings: ['style'],

    highlight: Em['default'].computed.oneWay('content.highlighted'),

    // popup visibility
    isShowing: false,

    xPos: Em['default'].computed.oneWay('content.xPos'),

    yPos: Em['default'].computed.oneWay('content.xPos'),

    /**
     * Use the data to postiion the hotspot
     * @property.style
     */
    style: (function () {
      var styles = Object.create({}),
          styleString = '';

      styles.left = this.get('xPos') + 'px';
      styles.top = this.get('yPos') + 'px';

      for (var item in styles) {
        if (styles.hasOwnProperty(item)) {
          styleString += item + ':' + styles[item] + ';';
        }
      }
      return Em['default'].String.htmlSafe(styleString);
    }).property(),

    actions: {
      toggleModal: function toggleModal() {
        this.toggleProperty('isShowing');
      }
    }
  });

});
define('studio71/modules/components/info-hotspot/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@2.0.1",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 0
            },
            "end": {
              "line": 4,
              "column": 0
            }
          },
          "moduleName": "studio71/modules/components/info-hotspot/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          return morphs;
        },
        statements: [
          ["inline","pop-up",[],["content",["subexpr","@mut",[["get","content",["loc",[null,[3,19],[3,26]]]]],[],[]],"showing",["subexpr","@mut",[["get","isShowing",["loc",[null,[3,35],[3,44]]]]],[],[]]],["loc",[null,[3,2],[3,46]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@2.0.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 7
          }
        },
        "moduleName": "studio71/modules/components/info-hotspot/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("button");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(3);
        morphs[0] = dom.createElementMorph(element0);
        morphs[1] = dom.createMorphAt(element0,0,0);
        morphs[2] = dom.createMorphAt(fragment,2,2,contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["element","action",["toggleModal"],[],["loc",[null,[1,8],[1,32]]]],
        ["content","content.title",["loc",[null,[1,33],[1,50]]]],
        ["block","if",[["get","isShowing",["loc",[null,[2,6],[2,15]]]]],[],0,null,["loc",[null,[2,0],[4,7]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('studio71/modules/components/pop-up/component', ['exports', 'ember'], function (exports, Em) {

	'use strict';

	var PopupComponent = Em['default'].Component.extend({
		needs: ['application'],
		classNames: ['pop-up'],
		attributeBindings: ['style'],

		visible: Em['default'].computed.alias('showing'),

		originElement: Em['default'].computed.alias('parentView'),

		originOffset: (function () {
			return this.get('originElement').$().offset();
		}).property(),

		willInsertElement: function willInsertElement() {
			// remove all the other pop ups
			Em['default'].$('.pop-up').remove();
		},

		didInsertElement: function didInsertElement() {
			var attachTo = this.container.lookup('application:main').get('rootElement') || 'body';
			// appent to body so we can use absolute poistioning
			Em['default'].$(attachTo).append(this.$());
		},

		/**
	  * Creates a string of inline styles to position the pop up
	  * @property.style
	  */
		style: (function () {
			var styles = Object.create({}),
			    styleString = '',
			    originWidth = Number(this.get('originElement').$().css('width').split('px')[0]);

			styles.left = this.get('originOffset.left') + originWidth + 'px';
			styles.top = this.get('originOffset.top') + 'px';

			for (var item in styles) {
				if (styles.hasOwnProperty(item)) {
					styleString += item + ':' + styles[item] + ';';
				}
			}
			return Em['default'].String.htmlSafe(styleString);
		}).property(),

		/**
	  * Use the data to postiion the hotspot
	  * @property.imageUrl
	  */
		imageUrl: (function () {
			return 'assets/' + this.get('content.image');
		}).property(),

		actions: {
			closePopUp: function closePopUp() {
				var self = this;
				Em['default'].$('.pop-up').fadeOut(400, function () {
					self.set('visible', false);
				});
			}
		}
	});

	exports['default'] = PopupComponent;

});
define('studio71/modules/components/pop-up/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@2.0.1",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 0
            },
            "end": {
              "line": 6,
              "column": 0
            }
          },
          "moduleName": "studio71/modules/components/pop-up/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","image");
          var el2 = dom.createElement("img");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1, 0]);
          var morphs = new Array(1);
          morphs[0] = dom.createAttrMorph(element0, 'src');
          return morphs;
        },
        statements: [
          ["attribute","src",["get","imageUrl",["loc",[null,[5,31],[5,39]]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@2.0.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 0
          }
        },
        "moduleName": "studio71/modules/components/pop-up/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","close-popup");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","description");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [0]);
        var morphs = new Array(4);
        morphs[0] = dom.createElementMorph(element1);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2]),0,0);
        morphs[2] = dom.createMorphAt(dom.childAt(fragment, [4]),0,0);
        morphs[3] = dom.createMorphAt(fragment,6,6,contextualElement);
        return morphs;
      },
      statements: [
        ["element","action",["closePopUp"],[],["loc",[null,[1,25],[1,48]]]],
        ["content","content.title",["loc",[null,[2,4],[2,21]]]],
        ["content","content.description",["loc",[null,[3,25],[3,48]]]],
        ["block","if",[["get","content.image",["loc",[null,[4,6],[4,19]]]]],[],0,null,["loc",[null,[4,0],[6,7]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('studio71/modules/introduction/controller', ['exports', 'ember'], function (exports, Em) {

	'use strict';

	var IntroductionController = Em['default'].Controller.extend({

		init: function init() {
			this._super();
		},

		// hotspots: Em.computed.alias('content.hotspots'),
		hotspots: (function () {
			var hs = this.get('content.hotspots');
			hs.forEach(function (item) {
				item.highlighted = false;
			});
			return hs;
		}).property(),

		/**
	  * Fetches the time triggers for each hotspot
	  * Used by the audio player
	  * @property.hotspotTriggers
	  */
		hotspotTriggers: (function () {
			var times = Em['default'].A(),
			    hotspots = this.get('hotspots');

			if (Em['default'].isArray(hotspots)) {
				hotspots.forEach(function (item) {
					if (item.trigger) {
						times.push(item.trigger);
					}
				});
			}
			return times;
		}).property(),

		/**
	  * Fired from audio player component when time matches hotspot sequence point
	  *
	  * @param  Number i Index of the hotpot to trigger
	  * @return void
	  */
		audioTimeTrigger: function audioTimeTrigger(i) {
			// do nothing if we have no index
			if (i === undefined) {
				return false;
			}

			this.highlightHotspot(i);
		},

		/**
	  * Set hotspot highlighted property to true temporarily
	  * @return void
	  */
		highlightHotspot: function highlightHotspot(i) {
			var self = this,
			    hotspotIndex = i,
			    hotspots = this.get('hotspots'),
			    hotspot = {};
			if (hotspots && hotspots[hotspotIndex]) {
				hotspot = hotspots[hotspotIndex];
				Em['default'].set(hotspot, 'highlighted', true);
				Em['default'].run.later(self, function () {
					Em['default'].set(hotspot, 'highlighted', false);
				}, 5000);
			}
		}

	});

	exports['default'] = IntroductionController;

});
define('studio71/modules/introduction/model', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    title: DS['default'].attr('string'),
    body: DS['default'].attr('string'),
    audio: DS['default'].attr('string'),
    hostpots: DS['default'].hasMany('hotspot')
  });

});
define('studio71/modules/introduction/route', ['exports', 'ember'], function (exports, Em) {

	'use strict';

	exports['default'] = Em['default'].Route.extend({
		model: function model() {
			return Em['default'].$.getJSON('data/intro.json').then(function (data) {
				return data;
			});
		},

		setupController: function setupController(controller, model) {
			controller.set('content', model);
		}
	});

});
define('studio71/modules/introduction/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@2.0.1",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 1
            },
            "end": {
              "line": 6,
              "column": 1
            }
          },
          "moduleName": "studio71/modules/introduction/template.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          return morphs;
        },
        statements: [
          ["inline","info-hotspot",[],["content",["subexpr","@mut",[["get","hotspot",["loc",[null,[5,25],[5,32]]]]],[],[]],"highlighted",["subexpr","@mut",[["get","highlighted",["loc",[null,[5,45],[5,56]]]]],[],[]]],["loc",[null,[5,2],[5,58]]]]
        ],
        locals: ["hotspot"],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@2.0.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 11,
            "column": 0
          }
        },
        "moduleName": "studio71/modules/introduction/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","instruction-hotspots");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]),0,0);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2]),1,1);
        morphs[2] = dom.createMorphAt(fragment,4,4,contextualElement);
        return morphs;
      },
      statements: [
        ["content","model.title",["loc",[null,[1,4],[1,19]]]],
        ["block","each",[["get","hotspots",["loc",[null,[4,9],[4,17]]]]],[],0,null,["loc",[null,[4,1],[6,10]]]],
        ["inline","audio-player",[],["content",["subexpr","@mut",[["get","model.audio",["loc",[null,[8,23],[8,34]]]]],[],[]],"triggers",["subexpr","@mut",[["get","hotspotTriggers",["loc",[null,[8,44],[8,59]]]]],[],[]],"control",["subexpr","@mut",[["get","this",["loc",[null,[8,68],[8,72]]]]],[],[]]],["loc",[null,[8,0],[8,74]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('studio71/modules/splash/controller', ['exports', 'ember'], function (exports, Em) {

	'use strict';

	var SplashController = Em['default'].Controller.extend({
		actions: {
			startIntro: function startIntro() {
				this.transitionToRoute('introduction');
			}
		}
	});

	exports['default'] = SplashController;

});
define('studio71/modules/splash/model', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    title: DS['default'].attr('string'),
    body: DS['default'].attr('string')
  });

});
define('studio71/modules/splash/route', ['exports', 'ember'], function (exports, Em) {

	'use strict';

	exports['default'] = Em['default'].Route.extend({
		model: function model() {
			return Em['default'].$.getJSON('data/splash.json').then(function (data) {
				return data;
			});
		}
	});

});
define('studio71/modules/splash/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 0
          }
        },
        "moduleName": "studio71/modules/splash/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","content");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Start introduction");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [4]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]),0,0);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2]),1,1);
        morphs[2] = dom.createElementMorph(element0);
        return morphs;
      },
      statements: [
        ["content","model.title",["loc",[null,[1,4],[1,19]]]],
        ["content","model.body",["loc",[null,[3,1],[3,15]]]],
        ["element","action",["startIntro"],[],["loc",[null,[5,8],[5,31]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('studio71/router', ['exports', 'ember', 'studio71/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  exports['default'] = Router.map(function () {
    this.route('introduction');
    this.route('splash', { path: '/' });
  });

});
define('studio71/tests/app.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('app.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.'); 
  });

});
define('studio71/tests/helpers/resolver', ['exports', 'ember/resolver', 'studio71/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('studio71/tests/helpers/resolver.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/resolver.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('studio71/tests/helpers/start-app', ['exports', 'ember', 'studio71/app', 'studio71/config/environment'], function (exports, Ember, Application, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('studio71/tests/helpers/start-app.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/start-app.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('studio71/tests/integration/modules/components/audio-player/component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('audio-player', 'Integration | Component | audio player', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.0.1',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 16
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'audio-player', ['loc', [null, [1, 0], [1, 16]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'revision': 'Ember@2.0.1',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'revision': 'Ember@2.0.1',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'audio-player', [], [], 0, null, ['loc', [null, [2, 4], [4, 21]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('studio71/tests/integration/modules/components/audio-player/component-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/modules/components/audio-player');
  QUnit.test('integration/modules/components/audio-player/component-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'integration/modules/components/audio-player/component-test.js should pass jshint.'); 
  });

});
define('studio71/tests/integration/modules/components/info-hotspot/component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('info-hotspot', 'Integration | Component | info hotspot', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.0.1',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 16
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'info-hotspot', ['loc', [null, [1, 0], [1, 16]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'revision': 'Ember@2.0.1',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'revision': 'Ember@2.0.1',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'info-hotspot', [], [], 0, null, ['loc', [null, [2, 4], [4, 21]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('studio71/tests/integration/modules/components/info-hotspot/component-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/modules/components/info-hotspot');
  QUnit.test('integration/modules/components/info-hotspot/component-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'integration/modules/components/info-hotspot/component-test.js should pass jshint.'); 
  });

});
define('studio71/tests/integration/modules/components/pop-up/component-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('pop-up', 'Integration | Component | pop up', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.0.1',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 10
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'pop-up', ['loc', [null, [1, 0], [1, 10]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'revision': 'Ember@2.0.1',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'revision': 'Ember@2.0.1',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'pop-up', [], [], 0, null, ['loc', [null, [2, 4], [4, 15]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });

});
define('studio71/tests/integration/modules/components/pop-up/component-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/modules/components/pop-up');
  QUnit.test('integration/modules/components/pop-up/component-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'integration/modules/components/pop-up/component-test.js should pass jshint.'); 
  });

});
define('studio71/tests/modules/application/controller.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/application');
  QUnit.test('modules/application/controller.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'modules/application/controller.js should pass jshint.'); 
  });

});
define('studio71/tests/modules/components/audio-player/component.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/components/audio-player');
  QUnit.test('modules/components/audio-player/component.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'modules/components/audio-player/component.js should pass jshint.'); 
  });

});
define('studio71/tests/modules/components/info-hotspot/component.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/components/info-hotspot');
  QUnit.test('modules/components/info-hotspot/component.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'modules/components/info-hotspot/component.js should pass jshint.'); 
  });

});
define('studio71/tests/modules/components/pop-up/component.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/components/pop-up');
  QUnit.test('modules/components/pop-up/component.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'modules/components/pop-up/component.js should pass jshint.'); 
  });

});
define('studio71/tests/modules/introduction/controller.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/introduction');
  QUnit.test('modules/introduction/controller.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'modules/introduction/controller.js should pass jshint.'); 
  });

});
define('studio71/tests/modules/introduction/model.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/introduction');
  QUnit.test('modules/introduction/model.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'modules/introduction/model.js should pass jshint.'); 
  });

});
define('studio71/tests/modules/introduction/route.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/introduction');
  QUnit.test('modules/introduction/route.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'modules/introduction/route.js should pass jshint.'); 
  });

});
define('studio71/tests/modules/splash/controller.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/splash');
  QUnit.test('modules/splash/controller.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'modules/splash/controller.js should pass jshint.'); 
  });

});
define('studio71/tests/modules/splash/model.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/splash');
  QUnit.test('modules/splash/model.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'modules/splash/model.js should pass jshint.'); 
  });

});
define('studio71/tests/modules/splash/route.jshint', function () {

  'use strict';

  QUnit.module('JSHint - modules/splash');
  QUnit.test('modules/splash/route.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'modules/splash/route.js should pass jshint.'); 
  });

});
define('studio71/tests/router.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('router.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.'); 
  });

});
define('studio71/tests/test-helper', ['studio71/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('studio71/tests/test-helper.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('test-helper.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('studio71/tests/unit/introduction/model-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('introduction', 'Unit | Model | introduction', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('studio71/tests/unit/introduction/model-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/introduction');
  QUnit.test('unit/introduction/model-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/introduction/model-test.js should pass jshint.'); 
  });

});
define('studio71/tests/unit/introduction/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:introduction', 'Unit | Route | introduction', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('studio71/tests/unit/introduction/route-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/introduction');
  QUnit.test('unit/introduction/route-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/introduction/route-test.js should pass jshint.'); 
  });

});
define('studio71/tests/unit/modules/introduction/model-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('introduction', 'Unit | Model | introduction', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('studio71/tests/unit/modules/introduction/model-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/modules/introduction');
  QUnit.test('unit/modules/introduction/model-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/modules/introduction/model-test.js should pass jshint.'); 
  });

});
define('studio71/tests/unit/modules/introduction/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:introduction', 'Unit | Route | introduction', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('studio71/tests/unit/modules/introduction/route-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/modules/introduction');
  QUnit.test('unit/modules/introduction/route-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/modules/introduction/route-test.js should pass jshint.'); 
  });

});
define('studio71/tests/unit/modules/splash/model-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('splash', 'Unit | Model | splash', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('studio71/tests/unit/modules/splash/model-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/modules/splash');
  QUnit.test('unit/modules/splash/model-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/modules/splash/model-test.js should pass jshint.'); 
  });

});
define('studio71/tests/unit/modules/splash/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:splash', 'Unit | Route | splash', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('studio71/tests/unit/modules/splash/route-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/modules/splash');
  QUnit.test('unit/modules/splash/route-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/modules/splash/route-test.js should pass jshint.'); 
  });

});
define('studio71/tests/unit/modules/test/model-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('test', 'Unit | Model | test', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('studio71/tests/unit/modules/test/model-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/modules/test');
  QUnit.test('unit/modules/test/model-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/modules/test/model-test.js should pass jshint.'); 
  });

});
define('studio71/tests/unit/modules/test/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:test', 'Unit | Route | test', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('studio71/tests/unit/modules/test/route-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/modules/test');
  QUnit.test('unit/modules/test/route-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/modules/test/route-test.js should pass jshint.'); 
  });

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('studio71/config/environment', ['ember'], function(Ember) {
  var prefix = 'studio71';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("studio71/tests/test-helper");
} else {
  require("studio71/app")["default"].create({"name":"studio71","version":"0.0.0+05fd342a"});
}

/* jshint ignore:end */
//# sourceMappingURL=studio71.map