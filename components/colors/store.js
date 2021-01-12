/* Imports the data storage model */
const Model = require('./model')

/* Adds the object 'message' and stores it using the model */
async function addColor(model) {
    const myModel = new Model(model)    //Message becomes a new instance of the Model object
    const newModel = await myModel.save()        //Parsed message is saved in its collection
    return newModel
}

async function searchColor(filter) {
    const results = await Model.find(filter)
    return results
}

function updateColor(id, updates) {
    return Model.findByIdAndUpdate(id, updates, {new: true, useFindAndModify: false})
}

function deleteColor(id) {
    return Model.findByIdAndDelete(id, {useFindAndModify: false})
}

module.exports = {
    add: addColor,
    search: searchColor,
    update: updateColor,
    delete: deleteColor
}