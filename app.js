var express         = require('express')
  , app             = express()
  , mongoose        = require('mongoose')
  , server          = require('http').createServer(app)
  , passport        = require('passport')
  , flash           = require('connect-flash')
  , cookieParser    = require('cookie-parser')
  , bodyParser      = require('body-parser')
  , session         = require('express-session');

app.configure(function() {
	app.use(express.logger('dev'));
	app.set('views', __dirname + '/views');

	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.set('view engine', 'ejs');
	app.use(express.json());
	app.use(express.methodOverride());
	app.use(express.urlencoded());

    app.use(session({ secret: 'wtfilikecomputers' }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());


	app.use(express.static(__dirname + '/public'));

	app.use(app.router);
});

global.db = mongoose.connect('mongodb://localhost/socialfinder');
console.log("Connected to database! :D");

require('./config/passport')(passport);
require('./routes/home.js')(app, passport);

server.listen(3000, function(){
  console.log("SocialFinder!");
});
