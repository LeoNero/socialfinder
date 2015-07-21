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
    },

    destroy: function(req, res) {
        var _id = req.user._id;

        User.findById(_id, function(err, user) {
            var placeID = req.params.id;

            user.places.remove(placeID);

            user.save(function() {
                res.redirect('/my_places');
            });
        });
    }

};

module.exports = MyPlacesController;
