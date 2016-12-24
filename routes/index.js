var express = require('express');
var encryption = require('./encryption');
var router = express.Router();

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



module.exports = router;
