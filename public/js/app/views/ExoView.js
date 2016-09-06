
// ExoView.js
// -------
define(["jquery", "backbone", "jsportugues", "models/ExoModel", "collections/AnswerLogList", "views/AnswerLogListView", "text!templates/heading.html"],

  function($, Backbone, JsPortugues, ExoModel, AnswerLogList, AnswerLogListView, template){

    var ExoView = Backbone.View.extend({

      events: {
        "click #submit": "submitAnswer",
        "keypress": "onKeyPress",
      },

      initialize: function(options) {
        // when given by new ExoView({description: "Imperfeito do Conjunctivo"});
        // this.description = options.description;

        // Use 'listenTo' instead of 'this.model.on' to be able to remove the view easily
        this.listenTo(this.model, 'change:question', this.render, this);

        // Delegate the answer log rendering to another View
        this.logListView = new AnswerLogListView({collection: this.model.logList});
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
        
        '<strong><%=title%></strong>'+
        '<br><br>'+
        '<div id=score><%="Score:  " + score.nbSuccess + " / " + (score.nbSuccess + score.nbFailure)%></div>'+
        '<div class="row">'+
          '<div class="col-xs-5 col-sm-4 col-md-4"><label id=question><%=question.text%></label></div>'+
          '<div class="col-xs-5 col-sm-4 col-md-4"><input type="text" id="useranswer"  size=15 autocapitalize="off" autofocus></input></div>'+
          '<div class="col-xs-2 col-sm-4 col-md-4"><button id="submit">ok</button></div>'+
        '</div>'+
        '<div id=answerslog></div>'),

      render: function() {
        this.$el.html( this.template(this.model.attributes) );
        this.logListView.render();

        $("#useranswer").focus();

        return this;
      },

      submitAnswer: function() {
        var useranswer = document.getElementById('useranswer').value;

        // Check that's not a compulsive press on ENTER
        if (useranswer === "") {
          console.log(this.model.get('title') + " FOCUS 2 !");
          $("#useranswer").focus(); // In case user pressed 'Ok' button
          return;
        }

        this.model.submitAnswer(useranswer);
      },

      onKeyPress: function(e) {
        if (e.keyCode == 13) {
          this.submitAnswer();
          e.stopPropagation();
        }
      },

      // to be put in the template
      refreshScore: function() {
        document.getElementById('score').textContent = "Score:  " + score.nbSuccess + " / " + (score.nbSuccess + score.nbFailure);
      },
    });


    return ExoView;
  }
);
