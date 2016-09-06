// DesktopRouter.js
// ----------------
define(["jquery", "backbone", "models/ConjugationModel", "models/PreteritoModel", "models/ImperfeitodoconjunctivoModel", "models/PresentedoconjunctivoModel", "views/ConjugationView", "views/ExoView"],

    function($, Backbone, ConjugationModel, PreteritoModel, ImperfeitodoconjunctivoModel, PresentedoconjunctivoModel, ConjugationView, ExoView) {

        var DesktopRouter = Backbone.Router.extend({

            initialize: function() {

                // Tells Backbone to start watching for hashchange events
                Backbone.history.start();

            },

            // All of your Backbone Routes (add more)
            routes: {

                // When there is no hash on the url, the home method is called
                "": "index",
                "preterito": "preterito",
                "presentedoconjunctivo": "presentedoconjunctivo",
                "imperfeitodoconjunctivo": "imperfeitodoconjunctivo",

            },

            index: function() {
                // Instantiates a new view which will render the header text to the page
                new ConjugationView({model: new ConjugationModel()});
            },

            preterito: function() {
                var view = new ExoView({model: PreteritoModel});
                view.render();
            },

            presentedoconjunctivo: function() {
                var view = new ExoView({model: PresentedoconjunctivoModel});
                view.render();
            },

            imperfeitodoconjunctivo: function() {
                var view = new ExoView({model: ImperfeitodoconjunctivoModel});
                view.render();
            },

        });

        // Returns the DesktopRouter class
        return DesktopRouter;
    }

);
