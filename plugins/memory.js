/**
 * Generates the memory information
 */
var os = require('os');

// returns an integer from given float value.
// the | 0 is a hack which is really fast converting the float to an int.
// see http://stackoverflow.com/a/12837315 for details
function toInt(value) {
    return value | 0;
}

// generate the information for overview and details
module.exports = {
    overview : function() {
        return {
            label : 'Memory',
            value : os.totalmem() - os.freemem(),
            max : os.totalmem()
        };
    },

    details : function() {
        return {
            label : 'Memory',
            values : [
            {
                label : 'Used',
                value : toInt((os.totalmem() - os.freemem()) / 1024 / 1024) + 'Mb'
            },
            {
                label : 'Total',
                value : toInt(os.totalmem() / 1024 / 1024) + 'Mb'
            }]
        };
    }
};
