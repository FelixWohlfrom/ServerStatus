/**
 * Configures the server status server
 */
// init
var config = {};
config.server = {};
config.plugins = {};

// the port on which this server should listen
config.server.port = process.env.PORT || 5000;

// a list of enabled plugins. for available plugins,
// check the plugins folder. just the name without
// path and extension is required here.
config.plugins.enabled = [
    'cpu',
    'memory',
    'process'
];

module.exports = config;
