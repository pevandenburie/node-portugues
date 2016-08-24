//
// Portugues Presente do Conjunctivo exercise
//

var verbList = [
  "abrir",
  "beber",
  "buscar",
  "cantar",
  "correr",
  "cair",
  "descansar",
  "falar"
  ];

var verbs = _.union(_(presentedoconjunctivoAlteredRadical).keys(), _(presentedoconjunctivoIrregulares).keys(), verbList);

// Init of the question
JsPortugues.exercises.presentedoconjunctivo = {
  createQuestion: function() {
    return new RandomQuestion(verbs, JsPortugues.nopresentedoconjunctivo);
  }
};
