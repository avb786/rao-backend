const Joi = require('joi');
const { validateRequest}  =require('./validateRequest');

const registerSchema = (req, res, next)  => {
    console.log("REGISTEr SCHEMA");
    
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
        acceptTerms: Joi.boolean().valid(true).required()
    });
    validateRequest(req, next, schema);
}

const addEmployeeSchema = (req, res, next) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required()
    });
    validateRequest(req, next, schema);
}

const authenticateSchema = (req, res, next) =>{
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}


module.exports = {
    registerSchema,
    authenticateSchema,
    addEmployeeSchema
}