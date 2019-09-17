//This is where we are going to create our local strategy. 

const localStrategy = require('Passport-local').Strategy;
const mongoose = require('mongoose')
const bcrytp = require('bcryptjs')


//Load the user model.
const User = require('../models/User')

module.exports = function(passport) {
    passport.use(
        new localStrategy({usernameField: 'email'}, (email, password, done) => {
            //Match User
            User.findOne({email:email})
            .then( user =>{
                if(!user) {
                    return done(null, false, {message: 'That email is not registered.'});
                }
            //Match password.
            bcrytp.compare(password, user.password, (err, isMatch) => {
                if(err) throw err;
                //Check to see if the password that the user enters is the same as the one in the database. 
                if (isMatch) {
                    //If so it will return the user. 
                    return done(null, user)
                } else {
                    //If the password does not match then it will error out. 
                    return done(null, false, {message: 'Password is Incorrect.'}) 
                }
            })
            })
            .catch(err => console.log(err));
        })
    )
    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) => {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
}