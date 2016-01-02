/*jslint node: true */
/*jshint esnext: true */
'use strict';

const Hapi = require('hapi');
const utils = require('./utils');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

//register plugins
server.register([{
    register: require('good'),
    options: {
        reporters: [{
            reporter: require('good-console'),
            events: {
                response: '*',
                log: '*'
            }
        }]
    }
}, {
    register: require('h2o2'),
    options: {}
}], function(err) {

    if (err) {
        console.error('Failed to load a plugin:', err);
        throw err;
    }
});

// Add the route
server.route({
    method: 'GET',
    path: '/',
    handler: {
        proxy: {
            mapUri: utils.mapUri,
            onResponse: utils.handleResponse
        }
    }
});

// Start the server
server.start(() => {
    server.log('info', 'Server running at: ' + server.info.uri);
});
