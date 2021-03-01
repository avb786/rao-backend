const { responseGenerator } = require('../middleware/response-generator')
const employeeService = require('../services/employee.service')



const authenticate = (req, res, next) => {
    const { email, password } = req.body;
    const ipAddress = req.ip;
    employeeService.authenticate({ email, password, ipAddress })
        .then((response) => {
            setTokenCookie(res, response.jwtToken);
            res.json(response);
        })
        .catch(next);
}
const addEmployee = (req, res, next) => {
    employeeService.addEmployee(req.body).then((data) => responseGenerator(res, data, 200, 'Employee Added Successfully', false))
    .catch(err => {
        responseGenerator(res, {}, 404, 'Error in Employee Added', true)
    })
}


const updateEmployee = (req, res, next) => {
    employeeService.updateEmployee(req.body).then((data) => responseGenerator(res, data, 200, 'Employee updated Successfully', false))
    .catch(err => {
        responseGenerator(res, {}, 404, 'Error in Employee Update', true)
    })
}
const register = (req, res, next) => {
    employeeService.register(req.body, req.get('origin'))
        .then(() => responseGenerator(res, {}, 200, 'Registration successful, please check your email for verification instructions', false))
        .catch();
}

function setTokenCookie(res, token) {
    // create cookie with refresh token that expires in 7 days
    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 7*24*60*60*1000)
    };
    res.cookie('refreshToken', token, cookieOptions);
}



const getAll = (req, res, next) =>{
    employeeService.getAll()
        .then(accounts => responseGenerator(res, accounts, 200, 'Accounts Fetch Successfully', false))
        .catch(next);
}

const getAllEmployee= (req, res, next) =>{
    employeeService.getAllEmployee()
        .then(accounts => responseGenerator(res, accounts, 200, 'Accounts Fetch Successfully', false))
        .catch(next);
}

const deleteEmployee =(req, res, next) =>{
    employeeService.deleteEmployee()
        .then(accounts => responseGenerator(res, accounts, 200, 'Accounts Deleted Successfully', false))
        .catch(next);
}

const getById = (req, res, next) =>{
    employeeService.getById(req.params._id)
        .then(accounts => responseGenerator(res, accounts, 200, 'Accounts Fetch Successfully', false))
        .catch(next);
}


module.exports = {
    authenticate,
    register,
    getAll,
    addEmployee,
    updateEmployee,
    getById,
    getAllEmployee,
    deleteEmployee
}