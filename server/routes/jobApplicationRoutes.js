const express = require('express');
const multer = require('multer');
const router = express.Router();
const {
  createJobApplication,
  getAllApplications,
  getJobApplicationById,
  updateJobApplication,
  deleteJobApplication,
} = require('../controllers/jobApplicationController');

// Set up multer for file uploads
const storage = multer.memoryStorage(); // Store file in memory buffer
const upload = multer({ storage: storage });

router.post('/', upload.single('cv'), createJobApplication);

router.get('/', getAllApplications);

router.get('/:id', getJobApplicationById);

router.put('/:id', updateJobApplication);

router.delete('/:id', deleteJobApplication);

module.exports = router;
