/* Imports packages and modules */
const express = require('express')  //Uses express to set the router fot the app

/* Imports network modules from each component */
const models = require('../components/models/network')
const templates = require('../components/templates/network')
const sections = require('../components/sections/network')
const components = require('../components/components/network')
const colors = require('../components/colors/network')
const fonts = require('../components/fonts/network')
const layouts = require('../components/layouts/network')

/* Establishes the routers used by the server */
const routes = function(server) {
    server.use('/models', models)
    server.use('/templates', templates)
    server.use('/sections', sections)
    server.use('/components', components)
    server.use('/colors', colors)
    server.use('/fonts', fonts)
    server.use('/layouts', layouts)
}

module.exports = routes