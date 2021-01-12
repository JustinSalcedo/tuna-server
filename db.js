/* Imports Mongoose module to manage database */
const db = require('mongoose')

db.Promise = global.Promise     //Sets Mongoose to use the native promises

//Asynchronous connection to the database using a URL
async function connect(url) {
    await db.connect(url, {     //Options object to parse connection
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    console.log('[db] Successful connection')   //Success message
}

module.exports = connect