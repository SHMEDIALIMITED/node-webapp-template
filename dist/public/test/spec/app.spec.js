describe('Claim Form', function() {
	
	var form;

	beforeEach(function() {
		var flag = false;
		require(['view/ClaimFormView'], function(ClaimFormView) {
			form = new ClaimFormView();
			flag = true;
		});

		waitsFor(function() {
      			return flag;
    		});
	});

	it('should initialize nested comps', function() {
		expect(form.form).not.toBeUndefined();
        expect(form.form.commit).not.toBeUndefined();
	});
});