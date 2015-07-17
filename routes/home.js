module.exports = function(app, passport) {
    var home = require('../controllers/home');
    var isLogged = require('../middleware/is_logged');

    app.get('/', home.index);
    app.get('/data/places', home.get_places);
    app.post('/add_place', isLogged, home.add_place);

    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/',
            failureRedirect : '/'
        })
    );
};
