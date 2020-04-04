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

    console.log(speaker)

    if(!speaker._id        || !speaker.firstName || !speaker.lastName || !speaker.email || 
       !speaker.area      || !speaker.city     || !speaker.province  || 
       !speaker.employer  || !speaker.mobileNumber){
        res.status(400)
        res.json({"error" : "The speaker could not be inserted into the database" })
    }
    else{
        let newSpeaker = new MongooseSpeakerModel(speaker)
        console.log(newSpeaker)

        newSpeaker.save((err, data) => {
            if (err) res.send(err)
            res.json(data)
        })
    }
})

//update speaker

router.put("/speakers/:id", (req, res, next) => {
    var speaker = req.body

    var changeSpeaker = {}
    
    if(speaker.FirstName)
        changeSpeaker.FirstName = speaker.FirstName

    if(speaker.LastName)
        changeSpeaker.LastName = speaker.LastName
    
    if(speaker.Email)
        changeSpeaker.Email = speaker.Email
    
    if(speaker.Area)
        changeSpeaker.Area = speaker.Area
    
    if(speaker.City)
        changeSpeaker.City = speaker.City

    if(speaker.Province)
        changeSpeaker.Province = speaker.Province

    if(speaker.Employer)
        changeSpeaker.Employer = speaker.Employer

    if(speaker.MobileNumber)
        changeSpeaker.MobileNumber = speaker.MobileNumber

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
router.delete("/speakers/:id", (req, res, next) => {
    MongooseSpeakerModel.findOneAndRemove({_id: req.params.id}, (err, data) => {
        if(err) res.send(err)
        res.json({message: "Successfully deleted speaker"})
    })
})

//seeder

router.get("/dummydata", (req, res, next) => {
    var data = [
        {
        "FirstName" : "Jim",
        "LastName" : "Potter",
        "Email" : "jim@potter.ca",
        "Area" : "Cloud Architect",
        "City" : "Chilliwack",
        "Province" : "BC",
        "Employer" : "BC Hydro",
        "MobileNumber" : "604-123-4567"
        },{
        "FirstName" : "Jane",
        "LastName" : "Douglas",
        "Email" : "jane@douglas.ca",
        "Area" : "Software Developer",
        "City" : "Abbosford",
        "Province" : "BC",
        "Employer" : "Cleavest Solution",
        "MobileNumber" : "604-123-0000"
        },{
        "FirstName" : "Tom",
        "LastName" : "Gardner",
        "Email" : "tom@gardner.ca",
        "Area" : "Software Developer",
        "City" : "Richmond",
        "Province" : "BC",
        "Employer" : "Tech Solution",
        "MobileNumber" : "604-215-0099"
         },{
        "FirstName" : "Ann",
        "LastName" : "Lee",
        "Email" : "ann@lee.ca",
        "Area" : "Web Developer",
        "City" : "Burnaby",
        "Province" : "BC",
        "Employer" : "Fortinet",
        "MobileNumber" : "778-215-0099"
        },{
        "FirstName" : "James",
        "LastName" : "Jones",
        "Email" : "james@jones.ca",
        "Area" : "Web Developer",
        "City" : "Vancouver",
        "Province" : "BC",
        "Employer" : "Amazon",
        "MobileNumber" : "778-215-1642"
        },{
        "FirstName" : "Susan",
        "LastName" : "Taylor",
        "Email" : "susan@taylor.ca",
        "Area" : "Web Designer",
        "City" : "Vancouver",
        "Province" : "BC",
        "Employer" : "Porton Corp",
        "MobileNumber" : "778-215-9843"
        },{
        "FirstName" : "Peter",
        "LastName" : "White",
        "Email" : "peter@white.ca",
        "Area" : "Instructor",
        "City" : "Burnaby",
        "Province" : "BC",
        "Employer" : "BCIT",
        "MobileNumber" : "778-215-0203"
        },{
        "FirstName" : "Philip",
        "LastName" : "Fox",
        "Email" : "philip@fox.ca",
        "Area" : "Solution Engineer",
        "City" : "Burnaby",
        "Province" : "BC",
        "Employer" : "D2L",
        "MobileNumber" : "778-215-1916"
        },{
        "FirstName" : "Dona",
        "LastName" : "Roy",
        "Email" : "dona@roy.ca",
        "Area" : "Software Engineer",
        "City" : "Richmond",
        "Province" : "BC",
        "Employer" : "Google",
        "MobileNumber" : "604-215-5673"
        }
    ]

    MongooseSpeakerModel.collection.insert(data, (err, docs) => {
        if (err) return console.error(err)
        else{
            console.log("Multiple documents inserted to speakers collection")          
        }        
    })

    res.redirect("/api/speakers")  
})

module.exports = router