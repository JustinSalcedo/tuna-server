/* Imports modules and packages */
const store = require('./store')

const defaultColor = "5ebb5ff5e295f64de0f25d59"
const defaultFont = "5ebb743ae295f64de0f25d5b"

function addTemplate(input) {
    return new Promise((resolve, reject) => {
        const {
            name,
            description,
            category,
            structure,
            color,
            font,
            children
        } = input

        // Fields verification
        if(!name || !category || !structure || !color || !font || !children) {
            reject('[Adding model] Error: Required fields')
            return false
        }

        const fullModel = {       //Integrates data to object
            name,
            description,
            category,
            structure,
            color,
            font,
            children
        }

        store.add(fullModel)
            .then(model => resolve(model))
            .catch(err => reject(err))
    })
}

function randomTemplate(input) {
    return new Promise((resolve, reject) => {
        const {
            model,
            category,
            structure,
            children
        } = input

        // Fields verification
        if(!model || !category || !structure || !children) {
            reject('[Adding model] Error: Required fields')
            return false
        }

        const fullModel = {       //Integrates data to object
            name: model,
            category,
            structure,
            color: defaultColor,
            font: defaultFont,
            children
        }

        store.add(fullModel)
            .then(model => resolve(model))
            .catch(err => reject(err))
    })
}

/* Finds template by id and renders with pug */
async function renderTemplate(id){
    const rendered = await store.render(id)
    return rendered
}

module.exports = {
    addTemplate,
    // searchTemplate,
    // updateTemplate,
    // deleteTemplate,
    renderTemplate,
    randomTemplate
}