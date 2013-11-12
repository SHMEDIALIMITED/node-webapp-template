var fs = require('fs');
module.exports = {

    development: {

        version : JSON.parse(fs.readFileSync('src/server_node/package.json')).version,

        root: require('path').normalize(__dirname + '/..'),

        // Express app name
        app: {
            name: 'BA Advent Calendar Dev'
        },

        db: 'mongodb://localhost/ba-advent-calendar-dev'
    },

    production: {

        version : JSON.parse(fs.readFileSync('src/server_node/package.json')).version,

        root: require('path').normalize(__dirname + '/..'),

        // Express app name
        app: {
            name: 'BA Advent Calendar Dev'
        },

        db: process.env.MONGOLAB_URI
    }
}