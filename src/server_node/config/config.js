var fs = require('fs');
module.exports = {

    development: {

        version : JSON.parse(fs.readFileSync('src/server_node/package.json')).version,

        root: require('path').normalize(__dirname + '/..'),

        // Express app name
        app: {
            name: 'UGG Game Dev'
        },

        db: 'mongodb://localhost/ugg',

        port : 8000
    },

    production: {

        version : JSON.parse(fs.readFileSync('src/server_node/package.json')).version,

        root: require('path').normalize(__dirname + '/..'),

        // Express app name
        app: {
            name: 'UGG Game'
        },

        db: process.env.MONGOLAB_URI,

        port  : process.env.PORT
    }
}