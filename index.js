#!/usr/bin/env node
require('app-module-path').addPath(__dirname);
// ES6 Transpiler
require('babel-core/register');
require('babel-polyfill');
require.extensions['.css'] = () => {
    return;
};
/**
 * Module dependencies.
 */
var app = require('server/app');
var http = require('http');
var models = require('server/models');
var config = require('server/config');
var console = require('server/libs/logger');
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || config.app.port);
app.set('port', port);
/**
 * Create HTTP server.
 */
var server = http.createServer(app);

models.sequelize.sync({ force: false }).then(function() {
    /**
     * Listen on provided port, on all network interfaces.
     */
    server.listen(port, function() {
        console.info('Express server listening on port ' + server.address().port + " on " + process.env.NODE_ENV + " mode");
    });
    server.on('error', onError);
    server.on('listening', onListening);
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    console.info('Listening on ' + bind);
}