/* Imports modules and packages */
const express = require('express')
const router = express.Router()     //Initializes Express' Router

const config = require('../../config')
const response = require('../../network/response')  //Responses manager file
const controller = require('./controller')      //Imports the logic controller

router.post('/add', function(req, res) {
    const input = req.body

    //Sends response to controller and gets a promise
    controller.addTemplate(input)
        .then(data => response.success(res, 201, 'Your model was submitted successfully', data))
        .catch(err => response.error(res, 500, 'Error processing your data. Check and try again', err))
})

//Sets procedures for requests by method through the router
router.get('/render/:viewId', function(req, res) {
    const input = req.params.viewId

    //Sends response to controller and gets a promise
    controller.renderTemplate(input)
        .then(data => response.render(res, 200, 'layer', data))
        .catch(err => response.error(res, 500, 'Error processing your data. Check and try again', err))
})

router.get('/render/random/:viewId', function(req, res) {
    const input = req.params.viewId

    //Sends response to controller and gets a promise
    controller.renderModel(input)
        .then(data => response.render(res, 200, 'layer', data))
        .catch(err => response.error(res, 500, 'Error processing your data. Check and try again', err))
})

module.exports = router