const mongoose = require('mongoose');

// let connectionData = mongoose.connect('mongodb://localhost:27017/main-Admin').then(result => console.log("database successFully Contected")).catch( err => console.log(err));
// module.exports = connectionData
mongoose.connect('mongodb://127.0.0.1:27017/main-Admin');
const db = mongoose.connection;

// db.on('error', console.error.bind(console, "dataBase not working"));

db.once('open', function (err) {
    if (err) {
        console.log("dataBase in error" + err);
        return false;
    }
    console.log("dataBase is open");
})

module.exports = db;