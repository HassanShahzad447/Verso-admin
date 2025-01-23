const express = require('express');
const { addAdmin, getAllUsers, signUp, signIn } = require('../controllers/userController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

// Add Admin (Super Admin Only)
router.post('/add-admin', protect, isAdmin, addAdmin);

// Get All Users (Super Admin Only)
router.get('/', protect, isAdmin, getAllUsers);

// Sign Up
router.post('/signup', signUp);

// Sign In
router.post('/signin', signIn);

module.exports = router;
