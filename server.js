require('dotenv').config();
let express = require('express');
let expressSession = require('express-session');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
var passport = require('passport');
var fbStrategy = require('passport-facebook').Strategy; // there might be more than one strategy

var fbRoutes = require('./routes/fb_routes');

// MONGO CONNECT
// var mongo_config = JSON.parse(process.env.APP_CONFIG);
// var mongo_connection_string_prod = "mongodb://" + mongo_config.mongo.user + ":" + process.env.MONGO_PASS + "@" + mongo_config.mongo.hostString;
// var mongo_connection_string = typeof (mongo_connection_string_prod) !== "undefined" ? mongo_connection_string_prod : mongo_connection_string_local;
let mongo_connection_string_local = "mongodb://localhost/kashragon";
let mongo_connection_string = mongo_connection_string_local;

mongoose.Promise = global.Promise;
mongoose.connect(mongo_connection_string, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true // anti depracation configs
},
  function (err, db) {
    if (err) {
      console.error("Error connecting to mongo", err);
    } else {
      console.log("Connected to mongo");
    }
  });
  // MONGO CONNECT

// Configure the Facebook strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new fbStrategy({
    clientID: process.env['FACEBOOK_CLIENT_ID'],
    clientSecret: process.env['FACEBOOK_CLIENT_SECRET'],
    callbackURL: '/fbreturn'
  },
  function(accessToken, refreshToken, profile, cb) {
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
  }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
let app = express();
// app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
app.use(express.static('node_modules'));
app.use(require('cookie-parser')()); // for req.secret. Will see if required
// app.use(require('morgan')('combined')); // logging - OPTIONAL
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({ secret: 'SIlver Tiger', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/fb', fbRoutes);

// app.use(function(req, res, next) { // setting headers for localhost request and possibly future ones
//   // res.setHeader("Access-Control-Allow-Origin", "localhost, https://localhost:8000, http://localhost:8000/, http://localhost:8000," +
//   // "http://localhost:8000/#_=_");              
//   res.setHeader("Access-Control-Allow-Origin", "*");   
//   res.setHeader("Access-Control-Allow-Credentials", "true");
// // res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");   
// // res.setHeader("Access-Control-Allow-Headers", " Authorization, Origin ,Accept, x-access-token, X-Requested-With, Content-Type, Access-Control-Request-Methods, Access-Control-Request-Headers");    
//     next();
// }); 


// // Configure passport-local to use user model for authentication - optional
/*passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); */
app.get('/login/facebook', passport.authenticate('facebook'), (req, res) =>{
  console.log('fb login attempt');
}, (err) =>{
  console.log('err? ', err)
});

app.get('/fbreturn', 
  passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
    console.log('attempted login');
    res.redirect('/');
  }); // fb-strategy required path

app.get('/', (req, res) => {
    console.log('hello world');
    if (req.user) {
      console.log('got user! its ', req.user);
      res.setHeader("user", req.user);
    }
    res.sendFile(__dirname + "/public/homePage.html");
    // res.render('/homePage.html', { user: req.user });
  });
  app.get('/fbuser', (req, res) => {
    console.log('user found! ', req.user);
    res.send(req.user);
  })
app.listen(process.env['PORT'] || '8000', function () {
    console.log("Kashragon server is listening!");
});
