module.exports = function(app, passport) {
    var home = require('../controllers/home');

    app.get('/', home.index);
    app.get('/data/places', home.get_places);
    app.post('/add_place', home.add_place);

    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/',
            failureRedirect : '/'
        })
    );


};
