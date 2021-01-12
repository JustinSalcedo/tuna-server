/* Imports the data storage model */
const Model = require('./model')

/* Adds the object 'message' and stores it using the model */
async function addComponent(model) {
    const myModel = new Model(model)    //Message becomes a new instance of the Model object
    const newModel = await myModel.save()        //Parsed message is saved in its collection
    return newModel
}

function renderComponent(data) {
    return new Promise((resolve, reject) => {

        Model.findById(data)
            .populate({
                path: 'children',
                populate: {
                    path: 'children'
                }
            })
            .exec((error, populated) => {
                if(error) {
                    reject(error)
                    return false
                }

                resolve(populated)
            })
    })
}

function searchComponent(filter) {
    const results = Model.find(filter)
    return results
}

function updateComponent(id, updates) {
    return Model.findByIdAndUpdate(id, updates, {new: true, useFindAndModify: false})
}

function deleteComponent(id) {
    return Model.findByIdAndDelete(id, {useFindAndModify: false})
}

module.exports = {
    add: addComponent,
    search: searchComponent,
    update: updateComponent,
    delete: deleteComponent,
    render: renderComponent
}