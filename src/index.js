const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

//define paths for Express Configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
res.render('index', {
  title: 'Home Page',
  name: 'Jason Visser'
})
  })

app.get('/register', (req, res) => {
  res.render('register', {
    title: 'Register Page',
    name: 'Jason Visser'
  })
    })

    app.get('/login', (req, res) => {
      res.render('login', {
        title: 'Login Page',
        name: 'Jason Visser'
      })
        })
        
        app.get('/logout', (req, res) => {
          res.render('logout', {
            title: 'Logout Page',
            name: 'Jason Visser'
          })
            })

            app.get('/sso', (req, res) => {
              res.render('sso', {
                title: 'Sing Sign On Configuration Page',
                name: 'Jason Visser'
              })
                })
 
var server = app.listen(3000, function() {
    console.log('App started');
  });