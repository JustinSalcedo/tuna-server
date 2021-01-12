/* Imports modules and packages */
const mongoose = require('mongoose')    //Mongoose: provides CRUD for the database
const Schema = mongoose.Schema      //Schema: new object model from Mongoose's schemas

/* Defines schema for the collection */
const mySchema = new Schema({       //Creates new instance of Schema
    /* Sets types and references */
    category: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    description: String,
    layout: {
        type: Schema.Types.ObjectId, 
        ref: 'layouts',
        required: true
    },
    children: [{
        type: Schema.Types.ObjectId, 
        ref: 'components',
        required: true
    }]
})

/* Exports model: requires collection name and the schema to be used */
const model = mongoose.model('sections', mySchema)
module.exports = model