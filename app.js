const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require("cors");
const User = require('./models/userModel.js'); //call the schemas builder
const Workout = require('./models/workoutModel.js');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

mongoose.connect("mongodb+srv://test:root@cluster0-q45yj.mongodb.net/test?retryWrites=true", { useNewUrlParser: true });

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


    //check to see if there is already a workout existing for this id
    let exerciseData = req.query.date ? {
        description: req.query.description,
        duration: req.query.duration,
        date: req.query.date
    } : {
        description: req.query.description,
        duration: req.query.duration
    };
    console.log(exerciseData);
    
    Workout.findOne({userId: req.query.id}, (err,data) => {
        if(err) {
            done(err);
        } else {
            
            //if there's no existing data, we will place a new userid and exercise piece of data. However, if the data exists we will push it into the array
            if (data == null) {
                var data = new Workout ({ 
                    userId : req.query.id,
                    exercise : [exerciseData] 
                });
                
            } else {
                data.exercise.push(exerciseData);
            }

            data.save(err=>{
                err ? res.send(err) : res.json(data);
            });
        }  
    });
});

app.get('/api/exercise/:userInformation', (req, res, next) => {
    let userId = req.query.id;
    // let limit = req.query.limit;

    Workout.findOne({userId: userId}, (err,data) => {
        if (err) {
            done(err);
        } else {
            // if no limit, just send back all of the exercises
            if(req.query.limit == null) {
                res.json(data.exercise);
                //console.log(data.exercise.length);
            } else {
                let totalNumOfExercises = data.exercise.length;
                let totalToDisplay = req.query.limit;
                let tempArray = []; //create an array to store the exercises

                // decrease the total we need to display by one each time, we loop and add to array
                while (totalToDisplay > 0) {
                    tempArray.push(data.exercise[totalNumOfExercises - totalToDisplay]);
                    totalToDisplay--;
                }

                res.json({workouts: tempArray})
            }
        }
    })    
});

app.listen(process.env.PORT || 3000, ()=> {
    console.log("working");
});