/**
 * Created by patrickwolleb on 11/11/2013.
 */
define(
    [
        'text!templates/claim-form.html',
        'model/User',
        'backbone'
    ],
    function(

        template,
        User

        ) {




        var ClaimFormView = Backbone.View.extend({

            tagName :   'section',
            id :        'claim-form',
            className : 'popup',

            initialize : function() {

                this.form = new Backbone.Form({ model:new User() });

                this.$el.append(template);

                this.$formPage = this.$el.find('.form');
                this.$successPage = this.$el.find('.success').hide();
                this.$failPage = this.$el.find('.fail').hide();

                this.$formPage.append(this.form.render().el);


            }


        });

        return ClaimFormView;
    }
);