const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
firstName: {
    type: String,
    required: True
},
lastName: {
    type: String,
    required: True
},
email: {
    type: String,
    required: True
},
password: {
    type: String,
    required: True
},
password2: {
    type: String,
    required: True
},

//default is 
date: {
    type: date,
    default: Date.now
} 

})

const User = mongoose.model('User', UserSchema)
module.exports = User;