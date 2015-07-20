var Place = require('../models/place.js')
var User = require('../models/user.js');

var MyPlacesController = {

    index: function(req, res) {
        var user = req.user;
        var _id = user._id;

        User.findById(_id).populate("places").exec(function(err, user) {

            var params = {user: user, places: user.places};

            console.log(user.places);

            res.render('my_places/index', params);
        });
    }

};

module.exports = MyPlacesController;
