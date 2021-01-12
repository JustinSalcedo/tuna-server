/* Defines responses' formats for network modules */

const statusMessages = {        //Message codes
    '200': 'Done',
    '201': 'Created',
    '400': 'Invalid format',
    '500': 'Internal error'
}

//Success response
exports.success = function(res, status, message, data) {
    if(!status) {       //Default status
        status = 200
    }

    if(!message) {      //Default message
        message = statusMessages[status]
    }

    res.status(status).send({   //Send status and message
        'status': true,
        message,
        'body': data
    })
}

exports.render = function(res, status, template, data) {
    if(!status) {       //Default status
        status = 200
    }

    //Renders template and sends data object
    res.status(status).render(template, data)
}

//Error response
exports.error = function(res, status, message, details) {   //Appends error details
    console.error(details)      //Logs error details
    res.status(status || 500).send({        //Generic error status and message
        'status': false,
        message,
        'body': details
    })
}