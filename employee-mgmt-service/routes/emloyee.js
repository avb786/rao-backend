const express = require('express');

const router = express.Router();
const { register, getAll, authenticate, addEmployee, updateEmployee,getById, getAllEmployee, deleteEmployee } = require('../controllers/employee')
const {
     registerSchema,
    authenticateSchema,
    addEmployeeSchema
} = require('../middleware/employee')

console.log("ROUTES STARTED");


router.post('/register', registerSchema, register);
router.get('/getAll', getAll)
router.post('/authenticate', authenticateSchema, authenticate);
router.post('/add-employee', addEmployeeSchema, addEmployee)
router.put('/update-employee', updateEmployee)
router.get('/getById', getById)
router.get('/getAllEmployees', getAllEmployee)
router.delete('/deleteEmployee', deleteEmployee)


module.exports = router;