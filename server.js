function start() {
  var express = require("express");
  var app = express();
  var router = express.Router();
  var ejs = require("ejs");

  app.set("view engine","ejs")
  router.use(function (req,res,next) {
    console.log("/" + req.method);
    next();
  });

  router.use("/user/:id",function(req,res,next){
    console.log(req.params.id)
    if(req.params.id == 0) {
      res.json({"message" : "You must pass ID other than 0"});
    }
    else next();
  });

  router.get("/",function(req,res){
    res.sendFile(__dirname + "/public/index.html");
  });

  router.get("/about",function(req,res){
    res.sendFile(__dirname + "/public/about.html");
  });

  router.get("/search",function(req,res){
    res.sendFile(__dirname + "/public/search.html");
  });

  router.get("/user/:id",function(req,res){
    res.json({"message" : "Hello "+req.params.id});
  });

  app.use("/",router);

  app.use(express.static('public'));

  app.use("*",function(req,res){
    res.sendFile(__dirname + "/public/404.html");
  });

  app.listen(3000,function(){
    console.log("Live at Port 3000");
  });
};

exports.start = start;
