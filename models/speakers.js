const mongoose = require("mongoose")
const Schema = mongoose.Schema

const speakerSchema = new Schema({
    FirstName : {
        type: String,
        required: true
    },
    LastName : {
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    MobileNumber:{
        type: String,
        required: true
    },
    Area:{
        type: String,
        required: true
    },
    City:{
        type: String,
        required: true
    },
    Province: {
        type: String,
        required: true
    },
    Employer:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Speakers", speakerSchema)