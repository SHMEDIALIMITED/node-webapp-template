require.config({
	baseUrl: "../js/",
  	urlArgs: 'cb=' + Math.random(),
	'paths': {
		'jquery': '//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min',
        'backbone': 'libs/backbone.1.1.0.min',
        'underscore': 'libs/underscore.1.5.2.min',
        'form': 'libs/backbone-forms.min',
		'jasmine': '../test/libs/jasmine-1.3.1/jasmine',
        'jasmine-html': '../test/libs/jasmine-1.3.1/jasmine-html',
		'spec': '../test/spec'
	},
 
	shim: {
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'underscore': {
			exports: '_'
		},
		jasmine: {
	      	exports: 'jasmine'
	    },
	    'jasmine-html': {
	      	deps: ['jasmine'],
	      	exports: 'jasmine'
	    }
	}
});
 
require(['underscore', 'jquery', 'jasmine-html'], function(_, $, jasmine){
 
  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;
 
  var htmlReporter = new jasmine.HtmlReporter();
 
  jasmineEnv.addReporter(htmlReporter);
 
  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };
 
  var specs = [];
 
    specs.push('spec/app.spec');
    specs.push('spec/claim.form.spec');

 
 
  $(function(){
    require(specs, function(){
      jasmineEnv.execute();
    });
  });
 
});