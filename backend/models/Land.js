const mongoose = require('mongoose');
const { Schema } = require('mongoose');


const landPlant = new Schema({
  land:String,
   pic:String
})



const Land = mongoose.model('Land',landPlant)

module.exports = Land