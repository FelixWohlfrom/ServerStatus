/**
 * Collects the informations required for the overview json file
 */
module.exports = function(router, plugins) {
    router.get('/details', function(req, res) {
        var info = [];
        
        plugins.forEach(function(plugin) {
        	info.push(plugin.details());
        });
        
        res.send(info);
    });
};
