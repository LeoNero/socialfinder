var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');

var configAuth = require('./auth');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findOne({_id: id}, function(err, user) {
            if (err) {
                console.log(err);
                done(err);
            }
            done(err, user);
        });
    });

    passport.use(
        new FacebookStrategy({
            clientID        : configAuth.facebookAuth.clientID,
            clientSecret    : configAuth.facebookAuth.clientSecret,
            callbackURL     : configAuth.facebookAuth.callbackURL
        },
        function(token, refreshToken, profile, done) {
            process.nextTick(function() {
                User.findOne({'_id': profile.id}, function(err, user) {
                    if (err) {
                        return done(err);
                    }

                    if (user) {
                        console.log("User found!");
                        return done(null, user);
                    } else {
                        var newUser = new User();

                        newUser._id    = profile.id;
                        newUser.token = token;
                        newUser.name  = profile.name.givenName + ' ' + profile.name.familyName;
                        newUser.email = profile.emails[0].value;

                        newUser.save(function(err) {
                            if (err) {
                                throw err;
                            }

                            console.log("User saved!");

                            return done(null, newUser);
                        });
                    }
                });
            });
        }
    ));
};
