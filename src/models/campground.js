const mongoose = require("mongoose");

const campgroundSchema = new mongoose.Schema({
   name: {
       type: String,
       required: true,
       trim: true
   }, 
   price: {
       type: String,
       required: true,
       trim: true
   },
   image: {
       type: String,
       required: true,
       trim: true
   },
   description: {
        type: String,
        required: true,
        trim: true
   },
   owner: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: 'User'
    }
}, {
    timestamps: true
  
})

module.exports = mongoose.model("Campground", campgroundSchema);