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
