//
// Portugues Preterito exercise
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

var verbs = _.union(_(preteritoIrregulares).keys(), verbList);

// Init of the question
JsPortugues.exercises.preterito = {
  createQuestion: function() {
    return new RandomQuestion(verbs, JsPortugues.nopreterito);
  }
};
