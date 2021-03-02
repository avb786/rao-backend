const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const schema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  employeeVerified: {
    type: Boolean,
    default: false,
    required: true
  },
  branchState: {
    type: String,
    required: true
  },
  dateOfJoining: {
    type: Date,
    required: true
  },
  zipCode: {
    type: String
  }
}, {
    timestamps: true
  });

module.exports = mongoose.model("Employee_List", schema);
