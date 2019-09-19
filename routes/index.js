const express = require('express')
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth')

//Welcome Page
router.get('/', forwardAuthenticated, (req, res) => {
//below is pointing to the view that we are wanting to go to. 
    res.render('welcome')
})

//Welcome Page
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    //below is pointing to the view that we are wanting to go to. 
        res.render('dashboard', 
        {
            name: req.user.name
        })
    })

    //Welcome Page
router.get('/about', (req, res) => {
    //below is pointing to the view that we are wanting to go to. 
        res.render('about')
    })

    router.get('/addGoal', ensureAuthenticated, (req, res) => {
        //below is pointing to the view that we are wanting to go to. 
            res.render('addGoal', {
                name: req.user.name
            })
        })

        router.get('/seeGoals', ensureAuthenticated, (req, res) => {
            //below is pointing to the view that we are wanting to go to. 
                res.render('seeGoals', {
                    name: req.user.name
                })
            })
    

module.exports = router; 
