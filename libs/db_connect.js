var mongoose = require('mongoose');
var single_connection;
var env_url = {
    "test": "mongodb://localhost/socialfinder_test",
    "development": "mongodb://localhost/socialfinder"
};

module.exports = function() {
    var env = process.env.NODE_ENV || process.env.MONGOLAB_URI || "development";

    if (!single_connection) {
        single_connection = mongoose.connect(env, function(err, res) {
            if (err) {
                console.log ('ERROR connecting to: ' + uristring + '. ' + err);
            } else {
                console.log ('Succeeded connected to: ' + uristring);
        });
    }

    return single_connection;
};
