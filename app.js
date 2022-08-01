const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/signupDB');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
   console.log("connection succeeded");
});

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("css"));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    const email = req.body.mail;
    const password = req.body.pass;

    const data={
            "email": email,
            "password": password
        }   
    
    db.collection("entries").insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");
              
    });
          
    return res.redirect("success.html");
});

app.get('/',function(req,res){
    res.set({
        'Access-control-Allow-Origin': '*'
        });
    return res.redirect('index.html');
});

app.listen(3000, function(){
    console.log("server started at port 3000");
});



