require('dotenv').config();
let express = require('express');
let expressSession = require('express-session');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let passport = require('passport');
let fbStrategy = require('passport-facebook').Strategy; // there might be more than one strategy
let user = require('./models/user');
// let router = express.Router();

let folderRoutes = require('./routes/folder_routes');

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
    callbackURL: '/fbreturn',
    profileFields: ["id", "displayName", "picture"] 
  }, (accessToken, refreshToken, profile, cb) => {    
    
    user.findOne({facebook_id: profile.id}, (err, res) => {
      if (err) {
        console.error('error finding fb user on DB', err);
      } else {
        if (!res) {
          // no user found. create a new one from scratch
          let newUser = new user({});          
          newUser.facebook_id = profile.id;
          newUser.name = profile.displayName;
          newUser.profileUrl = profile.photos[0] ? profile.photos[0].value : '';
          newUser.folders = [];
          
          newUser.save((saveErr, savedUser) => {
            if (saveErr) {
              console.log('error creating new user ', saveErr)
            } else {              
              return cb(null, savedUser);
            }
          })
        } else {
          // user exists, returning it
          return cb(null, res);
        }
      }
    })

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
app.use(express.static(__dirname + '/public/login'));
app.use(express.static(__dirname + '/public/homePage'));
app.use(express.static('node_modules'));
app.use(require('cookie-parser')()); // for req.secret. Will see if required
// app.use(require('morgan')('combined')); // logging - OPTIONAL
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressSession({ secret: 'SIlver Tiger', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/folders', folderRoutes);

// FB routes
app.get('/login/facebook', passport.authenticate('facebook'), (req, res) =>{
  console.log('fb login attempt');
}, (err) =>{
  console.log('err? ', err)
});
// fb-strategy required path
app.get('/fbreturn', passport.authenticate('facebook', { failureRedirect: '/login', successRedirect: '/' })); 
app.get('/fbuser', (req, res) => {
  res.send(req.user);
});
// FB routes

app.get('/', (req, res) => {    
  res.sendFile(__dirname + "/public/login/login.html");    
});

app.listen(process.env['PORT'] || '8000', function () {
    console.log("Kashragon server is listening!");
});