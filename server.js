/**
 * The main server file
 */
var express = require('express');
var server = express();

var config = require('./config.js');

server.set('port', config.server.port);

// load the plugins
var plugins = [];

config.plugins.enabled.forEach(function(plugin) {
    console.log('Trying to load plugin "' + plugin + '"');
    var pluginPath = './plugins/' + plugin + '.js';
    try {
        plugins.push(require(pluginPath));
        console.log('Successfully loaded from "plugins/' + plugin + '.js"');
    } catch (ex) {
        console.log('Could not load "plugins/' + plugin + '.js". ' + ex);
    }
});

//attach router handlers
var overview = require('./routes/overview.js')(server, plugins);
var details = require('./routes/details.js')(server, plugins);

server.listen(server.get('port'), function() {
    console.log('Server is up and running :-)');
});
