var mongoose = require('mongoose');
var single_connection;
var env_url = {
    "test": "mongodb://localhost/socialfinder_test",
    "development": "mongodb://localhost/socialfinder"
};

module.exports = function() {
    var env = process.env.NODE_ENV ||  process.env.MONGOLAB_URL;
    var url = env_url[env];

    if (!single_connection) {
        single_connection = mongoose.connect(url);
    }

    return single_connection;
};
