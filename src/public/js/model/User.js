/**
 * Created by patrickwolleb on 11/11/2013.
 */
define(
    [
        'backbone'
    ],
    function() {

        var User = Backbone.Model.extend({
            schema: {
                firstName:  { validators: ['required'] },
                lastName:   { validators: ['required'] },
                email:      { validators: ['required', 'email'] },
                address1:   { title: 'Address Line 1', validators: ['required'] },
                address2:   { title: 'Address Line 2'},
                postcode :  { validators: ['required'] },
                city :      { validators: ['required'] },
                captcha :   { validators: ['required'] },
                mobile :    { validators: ['required'] },
                check1:     { title: 'Opt-in', label: 'Opt-in', type : 'Checkbox' },
                check2:     { title: 'Accept <a href="http://google.com" target="_blank">terms and conditions</a>', type : 'Checkbox',  validators: ['required'] }
            }
        });


        return User;
    }
);