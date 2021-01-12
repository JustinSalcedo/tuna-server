/* Imports modules and packages */
const store = require('./store')

const config = require('../../config')

/* Integrates data in an object for storage */
function addFont(input, file) {
    return new Promise((resolve, reject) => {
        const {
            name,
            description,
            tags,
            faces
        } = input
        
        // Fields verification
        if(!name && !file) {
            reject('[Adding font] Error: Required fields')
            return false
        }

        const fileUrl = config.host + ':' + config.port + config.publicRoute + config.filesRoute + '/fonts/' + file.filename

        const fullModel = {       //Integrates data to object
            file: fileUrl,
            name,
            description,
            tags: tags ? tags.split(",").map(tag => tag.trim()) : [],
            faces: faces ? faces.split(",").map(face => face.trim()) : []
        }

        store.add(fullModel)
            .then(model => resolve(model))
            .catch(err => reject(err))
    })
}

/* Filter results by search query */
function searchFont(filter) {
    return new Promise((resolve, reject) => {
        let fullFilter = {}

        const { name, tags, faces } = filter

        if(name) { fullFilter = {
            ...fullFilter,
            $or: fullFilter.$or ? [ ...fullFilter.$or, { name: { $regex: name, $options: 'i' } } ] : [{ name: { $regex: name, $options: 'i' } }] }
        }
        if(tags && tags.length !== 0) { fullFilter = {
            ...fullFilter,
            $or: fullFilter.$or ? [ ...fullFilter.$or, { tags: { $in: tags } } ] : [{ tags: { $in: tags } }] }
        }
        if(faces && faces.length !== 0) { fullFilter = {
            ...fullFilter,
            $or: fullFilter.$or ? [ ...fullFilter.$or, { faces: { $in: faces } } ] : [{ faces: { $in: faces } }] }
        }
        
        store.search(fullFilter)
            .then(results => resolve(results))
            .catch(err => reject(err))
    })
}

function updateFont(target, changes) {
    return new Promise((resolve, reject) => {
        const results = store.update(target, changes)

        resolve(results)
    })
}

function deleteFont(target) {
    return new Promise((resolve, reject) => {
        const results = store.delete(target)

        resolve(results)
    })
}

module.exports = {
    addFont,
    searchFont,
    updateFont,
    deleteFont
}