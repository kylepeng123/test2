var express = require('express');
var encryption = require('./encryption');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/check', function(req, result, next) {
  var email = req.body.email;

  result.send('OK');

  console.log(email);
});

router.post('/check_name',function (req,result,next) {
  var name=req.body.name;
  var alpha=encryption.handlename();
  var beta=encryption.hostgen(name);
  console.log(name+"hhsfhaksj");
  result.send(alpha);
})

module.exports = router;
