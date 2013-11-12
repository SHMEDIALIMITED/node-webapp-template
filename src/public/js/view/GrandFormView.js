/**
 * Created by patrickwolleb on 11/11/2013.
 */
define(
    [

        'text!templates/grand-form.html',
        'model/User',
        'backbone',
        'form'
    ],
    function(

        template,
        User

        ) {

        var GrandFormView = Backbone.View.extend({

            tagName :   'section',
            id :        'grand-form',
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

        return GrandFormView;

    }
)