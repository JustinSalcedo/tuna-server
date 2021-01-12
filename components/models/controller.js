/* Imports modules and packages */
const store = require('./store')

/* Integrates data in an object for storage */
function addModel(input) {
    return new Promise((resolve, reject) => {
        const {
            model,
            category,
            structure,
            children
        } = input

        // Fields verification
        if(!model || !category || !structure || !children) {
            reject('[Adding model] Error: Required fields')
            return false
        }

        const fullModel = {       //Integrates data to object
            model,
            category,
            structure,
            children
        }

        store.add(fullModel)
            .then(model => resolve(model))
            .catch(err => reject(err))
    })
}

function renderModel(filter) {
    return new Promise((resolve, reject) => {
        const results = store.search(filter)

        resolve(results)
    })
}

/* Filter results by search query */
function searchModel(filter) {
    return new Promise((resolve, reject) => {
        const results = store.search(filter)

        resolve(results)
    })
}

/* Find one result by ID */
function findModel(id) {
    return new Promise((resolve, reject) => {
        const results = store.find(id)

        resolve(results)
    })
}

function updateModel(target, changes) {
    return new Promise((resolve, reject) => {
        const results = store.update(target, changes)

        resolve(results)
    })
}

function deleteModel(target) {
    return new Promise((resolve, reject) => {
        const results = store.delete(target)

        resolve(results)
    })
}

module.exports = {
    addModel,
    renderModel,
    searchModel,
    updateModel,
    deleteModel,
    findModel
}