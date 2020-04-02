const mongoose = require("mongoose")
const Schema = mongoose.Schema

const speakerSchema = new Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("speaker", speakerSchema)