const express = require("express");
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const flash = require('connect-flash') //this is needed on the redirect of a succesul insert into the db. 
const session = require('express-session')
const passport = require('passport')
const path = require('path')

const app = express();

//Passport config
require('./config/passport')(passport);

//Public access
console.log(__dirname)
const publicDirectoryPath = path.join(__dirname, '/public')
console.log(publicDirectoryPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//db config
const db = require('./config/keys').mongoURI

//Connect to Mongo
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Database Connected - WAHOO!'))
.catch(err=>console.log(err));

//EJS Middelware
app.use(expressLayouts);
app.set('view engine', 'ejs')

//BodyParser, so that we can get data from req.body
app.use(express.urlencoded({extended: false}))

//Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    //cookie: { secure: true }
  }))

//Passport Middelware
app.use(passport.initialize());
app.use(passport.session());


//connect flash
app.use(flash());

//Global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next();
});




app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));




const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server started on ${PORT}`)); //backticks not single quote to build up a template string. 
