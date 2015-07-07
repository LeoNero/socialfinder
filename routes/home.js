module.exports = function(app) {
    var home = require('../controllers/home');

    app.get('/', home.index);
    app.get('/data/places', home.get_places);
    app.post('/add_place', home.add_place);
};
