/* Imports modules and packages */
const store = require('./store')

/* Integrates data in an object for storage */
function addComponent(input) {
    return new Promise((resolve, reject) => {
        const {
            type,
            tag,
            description,
            children,
            nodes,
            placeholder
        } = input
        
        // Fields verification
        if(!type || !tag || !(children || nodes || placeholder)) {
            reject('[Adding section] Error: Required fields')
            return false
        }

        let fullModel = {       //Integrates data to object
            type,
            tag,
            description
        }

        let source = {}
        if(children) {
            source = { children }
        } else if(nodes) {
            source = { nodes }
        } else if(placeholder) {
            source = { placeholder }
        }
        
        fullModel = Object.assign(fullModel, source)

        store.add(fullModel)
            .then(model => resolve(model))
            .catch(err => reject(err))
    })
}

/* Finds section by id and renders with pug */
async function renderComponent(id){
    const rendered = await store.render(id)
    return rendered
}

/* Filter results by search query */
function searchComponent(filter) {
    return new Promise((resolve, reject) => {
        let fullFilter = {}
        
        if(filter.type || filter.tag || filter.children) {
            if (filter.type) {
                fullFilter = { $or : [] }
                fullFilter.$or.push({ type: { $regex: filter.type, $options: 'i' } })
            }
            if (filter.tag) {
                if (!fullFilter.$or) {
                    fullFilter = { $or : [] }
                }
                fullFilter.$or.push({ tag: filter.tag })
            }
            if (filter.children) {
                switch (filter.children) {
                    case "components":
                        childrenField = { $nor: [{ nodes: { $regex: "" } }, { placeholder: { $exists: true } }] }
                        break;
                    case "nodes":
                        childrenField = { nodes: { $regex: "" } }
                        break;
                    case "placeholder":
                    childrenField = { placeholder: { $exists: true } }
                    break;
                    default:
                        break;
                }
            }
            fullFilter =  Object.assign(fullFilter, childrenField)
        }
        
        const results = store.search(fullFilter)

        resolve(results)
    })
}

function updateComponent(target, changes) {
    return new Promise((resolve, reject) => {
        const results = store.update(target, changes)

        resolve(results)
    })
}

function deleteComponent(target) {
    return new Promise((resolve, reject) => {
        const results = store.delete(target)

        resolve(results)
    })
}

module.exports = {
    addComponent,
    searchComponent,
    updateComponent,
    deleteComponent,
    renderComponent
}