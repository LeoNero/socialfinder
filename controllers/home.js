var request = require('request')
    , moment = require('moment')
    , Place = require('../models/place.js');

var HomeController = {
    index: function(req, res) {
        res.render('home/index')
    },

    get_places: function(req, res) {
        Place.find({})
            .select('geo_name geo')
            .exec(function(err, allPlaces) {
                if (err) {
                    res.send("Unable to query database for places").status(500);
                    console.log(err);
                }

                console.log("Total: " + allPlaces.length + " places!");

                var data = {
                    status: 'OK',
                    places: allPlaces
                };

                if (req.query.callback !== undefined) {
                    res.jsonp(data);
                } else {
                    res.json(data);
                }
        });
    },

    add_place: function(req, res) {
        var lat_lng = req.body.latlng;
        var latlng_array = latlng_str.split(",");

        var new_place = Place({
		          geo : latlng_array,
		          geo_name : req.body.geo_name
	    });

        new_place.save(function(err){
		    if (err) {
			    console.log("Error: " + err);
		    } else {
			    console.log("Place saved! " + new_place);
		    }
	    });

        if (req.xhr) {
            var replyData = {
			    status : 'OK',
			    msg : 'Place added!'
		    };

            res.json(replyData);
        } else {
            res.redirect('/');
        }
    }
};

module.exports = HomeController;
