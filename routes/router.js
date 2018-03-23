let express = require('express');
let mongoosePaginate = require('mongoose-paginate');
let router = express.Router();
let User = require('../models/users');
let Call_details = require('../models/call_details');
let Admin_values = require('../models/admin_values');

//let timer = require('../public/css/timer');
//let config = require('../config/db');
//let db = require("../app").db;



// GET route for reading data
router.get('/register', function (req, res, next) {
  res.render('register');
});


//POST route for updating data
router.post('/register', function (req, res, next) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }
    let userData = {
      username: req.body.username,
      password: req.body.password,
      name:{
        firstname: req.body.firstname,
        lastname: req.body.lastname
      },
      department: req.body.department
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/register'); //change to profiles list view later
      }
    });

  
})


//get login route for reading
router.get('/login', function (req, res, next) {
  res.render('login');
});

//post LOGIN form
router.post('/login', function (req, res, next) {
  
    User.authenticate(req.body.logusername, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/calls/add');
      }
    });
  
  
})

// GET route MAIN PAGE

router.get('/calls/add', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          //get data about agent
          let operatorUsername = user.username;
          let operatorName = user.name.firstname;
          let operatorLastname = user.name.lastname;
          let operatorDepartment =user.department;
          //promise to get info from database before rendering
          console.log(operatorUsername,operatorName);
          let getSupportReasons = Admin_values.distinct('support_reasons').exec();
          let getSalesReasons = Admin_values.distinct('sales_reasons').exec();
          let getCancellationReasons =Admin_values.distinct('cancellation_reasons').exec();
          let getLanguages =  Admin_values.distinct('languages').exec();
          let getPaymentIssues = Admin_values.distinct('payment_issues').exec();
          Promise.all([getSalesReasons,getSupportReasons,getCancellationReasons, getLanguages, getPaymentIssues]).then(function(data){
             console.log(data);
               res.render('add_call',{
                    sales_reasons: data[0],
                    support_reasons: data[1],
                    cancellation_reasons: data[2],
                    languages: data[3],
                    payment_issues: data[4],
                    operatorUsername: operatorUsername,
                    operatorDepartment: operatorDepartment
                });
           });
          }
        } 
    })
  }
);


//add  POST route, HOME PAGE add calls to database
router.post('/calls/add', function(req,res){
  let current_time= new Date();
  let newCall = new Call_details();
  newCall.operator=req.body.operator_username;
  newCall.department=req.body.operator_department;
  newCall.session_code=req.body.session_code;
  newCall.session_id=null;
  newCall.customer_id=req.body.customer_id;
  newCall.date= current_time.toISOString();
  newCall.time.time_start=req.body.time_start;
  newCall.time.time_end=req.body.time_end;
  newCall.time.time_duration=req.body.time_duration;
  newCall.client_type=req.body.client_type;
  newCall.platform=req.body.platform;
  newCall.date=req.body.date;
  newCall.call_reason_sales=req.body.call_reason_sales;
  newCall.call_reason_support=req.body.call_reason_support;
  newCall.payment_issue=req.body.payment_issue;
  newCall.language=req.body.language;
  newCall.cancellation_reason=req.body.cancellation_reason;
  newCall.issue_resolved=req.body.issue_resolved;
  newCall.email=req.body.email;
  newCall.usage_possibility=req.body.usage_possibility;
  newCall.comment=req.body.comment;
  newCall.call_result=req.body.call_result;
  newCall.save(function(err){
                  if(err){
                      console.log(err);
                      return;
                  } else {
                      res.redirect('/calls/add');
                  }
                });
});

//route call list
router.get('/call_list/:page', function(req,res,next){
  var perPage = 15
  var page = req.params.page || 1

    User.findById(req.session.userId)
      .exec(function (error, user) {
        if (error) {
          return next(error);
        } else {
          if (user === null) {
            var err = new Error('Not authorized! Go back!');
            err.status = 400;
            return next(err);
          } else {
                Call_details
                .find({'operator':user.username})
                .skip((perPage * page) - perPage)
                .limit(perPage)
                .exec(function(err, calls) {
                  Call_details.count().exec(function(err, count) {
                        if (err) return next(err)
                        res.render('test1', {
                            calls: calls,
                            current: page,
                            pages: Math.ceil(count / perPage)
                        })
                    })
                });

            
        }
      }
  });
});

router.get('/test', function(req,res){

  Call_details.paginate({},{ limit: 20 },function(err, calls) {
    if (err) {
      return console.log('ERRRRRRRRRR');
   } else {
     console.log(calls.pages);
     return res.render('test',
     {
      calls: calls
     
     });
    }
  });

});

router.get('/test1/:page', function(req, res, next) {
  var perPage = 15
  var page = req.params.page || 1

  Call_details
      .find({})
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec(function(err, calls) {
        Call_details.count().exec(function(err, count) {
              if (err) return next(err)
              res.render('test1', {
                  calls: calls,
                  current: page,
                  pages: Math.ceil(count / perPage)
              })
          })
      })
});



/* GET route call_list page
router.get('/call_list', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          Call_details.find({}, function(err, calls){
            if(err){
                console.log(err);
            } else {
                res.render('call_list',{
                    calls: calls
                    });
            }
          });
        }
      }
    });
});
*/


// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/login');
      }
    });
  }
});

//get for USER list
router.get('/user_list', function (req, res, next) {
console.log('add later')

})




module.exports = router;