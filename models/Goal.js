const mongoose = require('mongoose')

const GoalSchema = new mongoose.Schema({
timeline: {
    type: String,
    required: true
},
complexity: {
    type: String,
    required: true
},
goal: {
    type: String,
    required: true
},
//default to set the date rather than required. 
date: {
    type: Date,
    default: Date.now
} 

})

const User = mongoose.model('Goal', GoalSchema)
module.exports = User;