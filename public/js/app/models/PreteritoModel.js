// PreteritoModel.js
// --------
define(["jquery", "backbone", "jsportugues", "models/ExoModel"],

  function($, Backbone, JsPortugues, ExoModel) {

    var PreteritoModel = new (ExoModel.extend({
      createQuestion: JsPortugues.exercises.preterito.createQuestion
    }))({
      title: "Exo Preterito do Indicativo",
    });

    return PreteritoModel;
  }

);
