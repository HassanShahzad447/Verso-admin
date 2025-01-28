const express = require('express');
const { addAdmin, getAllUsers, signUp, signIn, updateUser } = require('../controllers/userController');
const { protect, isAdmin, authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

// Add Admin (Super Admin Only)
router.post('/add-admin', protect, isAdmin, addAdmin);

// Get All Users (Super Admin Only)
router.get('/get', protect, isAdmin, getAllUsers);

// Sign Up
router.post('/signup', signUp);

// Sign In
router.post('/signin', signIn);

router.put('/:id', authenticate, updateUser);


module.exports = router;
