const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport')

//User Model
const User = require('../models/User')

router.get('/login', (req, res) => {
res.render('login')
})

router.get('/register', (req, res) => {
    res.render('register')
    })

 router.post('/register', (req,res) => {
   

const { name, email, password, password2 } = req.body;

//do some validation 
let errors = []; 

//checking to make sure that there is a value in each of these. 
if( !name || !email || !password || !password2 ){
errors.push({msg: 'Please fill in all of the fields.'})
}


//check to password matches
if (password !== password2){
  errors.push({msg: 'Passwords do not match.'})
}

//check to password length
if (password.length < 8){
  errors.push({msg: 'Password needs to be at least 8 characters.'})
}

if(errors.length > 0) {
    //we are going to send the data back to the form.
    res.render('register', {
    errors,
    name,
    email,
    password, 
    password2
    });
    } else {
      //validation passed. 

      //Try and see if there is an email that is already registered. 

      User.findOne({ email: email }).then(user => {
        if (user) {
          errors.push({ msg: 'Email already exists' });
          res.render('register', {
            errors,
            name,
            email,
            password,
            password2
          });
        } else {
          const newUser = new User({
            name,
            email,
            password
          });
  
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                  req.flash(
                    'success_msg',
                    'You are now registered and can log in'
                  );
                  res.redirect('/users/login');
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
  });

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

//Logout
router.get('/logout', (req, res) => {
  req.logOut();
  req.flash('success_msg', 'You have been logged out.')
  res.redirect('/users/login');
})


module.exports = router; 
