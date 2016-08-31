// DesktopRouter.js
// ----------------
define(["jquery", "backbone", "models/ConjugationModel", "models/PreteritoModel", "views/ConjugationView", "views/ExoView"],

    function($, Backbone, ConjugationModel, PreteritoModel, ConjugationView, ExoView) {

        var DesktopRouter = Backbone.Router.extend({

            initialize: function() {

                // Tells Backbone to start watching for hashchange events
                Backbone.history.start();

            },

            // All of your Backbone Routes (add more)
            routes: {

                // When there is no hash on the url, the home method is called
                "": "index",
                "/preterito": "preterito"

            },

            index: function() {
                // Instantiates a new view which will render the header text to the page
                new ConjugationView({model: new ConjugationModel()});
            },

            preterito: function() {
              new ExoView({model: new PreteritoModel()});
            }

        });

        // Returns the DesktopRouter class
        return DesktopRouter;

    }

);
