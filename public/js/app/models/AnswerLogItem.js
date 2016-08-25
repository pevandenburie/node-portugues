// Model.js
// --------
define(["jquery", "backbone"],

    function($, Backbone) {

        var AnswerLogItem = Backbone.Model.extend({
        	urlRoot: 'log',
        	defaults: {
        		userAnswer: "NA",
        		isSuccess: false,
        		solutionFullText: "NA"
        	},
        });


        return AnswerLogItem;
    }

);
