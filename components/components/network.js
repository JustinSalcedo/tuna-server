/* Imports modules and packages */
const express = require('express')
const router = express.Router()     //Initializes Express' Router

const config = require('../../config')
const response = require('../../network/response')  //Responses manager file
const controller = require('./controller')      //Imports the logic controller

//Sets procedures for requests by method through the router
router.post('/add', function(req, res) {
    const input = req.body

    //Sends response to controller and gets a promise
    controller.addComponent(input)
        .then(data => response.success(res, 201, 'Your component was submitted successfully', data))
        .catch(err => response.error(res, 500, 'Error processing your data. Check and try again', err))
})

router.get('/render/:viewId', function(req, res) {
    const input = req.params.viewId

    //Sends response to controller and gets a promise
    controller.renderComponent(input)
        .then(data => response.render(res, 200, 'component', data))
        .catch(err => response.error(res, 500, 'Error processing your data. Check and try again', err))
})

router.post('/search', function(req, res) {
    const input = req.body

    //Sends response to controller and gets a promise
    controller.searchComponent(input)
        .then(data => response.success(res, 200, 'Component(s) found', data))
        .catch(err => response.error(res, 404, 'No matching results', err))
})

router.put('/update/:objectId', function(req, res) {
    const target = req.params.objectId
    const changes = req.body

    //Sends response to controller and gets a promise
    controller.updateComponent(target, changes)
        .then(data => response.success(res, 200, 'Component updated', data))
        .catch(err => response.error(res, 404, 'No matching results', err))
})

router.delete('/delete/:objectId', function(req, res) {
    const target = req.params.objectId

    //Sends response to controller and gets a promise
    controller.deleteComponent(target)
        .then(data => response.success(res, 200, 'Component deleted', data))
        .catch(err => response.error(res, 404, 'No matching results', err))
})

module.exports = router