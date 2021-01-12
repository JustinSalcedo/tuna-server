/* Imports modules and packages */
const store = require('./store')

/* Integrates data in an object for storage */
function addSection(input) {
    return new Promise((resolve, reject) => {
        const {
            category,
            tag,
            children,
            layout,
            description
        } = input
       
        // Fields verification
        if(!category || !tag || !layout || !children) {
            reject('[Adding section] Error: Required fields')
            return false
        }

        const fullModel = {       //Integrates data to object
            category,
            tag,
            children,
            layout,
            description
        }

        store.add(fullModel)
            .then(model => resolve(model))
            .catch(err => reject(err))
    })
}

/* Finds section by id and renders with pug */
async function renderSection(id){
    const rendered = await store.render(id)
    return rendered
}

/* Filter results by search query */
function searchSection(filter) {
    return new Promise((resolve, reject) => {
        const results = store.search(filter)

        resolve(results)
    })
}

function switchSection(sections) {
    return new Promise((resolve, reject) => {
        const { children } = sections
        async function getSections() {
            let ids = []
            for (let index = 0; index < children.length; index++) {
                let fullFilter = { category: children[index] }
                let element = await store.find(fullFilter)
                if (element) {
                    ids.push(element._id)
                }
            }
            
            return ids
        }
        
        getSections()
            .then(model => resolve(model))
            .catch(err => reject(err))
    })
}

/* Filter results by search query */
function searchCategories(filter) {
    return new Promise((resolve, reject) => {
        const { keywords } = filter
        let pattern = keywords.join("|")

        const aggregation = [
            { $match: { category: { $regex: pattern, $options: 'i' } } },
            { $group: { _id: "$category", count: { $sum: 1 } } }
        ]

        store.list(aggregation)
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}

function updateSection(target, changes) {
    return new Promise((resolve, reject) => {
        const results = store.update(target, changes)

        resolve(results)
    })
}

function deleteSection(target) {
    return new Promise((resolve, reject) => {
        const results = store.delete(target)

        resolve(results)
    })
}

module.exports = {
    addSection,
    searchSection,
    updateSection,
    deleteSection,
    searchCategories,
    switchSection,
    renderSection
}