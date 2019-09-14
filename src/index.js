const path = require("path");
const express = require("express");
const hbs = require("hbs");
const mongoose = require("mongoose");

const app = express();

//db config

const db = require("../config/keys").mongoURI;

//Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to Database"))
  .catch(err => console.error(err));

//define paths for Express Configuration
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//bodyparser - this is so that we can get data from req.body
app.use(express.urlencoded({ extended: false }));

//Setup Handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Home Page",
    name: "Jason Visser"
  });
});

app.get("/register", (req, res) => {
  res.render("register", {
    title: "Register Page",
    name: "Jason Visser"
  });
});

app.get("/login", (req, res) => {
  res.render("login", {
    title: "Login Page",
    name: "Jason Visser"
  });
});

app.get("/logout", (req, res) => {
  res.render("logout", {
    title: "Logout Page",
    name: "Jason Visser"
  });
});

app.get("/sso", (req, res) => {
  res.render("sso", {
    title: "Sing Sign On Configuration Page",
    name: "Jason Visser"
  });
});

app.post('/api/register', (req, res)=> {
  const {firstName, lastName, email, password, password2 } = req.body;

  //do some validation 
let errors = []; 

//checking to make sure that there is a value in each of these. 
if(!firstName || !lastName || !email || !password || !password2 ){
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
res.render('register', {
errors,
firstName,
lastName,
email, 
password, 
password2})
}
else{
  res.send('pass')
}


})

var server = app.listen(3000, function() {
  console.log("App started");
});
