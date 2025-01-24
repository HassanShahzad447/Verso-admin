const express = require('express');
const {
  createJobPosting,
  getAllJobPostings,
  getJobPostingById,
  updateJobPosting,
  deleteJobPosting
} = require('../controllers/jobController');

const router = express.Router();

// Routes for job postings
router.post('/addjobs', createJobPosting); 
router.get('/jobs', getAllJobPostings);             
router.get('/jobs/:id', getJobPostingById);         
router.put('/jobs/:id', updateJobPosting); 
router.delete('/jobs/:id', deleteJobPosting);       

module.exports = router;
