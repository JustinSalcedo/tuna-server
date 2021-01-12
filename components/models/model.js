/* Imports modules and packages */
const mongoose = require('mongoose')    //Mongoose: provides CRUD for the database
const Schema = mongoose.Schema      //Schema: new object model from Mongoose's schemas

/* Defines schema for the collection */
const mySchema = new Schema({       //Creates new instance of Schema
    /* Sets types and references */
    model: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    structure: {
        type: String,
        required: true,
    },
    children: {
        type: [String],
        required: true,
    }
})

/* Exports model: requires collection name and the schema to be used */
const model = mongoose.model('models', mySchema)
module.exports = model