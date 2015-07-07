var mongoose = require('mongoose')
    , Schema = mongoose.Schema;
    
var Place = new Schema({
	geo: {
        type: [Number],
        index: {
            type: '2dsphere',
            sparse: true
        }
    },

	geo_name: String
})

module.exports = mongoose.model('Place', Place);
