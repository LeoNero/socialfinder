var mongoose = require('mongoose');
var single_connection;
var env_url = {
    "test": "mongodb://localhost/socialfinder_test",
    "development": "mongodb://localhost/socialfinder"
};

module.exports = function() {
    var env = process.env.MONGOLAB_URI || "mongodb://localhost/socialfinder";

    if (!single_connection) {
        single_connection = mongoose.connect(env, function(err, res) {
            if (err) {
                console.log("Error: " + err + ". " + env);
            } else {
                console("No error. " + env);
            }
        });
    }

    return single_connection;
};
