/**
 * Created by patrickwolleb on 11/11/2013.
 */
define(
    [
        'view/ImageSequenceView',
        'backbone'
    ],
    function(

        ImageSequenceView

        ){

        var AeroplaneView = Backbone.View.extend({

            el : '#aeroplane',

            events : {
                'mousedown' : '_zoomIn'
            },

            initialize : function() {
                _.bindAll(this, '_zoomIn');
                this.imageSequence = new ImageSequenceView();
            },

            _zoomIn : function(e) {

                console.log('Zoom')
                this.$el.addClass('zoom day6');
            }

        });

        return AeroplaneView;

    }
);