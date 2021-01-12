/* Imports modules and packages */
const mongoose = require('mongoose')    //Mongoose: provides CRUD for the database
const Schema = mongoose.Schema      //Schema: new object model from Mongoose's schemas

/* Defines schema for the collection */
const mySchema = new Schema({       //Creates new instance of Schema
    /* Sets types and references */
    name: {
        type: String,
        required: true
    },
    description: String,
    category: {
        type: String,
        required: true
    },
    structure: {
        type: String,
        required: true
    },
    color: {
        type: Schema.Types.ObjectId, 
        ref: 'colors',
        required: true
    },
    font: {
        type: Schema.Types.ObjectId, 
        ref: 'fonts',
        required: true
    },
    children: [{
        type: Schema.Types.ObjectId, 
        ref: 'sections',
        required: true
    }]
})

/* Exports model: requires collection name and the schema to be used */
const model = mongoose.model('templates', mySchema)
module.exports = model