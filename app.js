var express = require("express");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var bcrypt = require('bcrypt');
var session = require('express-session');
mongoose.connect('mongodb://localhost/datagov_db');
var app = express();

// original code:
app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000  }
}))

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/AngularApp/dist/AngularApp"));

var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "A username is required"],
        minlength: [3, "Usernames must be 3 or more characters"]
    },
    password: {
        type: String,
        required: [true, "A password is required"],
        minlength: [8, "Passwords must be 8 or more characters"]
    }
}, {timestamps: true});
mongoose.model('User', UserSchema);
var User = mongoose.model('User');

app.post('/register', function(req, res) {
    let newUser = new User({
        username: req.body.username,
        password: req.body.password
    });
    console.log("in post: newUser: ", newUser);
    User.findOne({username:req.body.username}, function(err, user) {
        if (user != null) {
            newUser.validate(function(err) {
                if (err) {
                    err["errors"]["username"] = {message: "Try another username"}
                    res.json({message:"Fail", data:err});
                } else {
                    res.json({message:"Fail", data:{"errors":{"username":{"message":"Try another username"}}}});
                }
            });
        } else {
            if (req.body.password != undefined && req.body.password.length >= 8) {
                newUser.password = bcrypt.hashSync(newUser.password,14);
            } else {
                newUser.password = "";
            }
            newUser.save(function(err) {
                if (err) {
                    res.json({message:"Fail",data:err});
                } else {
                    User.findOne({username:req.body.username}, function(err, user) {
                        if (err){
                            res.json({message:"Fail",data:err});
                        } else {
                            req.session.user = user;
                            console.log("user in session: ", user);
                            res.json({message:"Success", data:{username: newUser.username, _id: newUser._id}});
                        }
                    });
                }
            });
        }
    });
});


app.post('/login', function(req, res) {
    User.findOne({username:req.body.username}, function(err, user) {
        if (user != null) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                req.session.user = user;
                console.log("user in session: ", user);
                res.json({message:"Success", data:{username:user.username, _id:user._id}});
            } else {
                res.json({message:"Fail", data:{"errors":{"username":{"message":"Invalid login username/password"}}}});
            }
        } else {
            res.json({message:"Fail", data:{"errors":{"username":{"message":"That username does not exist"}}}});
        }
    });
});

app.all("*", (req,res,next) => {
    console.log("got hit on * in app.js v2");
    res.sendFile(path.resolve("./AngularApp/dist/AngularApp/index.html"));
});

app.listen(8000, function () {
    console.log("login listening on port 8000");
})
