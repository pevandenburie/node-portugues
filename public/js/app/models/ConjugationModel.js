// Model.js
// --------
define(["jquery", "backbone"],

    function($, Backbone) {

        var ConjuguingModel = Backbone.Model.extend({

          defaults: {
            conjugued: "..."
          },

          initialize: function() {
            this.conjuguingFunc = this.conjugueNoImperfeito;
          },

          // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
          validate: function(attrs) {
          },

          conjugueNoImperfeito: function(subject, verb) {
            this.set('conjugued', subject + " " + JsPortugues.noimperfeito(subject, verb));
            this.conjuguingFunc = this.conjugueNoImperfeito;
          },

          conjugueNoPreterito: function(subject, verb) {
            this.set('conjugued', subject + " " + JsPortugues.nopreterito(subject, verb));
            this.conjuguingFunc = this.conjugueNoPreterito;
          },

          conjugueNoPresenteDoConjunctivo: function(subject, verb) {
            this.set('conjugued', subject + " " + JsPortugues.nopresentedoconjunctivo(subject, verb));
            this.conjuguingFunc = this.conjugueNoPresenteDoConjunctivo;
          },

          conjugueNoImperfeitoDoConjunctivo: function(subject, verb) {
            this.set('conjugued', subject + " " + JsPortugues.noimperfeitodoconjunctivo(subject, verb));
            this.conjuguingFunc = this.conjugueNoImperfeitoDoConjunctivo;
          }
        });

        // Returns the ConjuguingModel class
        return ConjuguingModel;

    }

);
