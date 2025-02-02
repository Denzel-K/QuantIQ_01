const mongoose = require('mongoose');
const validator = require('validator');

const ClientSchema = new mongoose.Schema({
  firstname: { 
    type: String, 
    required: [true, 'First name is required'], 
    trim: true 
  },
  lastname: { 
    type: String, 
    required: [true, 'Last name is required'], 
    trim: true 
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'], 
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Invalid email format']
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'], 
    minlength: [6, 'Password must be at least 6 characters'] 
  },
  companyname: { 
    type: String, 
    required: [true, 'Company name is required'], 
    trim: true 
  },
  databaseName: { 
    type: String, 
    required: true, 
    unique: true 
  }
});

module.exports = mongoose.model('Client', ClientSchema);