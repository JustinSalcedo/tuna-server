/* Imports modules and packages */
const store = require('./store')

const config = require('../../config')

/* Integrates data in an object for storage */
function addColor(input, file) {
    return new Promise((resolve, reject) => {
        const {
            name,
            description,
            tags,
            samples
        } = input
        
        // Fields verification
        if(!name && !file) {
            reject('[Adding color] Error: Required fields')
            return false
        }

        const fileUrl = config.host + ':' + config.port + config.publicRoute + config.filesRoute + '/colors/' + file.filename

        const fullModel = {       //Integrates data to object
            file: fileUrl,
            name,
            description,
            tags: tags ? tags.split(",").map(tag => tag.trim()) : [],
            samples: samples ? samples.split(",").map(sample => sample.trim()) : []
        }

        store.add(fullModel)
            .then(model => resolve(model))
            .catch(err => reject(err))
    })
}

/* Filter results by search query */
function searchColor(filter) {
    return new Promise((resolve, reject) => {
        let fullFilter = {}

        const { name, tags, samples } = filter

        if(name) { fullFilter = {
            ...fullFilter,
            $or: fullFilter.$or ? [ ...fullFilter.$or, { name: { $regex: name, $options: 'i' } } ] : [{ name: { $regex: name, $options: 'i' } }] }
        }
        if(tags && tags.length !== 0) { fullFilter = {
            ...fullFilter,
            $or: fullFilter.$or ? [ ...fullFilter.$or, { tags: { $in: tags } } ] : [{ tags: { $in: tags } }] }
        }
        if(samples && samples.length !== 0) { fullFilter = {
            ...fullFilter,
            $or: fullFilter.$or ? [ ...fullFilter.$or, { samples: { $in: samples } } ] : [{ samples: { $in: samples } }] }
        }
        
        store.search(fullFilter)
            .then(results => resolve(results))
            .catch(err => reject(err))
    })
}

function updateColor(target, changes) {
    return new Promise((resolve, reject) => {
        const results = store.update(target, changes)

        resolve(results)
    })
}

function deleteColor(target) {
    return new Promise((resolve, reject) => {
        const results = store.delete(target)

        resolve(results)
    })
}

module.exports = {
    addColor,
    searchColor,
    updateColor,
    deleteColor
}