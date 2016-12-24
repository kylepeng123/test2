var express = require('express');
var router = express.Router();
var massive = require('massive');
// var conn = massive.connectSync({
//     connectionString : "postgres://pshua075:pencil420984!@web0.site.uottawa.ca/pshua075"
// });
// app.set('db', conn);
// var db = app.get('db');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/get_user_list',function (req,res,next) {
    db.get_user_list(function (err,result) {
        console.log(result+"hello");
        res.send(result);
    })
})
module.exports = router;
