// Model.js
// --------
define(["jquery", "backbone", "collections/AnswerLogList", "models/AnswerLogItem"],

  function($, Backbone, AnswerLogList, AnswerLogItem) {


    var ExoModel = Backbone.Model.extend({

      defaults: {
        question: undefined,
        useranswer: "",
        isSuccess: true,
        score: { nbSuccess: 0, nbFailure: 0 },
        nbAnswers: 0,
        title: "Undefined",
      },

      initialize: function(classProperties) {
        console.log("classProperties: "+classProperties);
        this.refreshQuestion();
        this.logList = new AnswerLogList();
      },

      refreshQuestion: function() {
        this.set('question', this.createQuestion());
        this.set('useranswer', "");
      },

      submitAnswer: function(userAnswer) {

        console.log(this.get('title')+": submit answer: "+userAnswer);

        var question = this.get('question');
        var score = this.get('score');
        var nbAnswers = this.get('nbAnswser');
        var isSuccess = (userAnswer === question.solution);
        if (isSuccess) {
          score.nbSuccess++;
        }
        else {
          score.nbFailure++;
        }
        nbAnswers = (score.nbSuccess + score.nbFailure);

        this.set({
          useranswer: userAnswer,
          isSuccess: isSuccess,
          score: _.clone(score),
          nbAnswers: nbAnswers,
        });

        // Push the answer in the log model
        var answerLogItem = new AnswerLogItem({
        	userAnswer: userAnswer,
        	isSuccess: isSuccess,
        	solutionFullText: question.solutionFullText
        });
        this.logList.add(answerLogItem);

        this.refreshQuestion();
      },
    });


    return ExoModel;
  }

);
