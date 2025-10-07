const User = require('../models/user');
const { getDb } = require('../db/connect');

exports.Allusers = async (req, res) => {
  /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Get all users'
    #swagger.description = 'Returns a list of all active users.'
  */
  try {
    const users = await User.find();
    res.status(200).json({
      message: users.length ? 'Users retrieved' : 'No users found',
      users,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.upgradeToAdmin = async (req, res) => {
  /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Upgrade user to admin'
    #swagger.description = 'Upgrades a regular user to admin role using a secret admin code.'
  */
  try {
    const { adminCode } = req.body;

    if (!adminCode || adminCode !== process.env.ADMIN_CODE) {
      return res.status(403).json({ message: 'Invalid admin code' });
    }

    if (!req.user || !req.user.email) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: missing user context' });
    }

    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!Array.isArray(user.roles)) {
      user.roles = ['customer']; // fallback if roles is missing
    }

    if (user.roles.includes('admin')) {
      return res.status(400).json({ message: 'User is already an admin' });
    }

    user.roles = ['admin'];
    await user.save();

    res
      .status(200)
      .json({ message: 'Role upgraded to admin', roles: user.roles });
  } catch (err) {
    console.error('❌ Upgrade to admin failed:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.downgradeRole = async (req, res) => {
  /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Change User Role'
    #swagger.description = 'Changes the role of a user from admin to customer. Must use Admin code. For testing purposes.'
  */
  try {
    const { adminCode } = req.body;

    if (!adminCode || adminCode !== process.env.ADMIN_CODE) {
      return res.status(403).json({ message: 'Invalid admin code' });
    }

    if (!req.user || !req.user.email) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: missing user context' });
    }

    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!Array.isArray(user.roles)) {
      user.roles = ['customer']; // fallback if roles is missing
    }

    if (user.roles.includes('customer')) {
      return res.status(400).json({ message: 'User is already a customer' });
    }

    user.roles = ['customer'];
    await user.save();

    res
      .status(200)
      .json({ message: 'Role downgraded to customer', roles: user.roles });
  } catch (err) {
    console.error('❌ Downgrade to customer failed:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteUser = async (req, res) => {
  /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Delete a user'
    #swagger.description = 'Deletes a user'
  */
  try {
    if (!req.user || !req.user.email) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: missing user context' });
    }
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user) return res.status(404).json({message: 'User not found.'});
    res.status(200).json({message: 'User deleted successfully.'});
  } catch (err) {
    console.error('❌ Delete User Failed:', err.message);
    res.status(500).json({ message: 'Error Deleting User' });
  }
};
