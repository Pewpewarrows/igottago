//  (c) 2012 Cole Krumbholz, SendSpree Inc.
//
//  This document may be used and distributed in accordance with 
//  the MIT license. You may obtain a copy of the license at 
//    http://www.opensource.org/licenses/mit-license.php

var MainView = Backbone.View.extend({
    render: function() {
        
        // Render the main.jst template.
        var content = window.JST.main({
            app_id: window.backlift_app_id
        }); 

        // add the content to the DOM
        this.$el.html(content);

        // // UNCOMMENT ME TO ENABLE DINOSAUR TRACKS!
        // var tracksview = new window.TracksView();
        // this.$('#tracks-container').html(tracksview.render().el);

        return this;
    },
});

// MainRouter: This simple example only has one page. More
// complex sites will include additional routes for each
// page on the website.
var MainRouter = Backbone.Router.extend({
    routes: {
        "": "handleHome",
    },

    handleHome: function() {
        // render the main view into the body of the page
        var mainView = new MainView();
        $('body').empty();
        $('body').append(mainView.render().el);
    },
});

$(function() {
    var App = new MainRouter();
    Backbone.history.start(); 
});
