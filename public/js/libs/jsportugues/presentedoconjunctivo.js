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
