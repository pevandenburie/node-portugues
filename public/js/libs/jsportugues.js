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


  //
  //  Generic verb functions
  //

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


  JsPortugues.subjects = _.keys(subjectTerminaisonIndexes);


  // Verb constructor
  var Verb = function(infinitive) {
    this.infinitive = infinitive;
  };

  Verb.prototype.toString = function() {
  	return this.infinitive;
  };

  // Return the radical of the verb
  Verb.prototype.radical = function() {
    return this.infinitive.slice(0, -2);
  };

  // return the group number of the verb
  Verb.prototype.group = function() {
  	if (this.infinitive.slice(this.infinitive.length-2) === "ar") {
  			return 1;
  	}
  	else if (this.infinitive.slice(this.infinitive.length-2) === "er") {
  			return 2;
  	}
  	else if (this.infinitive.slice(this.infinitive.length-2) === "ir") {
  			return 3;
  	}
  	else {
  			console.log("No group for verb \""+ this.infinitive +"\" !");
  			return undefined;
  	}
  };


  //
  // Portugues Imperfeito conjuging function
  //

  Verb.prototype.noimperfeito = function(subject) {
  	if (_(imperfeitoirregulares).has(this.infinitive)) {
  		return (imperfeitoirregulares[this.infinitive])[subjectTerminaisonIndexes[subject]];
  	}
  	else {
  		return this.radical() + imperfeitoterminaison(subject, this);
  	}
  };

  // Entry point for imperfeito conjuging
  JsPortugues.noimperfeito = function(subject, infinitive) {
  	var verb = new Verb(infinitive);
  	return verb.noimperfeito(subject);
  }


  var imperfeitoterminaisonsgroup1 = {
  			"eu" : "ava",
  			"tu" : "avas",
  			"voce" : "ava",
  			"ele" : "ava",
  			"ela" : "ava",
  			"nos" : "avamos",
  			"voces" : "avam",
  			"eles" : "avam",
  			"elas" : "avam"
  	};

  var imperfeitoterminaisonsgroup2 = {
  			"eu" : "ia",
  			"tu" : "ias",
  			"voce" : "ia",
  			"ele" : "ia",
  			"ela" : "ia",
  			"nos" : "iamos",
  			"voces" : "iam",
  			"eles" : "iam",
  			"elas" : "iam"
  	};

  var imperfeitoterminaisonsgroup3 = imperfeitoterminaisonsgroup2;

  function imperfeitoterminaison(subject, verb) {
  	if (_(imperfeitoterminaisonsgroup1).has(subject)) {
  			if (1 == verb.group()) {
  					return imperfeitoterminaisonsgroup1[subject];
  			}
  			else if (2 == verb.group()) {
  					return imperfeitoterminaisonsgroup2[subject];
  			}
  			else if (3 == verb.group()) {
  					return imperfeitoterminaisonsgroup3[subject];
  			}
  	}
  }

  var imperfeitoirregulares = {
  			"ser" : ["era", "eras", "era", "éramos", "eram"],
  			"ter" : ["tinha", "tinhas", "tinha", "tinhamos", "tinham"],
  			"vir" : ["vinha", "vinhas", "vinha", "vinhamos", "vinham"],
  			"por" : ["punha", "punhas", "punha", "punhamos", "punham"]
  };


  //
  // Portugues Preterito conjuging function
  //

  Verb.prototype.nopreterito = function(subject) {
      if (_(preteritoIrregulares).has(this.infinitive)) {
          return (preteritoIrregulares[this.infinitive])[ subjectTerminaisonIndexes[subject] ];
      }
      else {
          return this.radical() + getpreteritoterminaison(subject, this);
      }
  }

  // Entry point for preterito conjuging
  JsPortugues.nopreterito = function(subject, infinitive) {
    var verb = new Verb(infinitive);
    return verb.nopreterito(subject);
  }


  var preteritoTerminaisonsGroup1 = ["ei", "aste", "ou", "ámos", "aram"];

  var preteritoTerminaisonsGroup2 = ["i", "este", "eu", "emos", "eram"];

  var preteritoTerminaisonsGroup3 = ["i", "iste", "iu", "imos", "iram"];


  var preteritoIrregulares =  {
          "dar" : ["dei", "deste", "deu", "demos", "deram"],
          "estar" : ["estive", "estiveste", "esteve", "estivemos", "estiveram"],
          "ser" : ["fui", "foste", "foi", "fomos", "foram"],
          "ir" : ["fui", "foste", "foi", "fomos", "foram"],
          "ter" : ["tive", "tiveste", "teve", "tivemos", "tiveram"],
          "vir" : ["vim", "vieste", "veio", "viemos", "vieram"],
          "ler" : ["li", "leste", "leu", "lemos", "leram"],
          "ver" : ["vi", "viste", "viu", "vimos", "viram"],
          "dizer" : ["disse", "disseste", "disse", "dissemos", "disseram"],
          "fazer" : ["fiz", "fizeste", "fez", "fizemos", "fizeram"],
          "trazer" : ["trouxe", "trouxeste", "trouxe", "trouxemos", "trouxeram"],
          "poder" : ["pude", "pudeste", "pôde", "pudemos", "puderam"],
          "saber" : ["soube", "soubeste", "soube", "soubemos", "souberam"],
          "pôr" : ["pus", "puseste", "pôs", "pusemos", "puseram"],
          "querer" : ["quis", "quiseste", "quis", "quisemos", "quiseram"],
          "sair" : ["saí", "saíste", "saiu", "saímos", "saíram"]
      };

  function getpreteritoterminaison(subject, verb) {
      if (1 == verb.group()) {
          return preteritoTerminaisonsGroup1[subjectTerminaisonIndexes[subject]];
      }
      else if (2 == verb.group()) {
          return preteritoTerminaisonsGroup2[subjectTerminaisonIndexes[subject]];
      }
      else if (3 == verb.group()) {
          return preteritoTerminaisonsGroup3[subjectTerminaisonIndexes[subject]];
      }
  }


  //
  // Portugues Present do Conjunctivo conjuging function
  //

  Verb.prototype.nopresentedoconjunctivo = function(subject) {
      if (_(presentedoconjunctivoAlteredRadical).has(this.infinitive)) {
          return presentedoconjunctivoAlteredRadical[this.infinitive] + getpresentedoconjunctivoterminaison(subject, this);
      }
      else if (_(presentedoconjunctivoIrregulares).has(this.infinitive)) {
          return (presentedoconjunctivoIrregulares[this.infinitive])[ subjectTerminaisonIndexes[subject] ];
      }
      else {
          return this.radical() + getpresentedoconjunctivoterminaison(subject, this);
      }
  }

  JsPortugues.nopresentedoconjunctivo = function(subject, infinitive) {
    var verb = new Verb(infinitive);
    return verb.nopresentedoconjunctivo(subject);
  }


  var presentedoconjunctivoAlteredRadical =
      {
          "conferir" : "confir",
          "despir" : "disp",
          "dormir" : "durm",
          "ouvir" : "ouç",
          "pedir" : "peç",
          "repetir" : "repit",
          "seguir" : "sig",
          "sentir" : "sint",
          "servir" : "sirv",
          "subir" : "sub",    // Nao entendo onde esta a alteraco...
          "vestir" : "vist"
      }

  var presentedoconjunctivoIrregulares =
      {
          "dar" : ["dê", "dês", "dê", "dêmos", "deem"],
          "estar" : ["esteja", "estejas", "esteja", "estejamos", "estejam"],
          "ter" : ["tenha", "tenhas", "tenha", "tenhamos", "tenham"],
          "ser" : ["seja", "sejas", "seja", "sejamos", "sejam"],
          "ir" : ["vá", "vás", "vá", "vamos", "vão"],
          "ler" : ["leia", "leias", "leia", "leiamos", "leiam"],
          "fazer" : ["faça", "faças", "faça", "façamos", "façam"],
          "vir" : ["venha", "venhas", "venha", "venhamos", "venham"],
          "ver" : ["veja", "vejas", "veja", "vejamos", "vejam"],
          "sair" : ["saia", "saias", "saia", "saiamos", "saiam"],
          "pôr" : ["ponha", "ponhas", "ponha", "ponhamos", "ponham"],
          "poder" : ["possa", "possas", "possa", "possamos", "possam"],
          "saber" : ["saiba", "saibas", "saiba", "saibamos", "saibam"],
          "dizer" : ["diga", "digas", "diga", "digamos", "digam"],
          "trazer" : ["traga", "tragas", "traga", "tragamos", "tragam"],
          "querer" : ["queira", "queiras", "queira", "queiramos", "queiram"],
          "haver" : ["", "", "haja", "", ""],
          /* My irregulares found: */
          "cair" : ["caia", "caias", "caia", "caiamos", "caiam"]
      }


  var presentedoconjunctivoTerminaisonsGroup1 = ["e", "es", "e", "emos", "em"];

  var presentedoconjunctivoTerminaisonsGroup2 = ["a", "as", "a", "amos", "am"];

  var presentedoconjunctivoTerminaisonsGroup3 = presentedoconjunctivoTerminaisonsGroup2;


  function getpresentedoconjunctivoterminaison(subject, verb) {
      if (1 == verb.group()) {
          return presentedoconjunctivoTerminaisonsGroup1[subjectTerminaisonIndexes[subject]];
      }
      else if (2 == verb.group()) {
          return presentedoconjunctivoTerminaisonsGroup2[subjectTerminaisonIndexes[subject]];
      }
      else if (3 == verb.group()) {
          return presentedoconjunctivoTerminaisonsGroup3[subjectTerminaisonIndexes[subject]];
      }
  }


  //
  // Portugues Imperfeito do Conjunctivo conjuging function
  //

  Verb.prototype.noimperfeitodoconjunctivo = function(subject) {
      if (_(imperfeitodoconjunctivoIrregulares).has(this.infinitive)) {
          return (imperfeitodoconjunctivoIrregulares[this.infinitive])[ subjectTerminaisonIndexes[subject] ];
      }
      else {
          return this.radical() + getimperfeitodoconjunctivoterminaison(subject, this);
      }
  }

  JsPortugues.noimperfeitodoconjunctivo = function(subject, infinitive) {
    var verb = new Verb(infinitive);
    return verb.noimperfeitodoconjunctivo(subject);
  }



  var imperfeitodoconjunctivoIrregulares =
      {
          "dar" : ["desse", "desses", "desse", "dessemos", "dessem"],
          "estar" : ["estivesse", "estivesses", "estivesse", "estivessemos", "estivessem"],
          "ter" : ["tivesse", "tivesses", "tivesse", "tivessemos", "tivessem"],
          "ser" : ["fosse", "fosses", "fosse", "fossemos", "fossem"],
          "ir" : ["fosse", "fosses", "fosse", "fossemos", "fossem"],
          "ler" : ["lesse", "lesses", "lesse", "lessemos", "lessem"],
          "fazer" : ["fizesse", "fizesses", "fizesse", "fizessemos", "fizessem"],
          "vir" : ["viesse", "viesses", "viesse", "viessemos", "viessem"],
          "ver" : ["visse", "visses", "visse", "vissemos", "vissem"],
          "sair" : ["saisse", "saisses", "saisse", "saissemos", "saissem"],
          "pôr" : ["pusesse", "pusesses", "pusesse", "pusessemos", "pusessem"],
          "poder" : ["pudesse", "pudesses", "pudesse", "pudessemos", "pudessem"],
          "saber" : ["soubesse", "soubesses", "soubesse", "soubessemos", "soubessem"],
          "dizer" : ["disesse", "disesses", "disesse", "disessemos", "disessem"],
          "trazer" : ["trouxesse", "trouxesses", "trouxesse", "trouxessemos", "trouxessem"],
          "querer" : ["quisesse", "quisesses", "quisesse", "quisessemos", "quisessem"],
      }


  var imperfeitodoconjunctivoTerminaisonsGroup1 = ["asse", "asses", "asse", "ássemos", "assem"];

  var imperfeitodoconjunctivoTerminaisonsGroup2 = ["esse", "esses", "esse", "êssemos", "essem"];

  var imperfeitodoconjunctivoTerminaisonsGroup3 = ["isse", "isses", "isse", "íssemos", "issem"];


  function getimperfeitodoconjunctivoterminaison(subject, verb) {
      if (1 == verb.group()) {
          return imperfeitodoconjunctivoTerminaisonsGroup1[subjectTerminaisonIndexes[subject]];
      }
      else if (2 == verb.group()) {
          return imperfeitodoconjunctivoTerminaisonsGroup2[subjectTerminaisonIndexes[subject]];
      }
      else if (3 == verb.group()) {
          return imperfeitodoconjunctivoTerminaisonsGroup3[subjectTerminaisonIndexes[subject]];
      }
  }


  //
  // Portugues exercises
  //

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateRandomSubject() {
    var subjects = _.keys(subjectTerminaisonIndexes);
    var idx = getRandomInt(0, _.size(subjects)-1 );
    return subjects[idx];
  }

  function pickRandomVerb(verbs) {
    var idx = getRandomInt(0, _.size(verbs)-1 );
    return verbs[idx];
  }

  var RandomQuestion = function(verbs, conjuguateFunc) {
    // Select a subject and a verb, and compute the solution
    this.subject = generateRandomSubject();
    this.verb = pickRandomVerb(verbs);
    this.text = this.subject + " (" + this.verb + ")";
    this.solution = conjuguateFunc(this.subject, this.verb);
    this.solutionFullText = this.subject + " " + this.solution;
  };


  JsPortugues.exercises = {};

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

  var verbs = _.union(_.keys(preteritoIrregulares), verbList);

  // Init of the question
  JsPortugues.exercises.preterito = {
    createQuestion: function() {
      return new RandomQuestion(verbs, JsPortugues.nopreterito);
    }
  };




  return JsPortugues;

}));
