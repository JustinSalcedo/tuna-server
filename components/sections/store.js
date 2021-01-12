/* Imports the data storage model */
const Model = require('./model')

/* Adds the object 'message' and stores it using the model */
async function addSection(model) {
    const myModel = new Model(model)    //Message becomes a new instance of the Model object
    const newModel = await myModel.save()        //Parsed message is saved in its collection
    return newModel
}

function renderSection(data) {
    return new Promise((resolve, reject) => {
        console.log(data)

        Model.findById(data)
            .populate({
                path: 'children',
                populate: {
                    path: 'children',
                    populate: {
                        path: 'children'
                    }
                }
            })
            .populate('layout')
            .exec((error, populated) => {
                if(error) {
                    reject(error)
                    return false
                }

                resolve(populated)
            })
    })
}

async function searchSection(filter) {
    const results = await Model.find(filter)
    return results
}

async function findSection(filter) {
    const results = await Model.findOne(filter)
    return results
}

async function listCategories(agg) {
    const aggregation = await Model.aggregate(agg)
    return aggregation
}

function updateSection(id, updates) {
    return Model.findByIdAndUpdate(id, updates, {new: true, useFindAndModify: false})
}

function deleteSection(id) {
    return Model.findByIdAndDelete(id, {useFindAndModify: false})
}

module.exports = {
    add: addSection,
    search: searchSection,
    update: updateSection,
    delete: deleteSection,
    list: listCategories,
    find: findSection,
    render: renderSection
}