// Collection.js
// -------------
define(["jquery","backbone", "jsportugues", "models/AnswerLogItem"],

  function($, Backbone, JsPortugues, AnswerLogItem) {

    var AnswerLogList = Backbone.Collection.extend({
    	model: AnswerLogItem
    });


    return AnswerLogList;
  }

);
