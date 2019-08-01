var express = require('express');
var path = require('path');
var mysql= require('mysql');

var con=mysql.createConnection({
    host: "localhost",
  user: "root",
  password: "",
  database: "employee"

});

con.connect(function(err){
if(err) throw err;
console.log('database connected successfully');
});

var router = express.Router();

router.use(express.static(__dirname+"./public/"));


router.get('/',function(req, res, next) {
 var getQuery="select * from `users`";
 con.query(getQuery,function(err,result){

    if(err) throw err;

    res.render('index', { title: 'Employee Records', records:result,success:'' });
 
 });

});



router.post('/', function(req, res, next) {
 
    var name= req.body.uname;
    var email= req.body.email;
    var etype= req.body.emptype;
    var hourlyrate= req.body.hrlyrate;
   var totalHour= req.body.ttlhr;
   var total= parseInt(req.body.hrlyrate) * parseInt(req.body.ttlhr);
 
   var insertQuery='insert into `users` (`name`,`email`,`etype`,`hourlyrate`,`totalhour`,`total`) VALUES (?,?,?,?,?,?)';
    var hourlyrate= req.body.hrlyrate;
   var total= parseInt(req.body.hrlyrate) * parseInt(req.body.ttlhr);
  var query=mysql.format(insertQuery,[name,email,etype,hourlyrate,totalHour,total]);
  con.query(query,function(err,response){
      if(err) throw err;
     // console.log(response.insertId);
     var getQuery="select * from `users`";
 con.query(getQuery,function(err,result){

    if(err) throw err;
    res.render('index', { title: 'Employee Records', records:result,success:'Record Inserted Successfully' });
 
  });
});
});

router.get('/edit/:id', function(req, res, next) {
var id=req.params.id;

var getQuery="select * from `users` where `id`=?";
var query=mysql.format(getQuery,id);
 con.query(query,function(err,result){
     if(err) throw err;
     var string=JSON.stringify(result);
        var json =  JSON.parse(string);
       
res.render('edit', { title: 'Employee Records', records:json,success:'' });
 
});
});

router.post('/update/', function(req, res, next) {
    var id= req.body.id;
    var name= req.body.uname;
    var email= req.body.email;
    var etype= req.body.emptype;
    var hourlyrate= req.body.hrlyrate;
   var totalHour= req.body.ttlhr;
   var total= parseInt(req.body.hrlyrate) * parseInt(req.body.ttlhr);
 
   var updateQuery='UPDATE `users` SET `name`=? ,`email`=?,`etype`=?,`hourlyrate`=?,`totalhour`=?,`total`=? where `id`=?';
    var query=mysql.format(updateQuery,[name,email,etype,hourlyrate,totalHour,total,id]);
  con.query(query,function(err,response){
      if(err) throw err;
     // console.log(response.insertId);
  res.redirect('/');
});
});

router.get('/delete/:id', function(req, res, next) {
    var id=req.params.id;

    var deleteQuery="delete from `users` where `id`=?";
    var query=mysql.format(deleteQuery,id);
     con.query(query,function(err){

         if(err) throw err;
 res.redirect('/');
    });
    
});

module.exports = router;
