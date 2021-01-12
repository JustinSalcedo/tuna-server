/* Imports the data storage model */
const Model = require('./model')

/* Adds the object 'message' and stores it using the model */
async function addLayout(model) {
    const myModel = new Model(model)    //Message becomes a new instance of the Model object
    const newModel = await myModel.save()        //Parsed message is saved in its collection
    return newModel
}

async function findLayout(id) {
    const results = await Model.findById(id)
    return results
}

function searchLayout(filter) {
    return new Promise((resolve, reject) => {
        Model.find(filter)
            .populate('sections')
            .exec ((err, populated) => {
                if(err) {
                    reject(err)
                }
                resolve(populated)
            })
    })
}

function updateLayout(id, updates) {
    return Model.findByIdAndUpdate(id, updates, {new: true, useFindAndModify: false})
}

function deleteLayout(id) {
    return Model.findByIdAndDelete(id, {useFindAndModify: false})
}

module.exports = {
    add: addLayout,
    search: searchLayout,
    update: updateLayout,
    delete: deleteLayout,
    find: findLayout
}