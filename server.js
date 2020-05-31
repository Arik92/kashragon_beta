require('dotenv').config();
let express = require('express');
let expressSession = require('express-session');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let passport = require('passport');

let folderRoutes = require('./routes/folder_routes');
let userRoutes = require('./routes/user_routes');

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
app.use('/users', userRoutes);

app.get('/', (req, res) => {    
  res.sendFile(__dirname + "/public/homePage/homePage.html");    
});

app.listen(process.env['PORT'] || '8000', function () {
    console.log("Kashragon server is listening!");
});