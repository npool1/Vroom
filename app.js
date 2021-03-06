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

var MaintenanceSchema = new mongoose.Schema({
    technician: {
        type: String,
    },
    description: {
        type: String
    },
    completedon:{
        type: Date
    },
    duedate: {
        type: Date
    },
    finished: {
        type: String
    },
}, {timestamps: true});




















var MachineSchema = new mongoose.Schema({
    machinename: {
        type: String,
        required: [true, "A machine name is required"],
        minlength: [3, "Machine names must be 3 or more characters"]
    },
    make: {
        type: String
    },
    model:{
        type: String

    },
    yearpurchased: {
        type: Date
    },
    yearmanufactured: {
        type: Date
    },
    maintenancerecords: [MaintenanceSchema]
}, {timestamps: true});
























var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "A username is required"],
        minlength: [3, "Username must be 3 or more characters"]
    },
    password: {
        type: String,
        required: [true, "A password is required"],
        minlength: [8, "Passwords must be 8 or more characters"]
    },
    firstname: {
        type: String,
        required: [true, "A first name is required"],
        minlength: [3, "First name must be 3 or more characters"]
    },
    lastname: {
        type: String,
        required: [true, "A last name is required"],
        minlength: [3, "Last name must be 3 or more characters"]
    },
    machines: [MachineSchema]
}, {timestamps: true});


































// user model changes should end on line 166
mongoose.model('User', UserSchema);
var User = mongoose.model('User');
const machine = mongoose.model('Machine', MachineSchema);

app.post('/register', function(req, res) {
    let newUser = new User({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    });
    console.log("in post: newUser: ", newUser);
    User.findOne({username:req.body.username}, function(err, user) {
        if (user != null) {
            newUser.validate(function(err) {
                if (err) {
                    err["errors"]["username"] = {message: "Username already in use. Try another username"}
                    res.json({message:"Fail", data:err});
                } else {
                    res.json({message:"Fail", data:{"errors":{"username":{"message":"Username already in use. Try another username"}}}});
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
//nick
app.post('/addmachine', function(req, res){
    console.log("Here!!!!!")
    let addMachine = new machine({
        machinename: req.body.machinename,
        make: req.body.make,
        model: req.body.model,
        yearpurchased: req.body.yearpurchased,
        yearmanufactured: req.body.yearmanufactured
    });

    console.log("This is addMachine" + addMachine);
    addMachine.save(function(err){
        if(err){
            console.log('Unable to put machine in DB');
            console.log(err);
            // console.log(err);
            res.json({message: "error", errors: addMachine.errors});
        }else{
            res.json({status: 'everything went okay!'});
        }
    });
});

app.get('/allmachines', function(req, res){
    console.log("in server: get machines")
    machine.find({}, function(err, data){
        if(err){
            console.log('we got errors:');
            console.log(err);
        } else {
            res.json({data: data});
        }
    })
});

app.delete('/machine/:id', function(req, res){
    var id = mongoose.Types.ObjectId(req.params.id);
    machine.remove({_id: id}, function(err){
        if(err){
            console.log(err);
            res.json({status: 'not gucci'});
        }
    });
    res.json({status: 'gucci'});
})


































































































//nick's lines end on 349
//carrie
app.get('/user', function(req, res) {
    console.log("in server: user: ", req.session.user);
    res.json({user: req.session.user});
});
app.get('/logoff', function(req, res) {
    req.session.user = { username: "", firstname: "", lastname: "", password: ""}
    res.json({message:"No user logged in", user: req.session.user});
});















































































// carrie's changes should end on line 450
//joyce



































































































//Joyce's changes should end on line 551
//dustin




































































































// Dustin's lines end on 653
app.all("*", (req,res,next) => {
    console.log("got hit on * in app.js v2");
    res.sendFile(path.resolve("./AngularApp/dist/AngularApp/index.html"));
});

app.listen(8000, function () {
    console.log("login listening on port 8000");
})
