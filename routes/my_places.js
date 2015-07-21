module.exports = function(app) {
    var my_places = require('../controllers/my_places.js');
    var isLogged = require('../middleware/is_logged');

    app.get('/my_places', isLogged, my_places.index);
    app.del('/my_places/:id', isLogged, my_places.destroy);
};
