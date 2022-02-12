const express = require('express');
const router = express.Router();
const Plant = require('../models/Plant')
const User = require('../models/User')
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + '_' + file.originalname)
    }
});
const upload = multer({
    storage
})

//test
router.get('/plants', (req, res) => {
    res.json('it works')
})

router.post('/add', upload.single('pic'), (req, res) => {
     console.log('this is req.body line 24 route', req.body) 
    const newPlant = new Plant({
        namePlant: req.body.filename,
        //filename is bulit in method which take pictutes like that 12-5-2017llkglkf.jpg
        pic: '/images/' + req.file.filename,
        added_by : '60b1c251da15832c66cf4e19'
    })
  

    console.log('this is new plant router', newPlant)
    newPlant.save((err, doc) => {
        res.json('new Plant has added success')
    })
})

router.get('/all',(req,res)=>{
    Plant.find((err, sendPlants)=>{
        res.json(sendPlants)
    }).populate('added_by')
})

/* router.get('/all', (req, res)=>{
    Plant.find((err, plants)=>{
        res.json(plants)
    })
}) */


/* router.post('/land',(req,res)=>{
    const newLand = new Land(req.body)
    newLand.save((err, data)=>{
    console.log('this is data from land route',data)
    res.json(' i receive the land data success')
    })
}) */

module.exports = router;

/* 
what is req.file ?


 pic in name property in input field
1] this is req.file  { fieldname: 'pic',
[1]   originalname: 'ZUxjRmpcew.jpg',
[1]   encoding: '7bit',
[1]   mimetype: 'image/jpeg',
[1]   destination: 'public/images',
[1]   filename: '2021-05-27T08:39:08.043Z_ZUxjRmpcew.jpg',
[1]   path: 'public/images/2021-05-27T08:39:08.043Z_ZUxjRmpcew.jpg',
[1]   size: 402261 }
[1] this is new plant { _id: 60af5aac365ce47bb553efb2,
[1]   namePlant: 'hanha',
[1]   pic: '/images/2021-05-27T08:39:08.043Z_ZUxjRmpcew.jpg' 
*/