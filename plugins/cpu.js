/**
 * Displays the cpu information.
 * 
 * In the overview, for each core there will be one block, displaying the current usage.
 * In the details, it will display cpu model(s) and speed(s)
 */

// Update interval in seconds
var interval = 10;

var os = require('os');
var _ = require('underscore');

/**
 * Reads the cpu load within given interval
 */
var cpu_overview = [];
var cpu_info_detailed = [];
var old = _.map(os.cpus(), function(cpu) {
    return cpu.times;
});

setInterval(function() {
    if (os.platform() === 'win32') {
        var cpu = require('windows-cpu');
        cpu.totalLoad(function(error, results) {
            if (error) {
                console.log(error);
                return;
            }

            results.forEach(function(load, cpuKey) {
                cpu_info_detailed[cpuKey] = {
                        CPU: load
                };
            });
        });
        
    } else {
        var result = [];
        var current = _.map(os.cpus(), function(cpu) {
                            return cpu.times;
                        });
    
        _.each(current, function(item, cpuKey) {
            result[cpuKey] = {};
    
            var oldVal = old[cpuKey];
            _.each(_.keys(item), function(timeKey) {
                var diff = (parseFloat((item[timeKey]) - parseFloat(oldVal[timeKey])) / parseFloat((interval * 100)));
                var name = timeKey;
                if (timeKey === 'idle') {
                    name = 'CPU';
                    diff = 100 - diff;
                }
                result[cpuKey][name] = diff.toFixed(0);
            });
        });
        cpu_info_detailed = result;
        old = current;
    }
   
    // this information will be sent out to the overview.
    // we just sent a pair of current load and maximum load.
    cpu_info_detailed.forEach(function(item, cpuKey) {
        cpu_overview[cpuKey] = {
                    value: item.CPU,
                    medium: 60,
                    high: 80,
                    max: 100
                };
    });
}, (interval * 1000));

// read details
var cpu_details = [];
os.cpus().forEach(function(cpu) {
    cpu_details.push([
    {
        label: "Model",
        value: cpu.model
    }, {
        label: "Speed",
        value: cpu.speed + "Mhz"
    }]);
});

// generate the information for overview and details
module.exports = {
    overview: function() {
            return {
                label: 'CPU',
                values: cpu_overview
            };
        },

    details: function() {
            return {
                label: 'CPU',
                values: cpu_details
            };
        }
};
