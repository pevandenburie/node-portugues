(function(root, factory) {

  // Set up JsPortugues appropriately for the environment. Start with AMD.
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'exports'], function(_, exports) {
      // Export global even in AMD case in case this script is loaded with
      // others that may still expect a global JsPortugues.
      root.JsPortugues = factory(root, exports, _);
    });

  // Next for Node.js or CommonJS. jQuery may not be needed as a module.
  } else if (typeof exports !== 'undefined') {
    var _ = require('underscore');
    factory(root, exports, _);

  // Finally, as a browser global.
  } else {
    root.JsPortugues = factory(root, {}, root._);
  }

}(this, function(root, JsPortugues, _) {

  // Initial Setup
  // -------------

  // Save the previous value of the `JsPortugues` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousJsPortugues = root.JsPortugues;

  // Create local references to array methods we'll want to use later.
  // var array = [];
  // var push = array.push;
  // var slice = array.slice;
  // var splice = array.splice;

  // Current version of the library. Keep in sync with `package.json`.
  JsPortugues.VERSION = '1.0.0';

  // Runs Backbone.js in *noConflict* mode, returning the `JsPortugues` variable
  // to its previous owner. Returns a reference to this JsPortugues object.
  JsPortugues.noConflict = function() {
    root.JsPortugues = previousJsPortugues;
    return this;
  };


  var subjectTerminaisonIndexes = {
  	"eu" : 0,
  	"tu" : 1,
  	"voce" : 2,
  	"ele" : 2,
  	"ela" : 2,
  	"nos" : 3,
  	"voces" : 4,
  	"eles" : 4,
  	"elas" : 4
  }

  var subjects = JsPortugues.subjects = _(subjectTerminaisonIndexes).keys();

  return JsPortugues;

}));
