const mongoose = require('mongoose');

const jobPostingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    enum: ['onsite', 'remote', 'hybrid'],
    required: true
  },
  salaryRange: {
    min: {
      type: Number,
    },
    max: {
      type: Number,
    }
  },
  skillsRequirement: {
    type: [String], 
    required: true
  },
  lastDateToApply: {
    type: Date,
  }
}, { timestamps: true });

const JobPosting = mongoose.model('JobPosting', jobPostingSchema);

module.exports = JobPosting;
