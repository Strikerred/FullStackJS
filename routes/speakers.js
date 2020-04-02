var express = require("express")
var router = express.Router()

const MongooseSpeakerModel = require("../models/speakers")

//get all
router.get("/speakers", (req, res) => {
    MongooseSpeakerModel.find({}, (err, data) =>{
        if (err) res.send(err)
        res.json(data)
    })
})

//get by id
router.get("/speakers/:id", (req, res, next) => {
    MongooseSpeakerModel.findById(req.params.id, (err, data) =>{
        if(err) res.send(err)
        res.json(data)
    })
})

//create new speaker
router.post("/speakers", (req, res, next) => {
    var speaker = req.body

    if(!speaker.firstName || !speaker.lastName){
        res.status(400)
        res.json({"error" : "The speaker could not be inserted into the database" })
    }
    else{
        let newSpeaker = new MongooseSpeakerModel(speaker)

        newSpeaker.save((err, data) => {
            if (err) res.send(err)
            res.json(data)
        })
    }
})

//update speaker

router.put("/speakers/:id", (res, req, next) => {
    var speaker = req.body

    var changeSpeaker = {}

    if(speaker.firstName)
        changeSpeaker.firstName = speaker.firstName

    if(speaker.lastName)
        changeSpeaker.lastName = speaker.lastName

    if(!changeSpeaker){
        res.status(400)
        res.json({"error": "Speaker could not be updated"})
    }else{
        MongooseSpeakerModel.findOneAndUpdate({_id: req.params.id}, req.body, {new: true},
            (err, data) =>{
                if (err) res.send(err)
                res.json(data)
            }
        )
    }
})

//delete speaker
router.delete("/speakers/:id", (res,req, next) => {
    MongooseSpeakerModel.findOneAndRemove({_id: req.paramas.id}, (err, data) => {
        if(err) res.send(err)
        res.json({message: "Successfully deleted speaker"})
    })
})

module.exports = router