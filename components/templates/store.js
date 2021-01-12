/* Imports the data storage model */
const Model = require('./model')

/* Adds the object 'message' and stores it using the model */
async function addTemplate(model) {
    const myTemplate = new Model(model)    //Message becomes a new instance of the Model object
    const newTemplate = await myTemplate.save()        //Parsed message is saved in its collection
    return newTemplate
}

// function searchTemplate(filter) {
//     const results = Model.find(filter)
//     return results
// }

// function updateTemplate(id, updates) {
//     return Model.findByIdAndUpdate(id, updates, {new: true, useFindAndModify: false})
// }

// function deleteTemplate(id) {
//     return Model.findByIdAndDelete(id, {useFindAndModify: false})
// }

function findTemplate(id) {
    return new Promise((resolve, reject) => {
        Model.findById(id, function (err, template) {
            if (err) reject(err)
            resolve(template)
        })
    })
}

function renderTemplate(data) {
    return new Promise((resolve, reject) => {
        console.log(data)

        Model.findById(data)
            .populate({
                path: 'children',
                populate: {
                    path: 'children',
                    populate: {
                        path: 'children',
                        populate: {path: 'children'}
                    }
                }
            })
            .populate({
                path: 'children',
                populate: {
                    path: 'layout'
                }
            })
            .populate('color')
            .populate('font')
            .exec((error, populated) => {
                if(error) {
                    reject(error)
                    return false
                }

                resolve(populated)
            })
    })
}

module.exports = {
    add: addTemplate,
    // search: searchTemplate,
    // update: updateTemplate,
    // delete: deleteTemplate,
    find: findTemplate,
    render: renderTemplate
}