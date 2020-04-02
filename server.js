var express = require("express")
var path = require("path")
var bodyParser = require("body-parser")

var index = require("./routes/index")
var speakers = require("./routes/speakers")
var dotenv = require("dotenv")
var path = require("path")

var mongoose = require("mongoose")

var app = express()

let confPath = path.join(__dirname, '.env')
dotenv.config({path: confPath})
var port = process.env.PORT || 3000
var db_server = process.env.DB_SERVER || "localhost"

mongoose.connect("mongodb://" + db_server + "/speakers", function (err) {
    if (err) throw err
    console.log("Successfully connected")
})

app.use(express.static(path.join(__dirname, "client")))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use("/", index)
app.use("/api", speakers)

app.listen(port, function (){
    console.log("Server started on port: " + port)
    console.log("Using mongo database on server " + db_server)
})