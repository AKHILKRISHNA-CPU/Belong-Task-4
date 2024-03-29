var express = require('express');
var app = express();
//Importing The Schema
const signUpData = require('./models/signUpSchema.js');
const LoginData = require('./models/loginSchema.js');

app.path = require("path");
var path = require('path')
app.use(express.static(path.join(__dirname, '/public')));


app.use(express.static('/pages'))
app.use(express.urlencoded({extended:false}));
//Mongodb Database Connection
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://krishna:krishna@cluster0.a09oz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',)
.then(() => {
    console.log("Successfully Connected To MongoDB Database.");
}).catch((e) => {
    console.log("Not Connected To MongoDB Database.");
})
const connection = mongoose.connection;

const cookieParser = require("cookie-parser");
const sessions = require('express-session');

app.use(sessions({
    cookieName: "sessions",
    secret: "peednasnamhskalramuk9991",
    saveUninitialized:true,
    resave: false
}));

var session;

// Creating Router For HomePage
app.get('/' , function(req,res){
    session=req.session;
    if(session.user){
        res.sendFile(__dirname + "/pages/index.html")
    }
    else{
        res.sendFile(__dirname + "/pages/login.html")
    }
})
// clinical-research.html
app.get('/clinical' , function(req,res){
    res.sendFile(__dirname + "/pages/clinical-research.html")
})
//book a test
app.get('/bookatest' , function(req,res){
    res.sendFile(__dirname + "/pages/book-a-test.html")
})
//index
app.get('/index' , function(req,res){
    res.sendFile(__dirname + "/pages/index.html")
})
//about
app.get('/about' , function(req,res){
    res.sendFile(__dirname + "/pages/about-us.html")
})
// Creating Router For SingnUp Page
app.get('/signup' , function(req,res){
    res.sendFile(__dirname + "/pages/signup.html")
})
// Creating Router For Login Page
app.get('/login' , function(req,res){
    session=req.session;
    if(session.user){
        res.send("Welcome User <a href=\'/'>Click to go for HomePage</a>");
    }else
    res.sendFile(__dirname + '/pages/login.html');
})

// Creating Router For logout
app.get('/logout' , function(req,res){
    req.session.destroy();
    res.redirect("/login")
})

//Posting Users Data Into MongoDB
app.post("/sendData" , function(req,res){
    console.log(req.body);
    var obj = new signUpData({
        UserName:req.body.UserName,
        Email:req.body.Email,
        Password:req.body.Password,
    })
    signUpData.findOne({ $or: [{Email: req.body.Email } , {Password:req.body.Password}] }, function(err,docs){
        if(err || docs==null){
            console.log(err)
            obj.save(function(err, results) {
                if(results){
                   console.log("results"+ results);
                    res.send(results);
                }else{
                    console.log(err)
                    res.send(err);
                }
            })
        }
        else{
            res.sendStatus(500);
        }
    })
});

app.post('/loginData', function(req,res){
    session=req.session;
    console.log(req.body);
    
    signUpData.findOne({Email:req.body.Email, Password:req.body.Password}, function(err,docs){
        if(err || docs==null){
            //console.log(err)
            res.sendStatus(500)
        } 
        else{
            // session=req.session;
            session.user=docs;
            res.send(docs);
        }
    })
});

app.listen(4000, ()=> console.log('Successfully Server Started'))