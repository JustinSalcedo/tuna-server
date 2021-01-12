/* Imports modules and packages */
const express = require('express')
const router = express.Router()     //Initializes Express' Router
const multer = require('multer')
const { uuid } = require('uuidv4')

const config = require('../../config')
const response = require('../../network/response')  //Responses manager file
const controller = require('./controller')      //Imports the logic controller

const storage = multer.diskStorage({
    destination: 'public/' + config.filesRoute + '/fonts/',
    filename: (req, file, cb) => cb(null, uuid() + '.css')
})

const upload = multer({ storage: storage })

//Sets procedures for requests by method through the router
router.post('/add', upload.single('file'), function(req, res) {
    const input = req.body
    const file = req.file

    //Sends response to controller and gets a promise
    controller.addFont(input, file)
        .then(data => response.success(res, 201, 'Your font pairing was submitted successfully', data))
        .catch(err => response.error(res, 500, 'Error processing your data. Check and try again', err))
})

router.post('/search', function(req, res) {
    const input = req.body

    //Sends response to controller and gets a promise
    controller.searchFont(input)
        .then(data => response.success(res, 200, 'Font pairing(s) found', data))
        .catch(err => response.error(res, 404, 'No matching results', err))
})

router.put('/update/:objectId', function(req, res) {
    const target = req.params.objectId
    const changes = req.body

    //Sends response to controller and gets a promise
    controller.updateFont(target, changes)
        .then(data => response.success(res, 200, 'Font pairing updated', data))
        .catch(err => response.error(res, 404, 'No matching results', err))
})

router.delete('/delete/:objectId', function(req, res) {
    const target = req.params.objectId

    //Sends response to controller and gets a promise
    controller.deleteFont(target)
        .then(data => response.success(res, 200, 'Font pairing deleted', data))
        .catch(err => response.error(res, 404, 'No matching results', err))
})

module.exports = router