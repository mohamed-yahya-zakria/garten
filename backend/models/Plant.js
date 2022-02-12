const mongoose = require('mongoose');
const { Schema } = require('mongoose');


const PlantScheme = new Schema({
    namePlant: {
        type:String,

   /*   required:true,
        min:3,
        max:20, 
         unique: true, 
         default: "test",  */

    },
    pic: {
        type:String
    },
    added_by : {
        type: Schema.Types.ObjectId,
        ref: 'User'
       },
})

const Plant = mongoose.model('Plant',PlantScheme)
module.exports = Plant;
