/**
 * Displays process information.
 * 
 * In the overview, it will display the count of currently running processes. In
 * the details, a list of running processes is given.
 * 
 * Currently, just linux is supported.
 * Requires nodejs 0.12
 */

var os = require('os');
var process_runner = require('child_process');

var semver = require('semver');

if (os.platform() === 'linux' && !semver.satisfies(process.version, "0.12")) {
    throw("Please use nodejs > 0.12 to use this plugin")
}

var process_count = '';
var process_list = '';

function getProcessInformation() {
    if (os.platform() === 'linux') {
        process_list = process_runner.execSync('ps aux').toString();
        process_count = process_list.split(/\n/).length;
    }
}

// generate the information for overview and details
module.exports = {
    overview : function() {
        getProcessInformation();

        if (process_count !== '') {
            return {
                label : 'Running processes',
                value : process_count
            };
        } else {
            return {};
        }
    },

    details : function() {
        getProcessInformation();

        if (process_list !== '') {
            return {
                label : 'Process list',
                value : process_list
            };
        } else {
            return {};
        }
    }
};
