var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var Place = Schema({
	geo: {
        type: [Number],
        index: {
            type: '2dsphere',
            sparse: true
        }
    },

	geo_name: String
})

module.exports = db.model('Place', Place);
