var express = require('express');

var router = express.Router();
var massive = require("massive");

var db = massive.connectSync({
  connectionString :'postgres://pshua075:Pencil420984!@web0.site.uottawa.ca:15432/pshua075'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('demo', { title: 'Express' });
});
router.get('/demoS', function(req, res, next) {
  res.render('demoS', { title: 'Express' });
});
router.post('/check', function(req, result, next) {
  var email = req.body.email;

  result.send('OK');

  console.log(email);
});
router.get('/get_user_list',function (req,res,next) {
  db.get_user_list(function (err,result) {
    console.log(result+"hello");
    res.send(result);
  })
});
router.get('/index', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
