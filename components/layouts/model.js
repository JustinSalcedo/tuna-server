/* Imports modules and packages */
const mongoose = require('mongoose')    //Mongoose: provides CRUD for the database
const Schema = mongoose.Schema      //Schema: new object model from Mongoose's schemas

/* Defines schema for the collection */
const mySchema = new Schema({       //Creates new instance of Schema
    /* Sets types and references */
    file: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    tags: [String],
    sections: [{
        type: Schema.Types.ObjectId, 
        ref: 'sections'
    }]
})

/* Exports model: requires collection name and the schema to be used */
const model = mongoose.model('layouts', mySchema)
module.exports = model