const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Function to add admin
const addAdmin = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const requestingUser = req.user;

        // Check if the requesting user is a super admin
        if (requestingUser.role !== 'super-admin') {
            return res.status(403).json({ message: 'Access denied. Only super admins can add admins.' });
        }

        // Hash password with bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new admin
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'admin', // Default to admin if no role is provided
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to get all users (for super admin)
const getAllUsers = async (req, res) => {
    try {
        const requestingUser = req.user;

        // Check if the requesting user is a super admin
        if (requestingUser.role !== 'super-admin') {
            return res.status(403).json({ message: 'Access denied. Only super admins can view all users.' });
        }

        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to sign up a user
const signUp = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'super-admin', // Default to admin if no role is provided
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to sign in a user
const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ 
            token, 
            user: { 
                name: user.name,
                role: user.role
            } 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Export functions
module.exports = { addAdmin, getAllUsers, signUp, signIn };
