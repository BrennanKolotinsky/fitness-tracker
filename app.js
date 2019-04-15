const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require("cors");
const User = require('./models/model.js'); //call the schemas builder
const Workout = require('./models/model.js');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

mongoose.connect("mongodb+srv://root:test@cluster0-xdnqr.mongodb.net/test?retryWrites=true", { useNewUrlParser: true });

app.get("/api/exercise/new-user/:newUser", (req,res,next) => {
    userToAdd = req.params.newUser; //get user

    let randomId = Math.floor(Math.random() * 100000) + 1;
    // res.json({name: userToAdd, number: randomId});
    // create new data
    var data = new User ({ 
        name : userToAdd,
        userId : randomId
    });

    // saves the new object in the database, unless there is an error or send the error
    data.save(err=>{
        err ? res.send(err) : res.json(data);
    });
});

app.get("/api/exercise/add/exerciseInfo", (req,res,next) => {
    if (req.query.date) {
        var data = new Workout ({ 
            id : req.query.id,
            description: req.query.description,
            duration: req.query.duration,
            date: req.query.date
        });
    } else {
        var data = new Workout ({ 
            id : req.query.id,
            description: req.query.description,
            duration: req.query.duration
        });
    }
    data.save(err=>{
        err ? res.send(err) : res.json(data);
    });
});

app.get('/api/exercise/:userInformation', (req, res, next) => {
    let userId = req.params.userInformation;

    User.findOne({userId: userId}, (err,data) => {
        err ? done(err) : res.json(data);
    })    
});

app.listen(process.env.PORT || 3000, ()=> {
    console.log("working");
});