/* Imports the data storage model */
const Model = require('./model')

/* Adds the object 'message' and stores it using the model */
async function addModel(model) {
    const myModel = new Model(model)    //Message becomes a new instance of the Model object
    const newModel = await myModel.save()        //Parsed message is saved in its collection
    return newModel      //Parsed message is saved in its collection
}

async function searchModel(filter) {
    const results = await Model.find(filter)
    return results
}

async function findModel(id) {
    const results = await Model.findById(id)
    return results
}

function updateModel(id, updates) {
    return Model.findByIdAndUpdate(id, updates, {new: true, useFindAndModify: false})
}

function deleteModel(id) {
    return Model.findByIdAndDelete(id, {useFindAndModify: false})
}

module.exports = {
    add: addModel,
    search: searchModel,
    update: updateModel,
    delete: deleteModel,
    find: findModel
}