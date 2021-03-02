const express = require('express');
const {authorize} = require('../middleware/authorize')

const router = express.Router();
const { register, getAll, authenticate, addEmployee, updateEmployee,getById, getAllEmployee, deleteEmployee } = require('../controllers/employee')
const {
     registerSchema,
    authenticateSchema,
    addEmployeeSchema
} = require('../middleware/employee')

console.log("ROUTES STARTED");
router.post('/register', registerSchema, register);
router.get('/getAll', authorize, getAll)
router.post('/authenticate', authenticateSchema, authenticate);
router.post('/add-employee', authorize, addEmployee)
router.put('/update-employee',authorize, updateEmployee)
router.get('/getEmployeeById',authorize, getById)
router.get('/getAllEmployees',authorize, getAllEmployee)
router.delete('/deleteEmployee', authorize, deleteEmployee)


module.exports = router;