/* Imports modules and packages */
const express = require('express')
const router = express.Router()     //Initializes Express' Router

const config = require('../../config')
const response = require('../../network/response')  //Responses manager file
const controller = require('./controller')      //Imports the logic controller
const layoutController = require('../layouts/controller')

//Sets procedures for requests by method through the router
router.post('/add', function(req, res) {
    const input = req.body
    let layout, newSection

    //Sends response to controller and gets a promise
    controller.addSection(input)
        .then(data => {
            response.success(res, 201, 'Your section was submitted successfully', data)
            return data
        })
        .then(async data => {
            newSection = data
            layout = await layoutController.findLayout(newSection.layout)
            let results = [newSection, layout]
            return results
        })
        .then(data => {
            let changes = { sections: [...layout.sections, newSection._id] }
            return layoutController.updateLayout(layout._id, changes)
        })
        .catch(err => response.error(res, 500, 'Error processing your data. Check and try again', err))
})

router.get('/render/:viewId', function(req, res) {
    const input = req.params.viewId

    //Sends response to controller and gets a promise
    controller.renderSection(input)
        .then(data => response.render(res, 200, 'section', data))
        .catch(err => response.error(res, 500, 'Error processing your data. Check and try again', err))
})

router.post('/search', function(req, res) {
    const input = req.body

    //Sends response to controller and gets a promise
    controller.searchSection(input)
        .then(data => response.success(res, 200, 'Section(s) found', data))
        .catch(err => response.error(res, 404, 'No matching results', err))
})

router.post('/switch', function(req, res) {
    const input = req.body

    //Sends response to controller and gets a promise
    controller.switchSection(input)
        .then(data => response.success(res, 200, 'Section(s) found', data))
        .catch(err => response.error(res, 404, 'No matching results', err))
})

router.post('/search/categories', function(req, res) {
    const input = req.body

    //Sends response to controller and gets a promise
    controller.searchCategories(input)
        .then(data => response.success(res, 200, 'Section(s) found', data))
        .catch(err => response.error(res, 404, 'No matching results', err))
})

router.put('/update/:objectId', function(req, res) {
    const target = req.params.objectId
    const changes = req.body

    //Sends response to controller and gets a promise
    controller.updateSection(target, changes)
        .then(data => response.success(res, 200, 'Section updated', data))
        .catch(err => response.error(res, 404, 'No matching results', err))
})

router.delete('/delete/:objectId', function(req, res) {
    const target = req.params.objectId

    //Sends response to controller and gets a promise
    controller.deleteSection(target)
        .then(data => response.success(res, 200, 'Section deleted', data))
        .catch(err => response.error(res, 404, 'No matching results', err))
})

module.exports = router