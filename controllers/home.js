var request = require('request');
var moment = require('moment');
var Place = require('../models/place.js');
var User = require('../models/user.js');

var geocoderProvider = 'google';
var httpAdapter = 'https';

var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter);

var HomeController = {
    index: function(req, res) {

        if (!req.user) {
            console.log("Sem user");
            res.render('home/index');
        } else {
            console.log(req.user);
            res.render('home/index', {user: req.user});
        }
    },

    get_places: function(req, res) {
        Place.find({})
            .select('geo_name geo description')
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

                if (req.query.callback != undefined) {
                    res.jsonp(data);
                } else {
                    res.json(data);
                }
        });
    },

    add_place: function(req, res) {
        var address = req.body.address;
        var description = req.body.description;

        var user = req.user;

        geocoder.geocode(address, function(err, res) {
            if (err) {
                console.log(err);
            } else {
                var latitude = res[0].latitude;
                var longitude = res[0].longitude;
                var formatted_address = res[0].formattedAddress;

                var latlng = latitude + ',' + longitude;
                var latlng_array = latlng.split(",");

                var new_place = Place({
        		          geo         : latlng_array,
        		          geo_name    : formatted_address,
                          description : description,
                          user        : user._id
        	    });

                new_place.save(function(err){
        		    if (err) {
        			    console.log("Error: " + err);
        		    } else {
                        User.findOne({_id: user._id}, function(err, user) {
                            var user_places = user.places;
                            user_places.push(new_place);

                            user.save(function() {
                                console.log("User added place!");
                            });
                        });

                        console.log("Place saved! " + new_place);
        		    }
        	    });
            }
        });
    }
};

module.exports = HomeController;
