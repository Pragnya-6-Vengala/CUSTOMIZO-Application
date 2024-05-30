const cors = require('cors');

var corsOptionsDelegate = function (req, callback) {
    var corsOptions = { origin: 'http://localhost:3001', credentials: true };
    callback(null, corsOptions); // callback expects two parameters: error and options
}

module.exports = {
    cors: cors(),
    corsWithOptions: cors(corsOptionsDelegate)
}