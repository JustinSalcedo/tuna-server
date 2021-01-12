/* Imports modules and packages */
const mongoose = require('mongoose')    //Mongoose: provides CRUD for the database
const Schema = mongoose.Schema      //Schema: new object model from Mongoose's schemas

/* Defines schema for the collection */
const mySchema = new Schema({       //Creates new instance of Schema
    /* Sets types and references */
    type: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    description: String,
    children: [{
        type: Schema.Types.ObjectId, 
        ref: 'components'
    }],
    nodes: [String],
    placeholder: String
})

/* Exports model: requires collection name and the schema to be used */
const model = mongoose.model('components', mySchema)
module.exports = model