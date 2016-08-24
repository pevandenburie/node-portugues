//
// Portugues Imperfeito do Conjunctivo exercise
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

var verbs = _.union(_(imperfeitodoconjunctivoIrregulares).keys(), verbList);

// Init of the question
JsPortugues.exercises.imperfeitodoconjunctivo = {
  createQuestion: function() {
    return new RandomQuestion(verbs, JsPortugues.noimperfeitodoconjunctivo);
  }
};
