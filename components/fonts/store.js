/* Imports the data storage model */
const Model = require('./model')

/* Adds the object 'message' and stores it using the model */
async function addFont(model) {
    const myModel = new Model(model)    //Message becomes a new instance of the Model object
    const newModel = await myModel.save()        //Parsed message is saved in its collection
    return newModel      //Parsed message is saved in its collection
}

async function searchFont(filter) {
    const results = await Model.find(filter)
    return results
}

function updateFont(id, updates) {
    return Model.findByIdAndUpdate(id, updates, {new: true, useFindAndModify: false})
}

function deleteFont(id) {
    return Model.findByIdAndDelete(id, {useFindAndModify: false})
}

module.exports = {
    add: addFont,
    search: searchFont,
    update: updateFont,
    delete: deleteFont
}