//  (c) 2012 Cole Krumbholz, SendSpree Inc.
//
//  This document may be used and distributed in accordance with 
//  the MIT license. You may obtain a copy of the license at 
//    http://www.opensource.org/licenses/mit-license.php

var Tracks = Backbone.Collection.extend({
    url: '/backliftapp/tracks',
});

window.TracksView = Backbone.View.extend({

    className: 'tracksview',

    initialize: function() {

        // instantiate a new Tracks collection and
        // initialize it with data from the server
        this.collection = new Tracks();
        this.collection.fetch();

        // call this.render whenever the collection
        // changes
        this.collection.on('add', this.render, this);
        this.collection.on('reset', this.render, this);

        // start with the left foot
        this.lastFoot = 'right';
    },

    events: {
        'click': 'addFootprint',
    },

    addFootprint: function(ev) {

        // determin x,y offsets from the upper left
        // corner of the containing div to the center
        // of the footprint image.
        var x = ev.pageX - ev.target.offsetLeft - 25;
        var y = ev.pageY - ev.target.offsetTop - 32;

        // select left or right footprint
        var foot = 'left';
        if (this.lastFoot == 'left') {
            foot = 'right';
        }
        this.lastFoot = foot;

        this.collection.create({xpos: x+'px', ypos: y+'px', foot: foot});
    },

    render: function () {
        // render the tracks using the tracks.jst template
        var content = window.JST.tracks({
            collection: this.collection,
        });

        // add the content to the DOM
        this.$el.html(content);
        return this;
    }
});