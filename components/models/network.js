/* Imports modules and packages */
const express = require('express')
const router = express.Router()     //Initializes Express' Router

const config = require('../../config')
const response = require('../../network/response')  //Responses manager file
const controller = require('./controller')      //Imports the logic controller
const sectionsController = require('../sections/controller')
const templatesController = require('../templates/controller')

//Sets procedures for requests by method through the router
router.post('/add', function(req, res) {
    const input = req.body

    //Sends response to controller and gets a promise
    controller.addModel(input)
        .then(data => response.success(res, 201, 'Your model was submitted successfully', data))
        .catch(err => response.error(res, 500, 'Error processing your data. Check and try again', err))
})

router.get('/render/:modelId', function(req, res) {
    const input = req.params.modelId
    let model = {}

    //Sends response to controller and gets a promise
    controller.findModel(input)
        .then(data => {
            model = data
            let sections = { children: model.children }
            return sectionsController.switchSection(sections)
        })
        .then(data => {
            model.children = data
            return templatesController.randomTemplate(model)
        })
        .then(data => {
            console.log(data)
            return templatesController.renderTemplate(data._id)
        })
        .then(data => response.render(res, 200, 'layer', data))
        .catch(err => response.error(res, 500, 'Error processing your data. Check and try again', err))
})

router.get('/search', function(req, res) {
    const input = req.query

    //Sends response to controller and gets a promise
    controller.searchModel(input)
        .then(data => response.success(res, 200, 'Model(s) found', data))
        .catch(err => response.error(res, 404, 'No matching results', err))
})

router.get('/find/:modelId', function(req, res) {
    const input = req.params.modelId

    //Sends response to controller and gets a promise
    controller.findModel(input)
        .then(data => response.success(res, 200, 'Model(s) found', data))
        .catch(err => response.error(res, 404, 'No matching results', err))
})

router.put('/update/:objectId', function(req, res) {
    const target = req.params.objectId
    const changes = req.body

    //Sends response to controller and gets a promise
    controller.updateModel(target, changes)
        .then(data => response.success(res, 200, 'Model updated', data))
        .catch(err => response.error(res, 404, 'No matching results', err))
})

router.delete('/delete/:objectId', function(req, res) {
    const target = req.params.objectId

    //Sends response to controller and gets a promise
    controller.deleteModel(target)
        .then(data => response.success(res, 200, 'Model deleted', data))
        .catch(err => response.error(res, 404, 'No matching results', err))
})

module.exports = router