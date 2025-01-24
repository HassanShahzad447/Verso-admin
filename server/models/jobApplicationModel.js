const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Please enter a valid email address.'],
  },
  cv: {
    type: String, 
    required: true,
  },
  linkedin: {
    type: String, 
    required: false,
  },
  coverLetter: {
    type: String, 
    required: false,
  },
  portfolio: {
    type: String, 
    required: false,
  },
  yearsOfExperience: {
    type: Number,
    required: true,
    min: 0,
  },
  location: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

module.exports = JobApplication;
