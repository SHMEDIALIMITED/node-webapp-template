require.config({

	name : 'main',

        paths: {
          	'jquery': 'libs/jquery.min',
            'backbone': 'libs/backbone.1.1.0.min',
            'underscore': 'libs/underscore.1.5.2.min',
            'form' : 'libs/backbone-forms.min'
        },
 
        shim: {
            'jquery': {
                exports: '$'
            },
            'underscore': {
                exports: '_'
            },
            'backbone': {
                    deps: ['jquery', 'underscore'],
                    exports: 'Backbone'
            }



        }
});
 
require(
    [
        'backbone',
        'form',
   	    'view/ApplicationView'
    ],

    function(

        Backbone,
        Form,
        ApplicationView

        ) {

    var app;

    $(document).ready(function() {
        app = new ApplicationView();
    });
});