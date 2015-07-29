var express         = require('express');
var app             = express();
var mongoose        = require('mongoose');
var server          = require('http').createServer(app);
var passport        = require('passport');
var flash           = require('connect-flash');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var session         = require('express-session');

const SECRET = 'Socialfinder', KEY = 'socialfinder.sid';
const MAX_AGE = {maxAge: 3600000};
const GZIP_LVL = {level: 9, memLevel: 9};

app.configure(function() {
	app.use(express.logger());
	app.set('views', __dirname + '/views');

	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.set('view engine', 'ejs');
	app.use(express.json());
	app.use(express.methodOverride());
	app.use(express.urlencoded());
	app.use(express.compress(GZIP_LVL));
    app.use(session({ secret: 'wtfilikecomputers' }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());


	app.use(express.static(__dirname + '/public', MAX_AGE));

	app.use(app.router);
});

require('./config/passport.js')(passport);
require('./routes/home.js')(app, passport);
require('./routes/my_places.js')(app);

server.listen(3000, function(){
  console.log("SocialFinder!");
});
