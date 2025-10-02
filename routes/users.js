
const express = require('express');
const router = express.Router();
const { upgradeToAdmin, Allusers } = require('../controllers/users.controller');
const { verifyGoogleToken } = require('../middleware/verifyGoogleToken');
const { authorizeAdminOrEmployee } = require('../middleware/auth');
const User = require('../models/user');

// Get all users (protected)
router.get('/', verifyGoogleToken, authorizeAdminOrEmployee, Allusers);

// Get a user by ID (protected)
router.get('/:id', verifyGoogleToken, authorizeAdminOrEmployee, async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) return res.status(404).json({ message: 'User not found' });
		res.status(200).json(user);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Create a new user (open, or you can protect if needed)
router.post('/', async (req, res) => {
	try {
		const user = new User(req.body);
		await user.save();
		res.status(201).json(user);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

// Update a user (protected)
router.put('/:id', verifyGoogleToken, authorizeAdminOrEmployee, async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (!user) return res.status(404).json({ message: 'User not found' });
		res.status(200).json(user);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

// Delete a user (protected)
router.delete('/:id', verifyGoogleToken, authorizeAdminOrEmployee, async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);
		if (!user) return res.status(404).json({ message: 'User not found' });
		res.status(200).json({ message: 'User deleted successfully' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Upgrade role (protected)
router.post('/upgrade-role', verifyGoogleToken, upgradeToAdmin);

module.exports = router;
