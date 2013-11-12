

module.exports = function (app, config) { 

	var pages = require(config.root + '/controllers/pages')(config);
    var users = require(config.root + '/controllers/users')(config);
    var tickets = require(config.root + '/controllers/tickets')(config);




	// Web App
	app.get('/edit', pages.edit);
    app.get('/', pages.index);

    // API Users
    app.post('/api/users', users.create);
    app.get('/api/users', users.retrieve);
    app.put('/api/users', users.update);
    app.del('/api/users', users.del);


    // API Tickets
    app.post('/api/tickets', tickets.create);
    app.get('/api/tickets', tickets.retrieve);
    app.put('/api/tickets', tickets.update);
    app.del('/api/tickets', tickets.del);



}