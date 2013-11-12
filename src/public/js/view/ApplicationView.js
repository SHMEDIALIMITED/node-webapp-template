define(
	[
        'view/LoaderView',
        'view/GrandFormView',
        'view/ClaimFormView',
        'view/AeroplaneView',
		'backbone'	
	],
	function(

        LoaderView,
        GrandFormView,
        ClaimFormView,
        AeroplaneView

        ){



		var ApplicationView = Backbone.View.extend({

			el : 'body',

			initialize : function() {

                this.aeroplane = new AeroplaneView();
                this.loader = new LoaderView();

                //this._claimPrize();
                //this._enterPrizeDraw();
			},

            _claimPrize : function() {
                this.claimForm = new ClaimFormView();
                this.$el.append(this.claimForm.el)
            },

            _enterPrizeDraw : function() {
                this.grandForm = new GrandFormView();
                this.$el.append(this.grandForm.el)
            }

		});

		return ApplicationView;
});