var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var db = require('../libs/db_connect')();

var User = Schema({
    _id          : String,
    token        : String,
    email        : String,
    name         : String,
    places       : [{ type: Schema.Types.ObjectId, ref: 'Place' }]
})


module.exports = db.model('User', User);
