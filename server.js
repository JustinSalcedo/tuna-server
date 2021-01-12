/* Imports modules and packages */
const express = require('express')  //Imports express
const app = express()               //Create express app
const path = require('path')        //Imports path
const cors = require('cors')

const config = require('./config')  //Imports configuration file

const bodyParser = require('body-parser')   //Parse the body format
const db = require('./db')          //Imports database module

// Connects to the database
db(config.dbUrl)

app.use(cors())

const router = require('./network/routes')  //Imports router

// Sets Pugjs as template engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

/* Packages and modules to be used by the app */
app.use(bodyParser.json())  //Parse JSON format from body
app.use(bodyParser.urlencoded({ extended: true }))

router(app)     //Router used by the app

app.use(config.publicRoute , express.static('public')) //Defines route and directory for static files

/* Connects server to port */
app.listen(config.port, function() {        //Connects to port and does a verification callback function
    console.log('Application listening to ' + config.host + ':' + config.port)
})