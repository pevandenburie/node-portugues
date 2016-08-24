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
