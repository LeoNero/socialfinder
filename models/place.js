var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var db = require('../libs/db_connect')();

var Place = Schema({
	geo: {
        type: [Number],
        index: {
            type: '2dsphere',
            sparse: true
        }
    },

	geo_name: String,

    description: String,

    user: { type: String, ref: 'User' }
});

module.exports = db.model('Place', Place);
