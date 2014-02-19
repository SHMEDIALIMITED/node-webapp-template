/**
 * Module dependencies.
 */

var express = require('express');

var base64url = require('b64url');


module.exports = function (app, config) {
    var Models = require(config.root + '/models');
    var User = Models.User;

    app.set('showStackError', true)

    app.use(express.compress({
        filter: function (req, res) {
            return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
        },
        level: 9
    }))


    app.use(express.logger('dev'))


    app.set('port', config.port);

    app.engine('.html', require('ejs').__express);

    app.set('views', config.root + '/../public');
    app.set('view engine', 'html');


    app.configure(function () {

        app.use(express.favicon())

        app.use(express.cookieParser())


        app.use(express.bodyParser())
        app.use(express.methodOverride())



        app.use(app.router)
        app.use(express.static(config.root + '/../public'))

        // assume "not found" in the error msgs
        // is a 404. this is somewhat silly, but
        // valid, you can do whatever you like, set
        // properties, use instanceof etc.
        app.use(function (err, req, res, next) {
            // treat as 404
            if (~err.message.indexOf('not found')) return next()

            // log it
            console.error(err.stack)

            // error page
            res.status(500).render('500', { error: err.stack })
        })

        // assume 404 since no middleware responded
        app.use(function (req, res, next) {
            res.status(404).render('404', { url: req.originalUrl })
        })

    })
}