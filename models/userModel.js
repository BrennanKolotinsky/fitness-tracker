// build the database

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// the timestamps, just creates a timestamp when the object has been created
const userSchema = new Schema({
    name: {type: String, required: true},
    userId: {type: Number, required: true}
}, {timestamps: true});

const UserClass = mongoose.model('User', userSchema); //pass in the table name/collection and the structure -- basic setup, the first parameter MUST match the new data call in the app.js file!
module.exports = UserClass;