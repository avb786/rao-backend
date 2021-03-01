
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const config = require("../config")

const addEmployee = async(params) => {
    if (await global.db.EmployeeList.findOne({ email: params.email })) {
        return "already registered";
    }
    const account = new global.db.EmployeeList(params);
    account.save();
    return account;
}

const deleteEmployee = async(id) => {
const accountDelete = global.db.EmployeeList.findByIdAndDelete(id, function (err) {
    if(err) 
    return new Error("Empoyee Deletion Error")
    return `Deleted Successfully of id: ${id}`
  });
  return accountDelete;
}



const updateEmployee = async (body) => {

let doc = await global.db.EmployeeList.findOneAndUpdate({_id : body._id}, body, {
    new: true,
    upsert: true // Make this update into an upsert
  });
  if(doc)
  return doc;
  else 
  throw Error("Not available");
 
}

const authenticate = async({ email, password, ipAddress }) => {
    const account = await global.db.Employee.findOne({ email });
    
    if (!account 
        // || !account.isVerified 
        || !bcrypt.compareSync(password, account.passwordHash)) {
        throw new Error('Email or password is incorrect');
    }

    // authentication successful so generate jwt and refresh tokens
    const jwtToken = await generateJwtToken(account);

    // const refreshToken = generateRefreshToken(account, ipAddress);

    // save refresh token
    // await refreshToken.save();

    // return basic details and tokens
    const data = {
        ...basicDetails(account),
        jwtToken,
        // refreshToken: refreshToken.token
    }
    return data;
}

async function generateJwtToken(account) {
    // create a jwt token containing the account id that expires in 7 Days
    console.log('JWT account', account.id);
    
    return await jwt.sign({ sub: account.id, id: account.id }, config.secret, { expiresIn: '7d' });
}

const register = async(params, origin) => {
    // validate
    if (await global.db.Employee.findOne({ email: params.email })) {
        // send already registered error in email to prevent account enumeration
        return "already registered";
    }
        // create account object
        const account = new global.db.Employee(params);

        // first registered account is an admin
        const isFirstAccount = (await global.db.Employee.countDocuments({})) === 0;
        account.role = isFirstAccount ? 'ADMIN' : 'USER';
        account.verificationToken = randomTokenCryptoString();
    
        // hash password
        account.passwordHash = hash(params.password);
    
        // save account
        await account.save();
    
        // send email
        return;
}

function randomTokenCryptoString() {
    return crypto.randomBytes(40).toString('hex');
}
function hash(password) {
    return bcrypt.hashSync(password, 10);
}
const getAll = async() =>{
    const accounts = await global.db.Employee.find();
    return accounts.map(x => basicDetails(x));
}

const getAllEmployee = async() => {
    return await global.db.EmployeeList.find();
}

const getById = async(id) =>{
    const accounts = await global.db.EmployeeList.find(id);
    return accounts;
}
function basicDetails(account) {
    const { id, firstName, lastName, email, role, isVerified } = account;
    return { id, firstName, lastName, email, role, isVerified };
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