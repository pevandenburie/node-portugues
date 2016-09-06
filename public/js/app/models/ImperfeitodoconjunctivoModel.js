// ImperfeitodoconjunctivoModel.js
// --------
define(["jquery", "backbone", "jsportugues", "models/ExoModel"],

  function($, Backbone, JsPortugues, ExoModel) {


    var ImperfeitodoconjunctivoModel = new (ExoModel.extend({
      createQuestion: JsPortugues.exercises.imperfeitodoconjunctivo.createQuestion
    }))({
      title: "Exo Imperfeito do Conjunctivo",
    });

    return ImperfeitodoconjunctivoModel;
  }

);
