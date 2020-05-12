// jshint esversion:6
const express=require("express");//This is to be installed from npm
const app=express();
const bodyParser=require("body-parser");
const https=require("https");//This package is already bundled with node, so there is no need to install it using npm

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  // const url="https://api.openweathermap.org/data/2.5/weather?q=hyderabad&appid=d9390bcfb1fa462ef493a02d4e286a24";
  //
  // https.get(url,function(response){
  //   response.on("data",function(data){
  //     var weatherData=JSON.parse(data);
  //     console.log("Temperature in Kelvin is "+weatherData.main.temp);
  //     console.log("Temperature DEscription is "+weatherData.weather[0].description);
  //     res.write("<h1>Temperature in Kelvin is "+weatherData.main.temp+"</h1>");
  //     res.write("<p>Temperature in Kelvin is "+weatherData.weather[0].description+"</p>");
  //     const image="http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
  //     res.write("<img src="+image +">");
  //     res.send();
  //   });
  //   console.log(response.statusCode);
  // });
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  var city=req.body.city;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=d9390bcfb1fa462ef493a02d4e286a24";
  https.get(url,function(response){
    response.on("data",function(data){
      var weatherData=JSON.parse(data);
          // console.log("Temperature in Kelvin is "+weatherData.main.temp);
          // console.log("Temperature Dsscription is "+weatherData.weather[0].description);
          res.write("<h1>Temperature of "+city+" in Kelvin is "+weatherData.main.temp+"</h1>");
          res.write("<p>Temperature description of "+city+" "+weatherData.weather[0].description+"</p>");
          const image="http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
          res.write("<img src="+image +">");
          res.send();
    });
  });
});

app.listen(3000,function(){
  console.log("Server running at port 3000");
});
