function start() {
  var express = require("express");
  var app = express();
  var router = express.Router();

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
    res.sendFile(__dirname + "/view/index.html");
  });

  router.get("/about",function(req,res){
    res.sendFile(__dirname + "/view/about.html");
  });


  router.get("/user/:id",function(req,res){
    res.json({"message" : "Hello "+req.params.id});
  });

  app.use("/",router);

  app.use(express.static(__dirname + '/script'));

  app.use("*",function(req,res){
    res.sendFile(__dirname + "/view/404.html");
  });

  app.listen(3000,function(){
    console.log("Live at Port 3000");
  });
};

exports.start = start;
