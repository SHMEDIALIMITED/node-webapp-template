

module.exports = function (app, config) { 

	var pages = require(config.root + '/controllers/pages')(config);
    var users = require(config.root + '/controllers/users')(config);




	// Web App
    app.get('/', pages.index);

    // API Users
    app.post('/api/users', users.create);
    app.get('/api/users', users.retrieve);
    app.put('/api/users', users.update);
    app.del('/api/users', users.del);

}