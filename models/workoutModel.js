const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    userId: Number,
    exercise: [Object]
});

const WorkoutClass = mongoose.model('Workout', workoutSchema); //the first part of the model is the name of the collection in the database!
module.exports = WorkoutClass;
