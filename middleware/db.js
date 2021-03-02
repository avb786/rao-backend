const mongoose = require('mongoose');
const config = require('../config')
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(config.database.host, config.database.mongo_options || connectionOptions)
.then(() => {
    console.log("DB CONNECTED");
}).catch( (error) =>{
    console.log("Error occured in DB", error)}
);;
mongoose.Promise = global.Promise;
module.exports = {
    Employee: require('../models/employee'),
    EmployeeList: require('../models/employee_list'),
    isValidId
};

function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}