//
//  Generic verb functions
//

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


var JsPortugues = {
  subjects: _(subjectTerminaisonIndexes).keys(),
	exercises: {}
}


// Put the Question here to avoid create a new file now

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomSubject() {
  var subjects = _(subjectTerminaisonIndexes).keys();
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
