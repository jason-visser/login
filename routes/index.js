const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
//below is pointing to the view that we are wanting to go to. 
    res.render('welcome')
})

module.exports = router; 
