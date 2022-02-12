const express = require('express');
const router = express.Router();
const User = require('../models/User')

// search user 
router.post('/search', (req, res) => {

    const name = req.body.searchName
    console.log(name)
    User.findOne({name},(error, user) => {
        res.json(user)
    })

})



// sign up
router.get('/user', (req, res) => {
    res.json('received th data')
})
// we use req.body.filename just when we use upload file or pics
router.post('/user', (req, res) => {
    console.log('this is req.body ', req.body)
    const newUser = new User({
        name: req.body.username,
        password: req.body.password,
        email: req.body.email

    })
    console.log('this is newUser in router', newUser)
    newUser.save((err, doc) => {
        if (err) {
            console.log(err);
        }
        res.json({
            msg: "the user has been added "
        })
    })
})

// sign up 2
/* router.post('user/create', async (req, res) => {
    // save a user
    const newUser = new User({ 
      name: req.body.nameState,
      email: req.body.email,
      password: req.body.password,
    });
    try{
        await newUser.save();
        res.send('inserted data')
        console.log(req.body)
    } catch (err){
    console.log(err)
   }
   
}) */

// sign in
router.post('/signin', (req, res) => {
    // check a user
    const {
        email,
        password
    } = req.body;
    User.findOne({
        email,
        password
    }, (err, data) => {
        res.json(data)
    })

})



/* router.get('/all',(req,res)=>{
    Plant.find((err, sendPlants)=>{
        res.json(sendPlants)
    })
}) */


module.exports = router;