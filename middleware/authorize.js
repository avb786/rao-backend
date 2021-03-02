const jwt = require("jsonwebtoken");
const secret = require('../config').secret;
const {responseGenerator} = require('../middleware/response-generator')

function authorize(req, res, next) {
  
  jwt.verify(req.headers.token, secret, function(err, decoded) {
      if(err) {
          responseGenerator(res, {}, 401, "Authentication Failed", true)
      }
      
  });
next()
return
}

module.exports = {
    authorize
}