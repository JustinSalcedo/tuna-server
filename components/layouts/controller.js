/* Imports modules and packages */
const store = require('./store')

const config = require('../../config')

/* Integrates data in an object for storage */
function addLayout(input, file) {
    return new Promise((resolve, reject) => {
        const {
            name,
            description,
            tags
        } = input
        
        // Fields verification
        if(!name && !file) {
            reject('[Adding layout] Error: Required fields')
            return false
        }

        const fileUrl = config.host + ':' + config.port + config.publicRoute + config.filesRoute + '/layouts/' + file.filename

        const fullModel = {       //Integrates data to object
            file: fileUrl,
            name,
            description,
            tags: tags ? tags.split(",").map(tag => tag.trim()) : []
        }

        store.add(fullModel)
            .then(model => resolve(model))
            .catch(err => reject(err))
    })
}

/* Filter results by search query */
function searchLayout(filter) {
    return new Promise((resolve, reject) => {
        let fullFilter = {}

        const { name, tags } = filter

        if(name) { fullFilter = {
            ...fullFilter,
            $or: fullFilter.$or ? [ ...fullFilter.$or, { name: { $regex: name, $options: 'i' } } ] : [{ name: { $regex: name, $options: 'i' } }] }
        }
        if(tags && tags.length !== 0) { fullFilter = {
            ...fullFilter,
            $or: fullFilter.$or ? [ ...fullFilter.$or, { tags: { $in: tags } } ] : [{ tags: { $in: tags } }] }
        }
        
        store.search(fullFilter)
            .then(results => resolve(results))
            .catch(err => reject(err))
    })
}

function findLayout(id) {
    return new Promise((resolve, reject) => {
        store.find(id)
            .then(data => {
                resolve(data)
            })
            .catch(err => reject(err))
    })
}

function updateLayout(target, changes) {
    return new Promise((resolve, reject) => {
        const results = store.update(target, changes)

        resolve(results)
    })
}

function deleteLayout(target) {
    return new Promise((resolve, reject) => {
        const results = store.delete(target)

        resolve(results)
    })
}

module.exports = {
    addLayout,
    searchLayout,
    updateLayout,
    deleteLayout,
    findLayout
}