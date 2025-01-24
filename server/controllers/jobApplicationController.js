const JobApplication = require('../models/jobApplicationModel');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();
// Configure AWS S3
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});


// Create a new job application
const createJobApplication = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      linkedin,
      coverLetter,
      portfolio,
      yearsOfExperience,
      location,
    } = req.body;

    // Access the uploaded file (CV)
    const cv = req.file;

    if (!cv) {
      return res.status(400).json({ message: 'CV file is required' });
    }

    const newApplication = new JobApplication({
      firstName,
      lastName,
      phoneNumber,
      email,
      linkedin,
      coverLetter,
      portfolio,
      yearsOfExperience,
      location,
    });

    // Upload CV to S3
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `cv/${Date.now()}_${cv.originalname}`, // Unique file name
      Body: cv.buffer, // File buffer
      ContentType: cv.mimetype,
    };

    try {
      const command = new PutObjectCommand(uploadParams);
      const s3Response = await s3.send(command);
      newApplication.cv = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${uploadParams.Key}`; // Construct the S3 URL
    } catch (s3Error) {
      console.error(s3Error);
      return res.status(500).json({ message: 'Error uploading CV to S3', error: s3Error.message });
    }

    await newApplication.save();
    res.status(201).json({ message: 'Job application submitted successfully!', data: newApplication });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error submitting job application', error: error.message });
  }
};

// Get all job applications
const getAllApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find();
    res.status(200).json({ data: applications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving applications', error: error.message });
  }
};

// Get a specific job application by ID
const getJobApplicationById = async (req, res) => {
  const { id } = req.params;
  try {
    const application = await JobApplication.findById(id);
    if (!application) {
      return res.status(404).json({ message: 'Job application not found' });
    }
    res.status(200).json({ data: application });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving job application', error: error.message });
  }
};

// Update a job application by ID
const updateJobApplication = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedApplication = await JobApplication.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedApplication) {
      return res.status(404).json({ message: 'Job application not found' });
    }
    res.status(200).json({ message: 'Job application updated successfully', data: updatedApplication });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating job application', error: error.message });
  }
};

// Delete a job application by ID
const deleteJobApplication = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedApplication = await JobApplication.findByIdAndDelete(id);
    if (!deletedApplication) {
      return res.status(404).json({ message: 'Job application not found' });
    }
    res.status(200).json({ message: 'Job application deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting job application', error: error.message });
  }
};

module.exports = {
  createJobApplication,
  getAllApplications,
  getJobApplicationById,
  updateJobApplication,
  deleteJobApplication,
};
