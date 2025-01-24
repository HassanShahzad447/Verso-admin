const express = require('express');
const router = express.Router();
const {
  createJobApplication,
  getAllApplications,
  getJobApplicationById,
  updateJobApplication,
  deleteJobApplication,
} = require('../controllers/jobApplicationController');

router.post('/', createJobApplication);

router.get('/', getAllApplications);

router.get('/:id', getJobApplicationById);

router.put('/:id', updateJobApplication);

router.delete('/:id', deleteJobApplication);

module.exports = router;
