const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/db');
const mongoosePaginate = require('mongoose-paginate');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

mongoose.Promise= global.Promise;
mongoose.connect(config.url);
let db = mongoose.connection;



//check connection
db.once('open', function(){
    console.log('connected to mongodb');
});

//check for DB errors
db.on('error', function(err){
    console.log(err);
});

//init app
const app = express();
//const session;

//bring in models
let Call_details = require('./models/call_details');
let Users = require('./models/users');
let Admin_values = require('./models/admin_values');

//load view engine
app.set('views',path.join(__dirname, 'views'));
app.set('view engine','pug');


//body parser
app.use(bodyParser.urlencoded({ extended: false}))
//parse app json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:'true'}))
//Set public folder
app.use(express.static(path.join(__dirname, 'public')))
//express routes for sessions
app.use(session({
    secret: '35451%6ftfs',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db
    })
  }));

// include routes
var routes = require('./routes/router');
app.use('/', routes);  

/*home route

app.get('/', function(req, res){
    let reasons = ['aa','ss','ss'];   
Users.find({}, function(err, users){
    if(err){
        console.log(err);
    } else {
    
    res.render('index',{
        title: 'hello',
        reasons: reasons,
        users: users
    }); 
  }
});
/*replaced upper 
let reasons = ['aa','ss','ss'];
res.render('index',{
    title: 'hello',
    reasons: reasons,
    call_details_info: call_details_info
});

});*/
/*route call list
app.get('/call_list', function(req,res){
    Call_details.find({'operator': 'Diana'}, function(err, calls){
        if(err){
            console.log(err);
        } else {
            res.render('call_list',{
                calls: calls
                });
        }
      });
  });   */ 

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
  });
  
  // error handler
  // define as the last app.use callback
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
  });

//listen to port
app.listen(3000, function(){
    console.log('server');
});


// add call (cnahge to call_details)
app.get('/calls_list', function(req, res){
    res.render('call_list',{

    })
})
