const mongoose = require("mongoose")
const Schema = mongoose.Schema

const speakerSchema = new Schema({
    _id:{
        type: String
    },
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    area:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    employer:{
        type: String,
        required: true
    },
    mobileNumber:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Speakers", speakerSchema)