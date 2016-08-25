// Conjugate.js
// -------
define(["jquery", "backbone", "jsportugues", "models/ConjugationModel", "text!templates/heading.html"],

    function($, Backbone, JsPortugues, ConjugationModel, template){

        var ConjugationView = Backbone.View.extend({
          events: {

            "click a[data-backbone]": function(e) {
                e.preventDefault();
                Backbone.history.navigate(e.target.pathname, {trigger: true});
            },

            "keypress #verb": "onKeyPress",
            "click #noimperfeito": "conjugueNoImperfeito",
            "click #nopreterito": "conjugueNoPreterito",
            "click #nopresenteconjunctivo": "conjugueNoPresenteDoConjunctivo",
            "click #noimperfeitoconjunctivo": "conjugueNoImperfeitoDoConjunctivo",
            "change #subject": "updateLastConjuguing",
          },

          initialize: function() {
            this.conjuguingFunc = this.conjugueNoImperfeito;

            // Use 'listenTo' instead of 'this.model.on' to be able to remove the view easily
            this.listenTo(this.model, 'change', this.renderAnswer, this);

            // Calls the view's render method
            this.render();
          },

          // The DOM Element associated with this view
          el: "#content",

          template: _.template(
            '<div class="dropdown">'+
                '<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Menu </button>'+
                '<ul class="dropdown-menu">'+
                    '<li><a href="/" data-backbone="true">Conjuguing</a></li>'+
                    '<li class="divider"></li>'+
                    '<li><a href="/preterito" data-backbone="true">Exo Preterito do Indicativo</a></li>'+
                    '<li><a href="/presentedoconjunctivo" data-backbone="true">Exo Presente do Conjunctivo</a></li>'+
                    '<li><a href="/imperfeitodoconjunctivo" data-backbone="true">Exo Imperfeito do Conjunctivo</a></li>'+
                '</ul>'+
            '</div>'+
            '<br><br>'+

            "<strong>Conjugado</strong>"+
            "<br><br>"+
            "<div class=\"row\">"+
              "<div class=\"col-xs-3\"><select class=\"col-md-4\" id=\"subject\" name=\"subject\">"+
                "<%_.forEach(subjects, function (s) {%>"+
                "<option value=\"<%=s%>\"><%=s%></option>"+
                "<%})%>"+
              "</select></div>"+
              "<div class=\"col-xs-9\"><input class=\"col-md-8\" type=\"text\" id=\"verb\"  autocapitalize=\"off\" autofocus></input></div>"+
            "</div>"+
            "<div class=\"row\">"+
              "<div class=\"col-xs-6 col-md-3\"><button id=\"noimperfeito\" class=\"btn btn-default btn-block\">No imperfeito</button></div>"+
              "<div class=\"col-xs-6 col-md-3\"><button id=\"nopreterito\" class=\"btn btn-default btn-block\">No preterito</button></div>"+
              "<div class=\"col-xs-6 col-md-3\"><button id=\"nopresenteconjunctivo\" class=\"btn btn-default btn-block\">No presente<br>do conjuctivo</button></div>"+
              "<div class=\"col-xs-6 col-md-3\"><button id=\"noimperfeitoconjunctivo\" class=\"btn btn-default btn-block\">No imperfeito<br>do conjuctivo</button></div>"+
            "</div>"+
            "<div id=\"translatedText\"><%=conjugued%></div>"
          ),

          render: function() {
            // Fill the list of subjects
            var attr = _.clone(this.model.attributes);
            attr.subjects = JsPortugues.subjects;
            this.$el.html( this.template(attr) );
            return this;
          },

          renderAnswer: function() {
            // innerText NOT supported by firefox
            document.getElementById("translatedText").textContent = this.model.get('conjugued');
          },

          conjugueNoImperfeito: function() {
            console.log("conjugueNoImperfeito...");
            var subject = document.getElementById("subject").value;
            var verb =  document.getElementById("verb").value;
            this.model.conjugueNoImperfeito(subject, verb);
          },

          conjugueNoPreterito: function() {
            console.log("conjugueNoPreterito...");
            var subject = document.getElementById("subject").value;
            var verb =  document.getElementById("verb").value;
            this.model.conjugueNoPreterito(subject, verb);
          },

          conjugueNoPresenteDoConjunctivo: function() {
            console.log("conjugueNoPresenteDoConjunctivo...");
            var subject = document.getElementById("subject").value;
            var verb =  document.getElementById("verb").value;
            this.model.conjugueNoPresenteDoConjunctivo(subject, verb);
          },

          conjugueNoImperfeitoDoConjunctivo: function() {
            console.log("conjugueNoImperfeitoDoConjunctivo...");
            var subject = document.getElementById("subject").value;
            var verb =  document.getElementById("verb").value;
            this.model.conjugueNoImperfeitoDoConjunctivo(subject, verb);
          },

          updateLastConjuguing: function() {
            var subject = document.getElementById("subject").value;
            var verb =  document.getElementById("verb").value;
            this.model.conjuguingFunc(subject, verb);
          },

          onKeyPress: function(e) {
            if (e.which == 13 || e.keyCode == 13) {
              this.updateLastConjuguing();
              //e.preventDefault(); // http://stackoverflow.com/questions/7195844/writing-text-on-div-using-javascript
            }
          }
        });

        // Returns the ConjugationView class
        return ConjugationView;

    }

);
