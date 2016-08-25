// View.js
// -------
define(["jquery", "backbone", "text!templates/heading.html"],

    function($, Backbone, template){


      var AnswerLogView = Backbone.View.extend({
      	className: 'log',

      	template: _.template("<% if (isSuccess) { print('\<div class=\"right\"\>'); } else { print('\<div class=\"wrong\"\>'); } %>" +
      		"<%= userAnswer %> " +
      		"<% if (isSuccess) { print('Correto'); } else { print('Falso'); } %> " +
      		"(<%= solutionFullText %>)</div>"),

      	render: function() {
      		$(this.el).html(this.template(this.model.toJSON()));
      		return this;
      	}
      });



      var AnswerLogListView = Backbone.View.extend({
      	el: $('#answerslog'),

      	initialize: function() {
      		// 'on' does not work ???
      		this.collection.bind('add', this.addOne, this);
      		// try this:
      		// this.listenTo(this.collection, 'add', this.addOne, this);
      	},

      	render: function() {
      		console.log('render log');
      		this.collection.forEach(this.addOne, this);
      	},

      	addOne: function(answerLogItem) {
      		var answerLogView = new AnswerLogView({
      			model: answerLogItem
      		});

      		$('#answerslog').prepend(answerLogView.render().el);
      	}
      });


      return AnswerLogListView;

    }

);
