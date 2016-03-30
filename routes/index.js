var express = require('express');
var router = express.Router();
// var db = require('monk')(process.env.MONGOLAB_URI)
var db = require('monk')('localhost/Users' || process.env.MONGOLAB_URI);
var Users = db.get('stats');

var adminDB = require('monk')('localhost/Admin' || process.env.MONGOLAB_URI)
var Admin = adminDB.get('analytics');

router.post("/users", function (req, res) {
  Users.insert(req.body).then(function (user) {
    res.json(user)
  })
})  

router.get("/users", function (req, res) {
  Users.find({}).then(function (user) {
    res.json(user)
  })
})

router.post("/analytics", function (req, res) {
  if (req.cookies.username === 'admin' && req.cookies.password === 'lizardking') {
    Admin.insert(req.body).then(function(analytics) {
      res.json(analytics);
    })
  } else {
      res.redirect('/');
  }
})

router.get("/analytics", function (req, res) {
  Admin.findOne({}).then(function(analytics) {
    res.json(analytics);
  })
})

// THIS IS THE CATCH-ALL ROUTE
router.get('*', function(req, res, next) {
  res.sendFile('index.html', {
    root: __dirname + '/../public/'
  })
});




module.exports = router;
