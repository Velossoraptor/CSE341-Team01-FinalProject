const User = require('../models/user');
const { getDb } = require('../db/connect');

exports.Allusers = async (req, res) => {
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
  const { adminCode } = req.body;

  if (!adminCode || adminCode !== process.env.ADMIN_CODE) {
    return res.status(403).json({ message: 'Invalid admin code' });
  }

  const user = req.user;

  if (user.roles.includes('admin')) {
    return res.status(400).json({ message: 'User is already an admin' });
  }

  user.roles.push('admin');
  await user.save();

  res
    .status(200)
    .json({ message: 'Role upgraded to admin', roles: user.roles });
};
