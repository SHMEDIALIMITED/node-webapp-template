/**
 * Created by patrickwolleb on 11/11/2013.
 */
describe('App initialize', function() {

    var app;

    beforeEach(function() {
        var flag = false;
        require(['view/ApplicationView'], function(ApplicationView) {
            app = new ApplicationView();
            flag = true;
        });

        waitsFor(function() {
            return flag;
        });
    });

    it('sould initialize the Application view with nested view components', function() {
        expect(app.aeroplane).not.toBeUndefined();
        expect(app.loader).not.toBeUndefined();
    });
});
