// PresentedoconjunctivoModel.js
// --------
define(["jquery", "backbone", "jsportugues", "models/ExoModel"],

  function($, Backbone, JsPortugues, ExoModel) {


    var PresentedoconjunctivoModel = new (ExoModel.extend({
      createQuestion: JsPortugues.exercises.presentedoconjunctivo.createQuestion
    }))({
      title: "Exo Presente do Conjunctivo",
    });

    return PresentedoconjunctivoModel;
  }

);
