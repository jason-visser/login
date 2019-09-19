const express = require('express')
const router = express.Router();


//Goal Model
const Goal = require('../models/Goal')

router.post('/add', (req, res) => {
   

    const { timeline, complexity, goal } = req.body;
    
    const newGoal = new Goal({
        timeline,
        complexity,
        goal
      });

      Goal.findOne({})

    newGoal
                .save()
                .then(user => {
                  req.flash(
                    'success_msg',
                    'You are now registered and can log in'
                  );
                  res.redirect('/goals/add');
                })
                .catch(err => console.log(err));

})




module.exports = router; 