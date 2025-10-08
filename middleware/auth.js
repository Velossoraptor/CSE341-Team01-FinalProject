const User = require('../models/user');

// Authorization: checks for admin or employee role
async function authorizeAdminOrEmployee(req, res, next) {
  try {
    if (!req.user || !req.user.email) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: missing user context' });
    }

    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (
      !Array.isArray(user.roles) ||
      !['admin', 'employee'].some((role) => user.roles.includes(role))
    ) {
      return res
        .status(403)
        .json({ message: 'Forbidden: insufficient privileges' });
    }

    req.user = user; // enrich req.user with full DB record
    next();
  } catch (err) {
    console.error('❌ Role check failed:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

//Admin Access only
async function authorizeAdminOnly(req, res, next) {
  try {
    if (!req.user || !req.user.email) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: missing user context' });
    }

    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!Array.isArray(user.roles) || !user.roles.includes('admin')) {
      return res
        .status(403)
        .json({ message: 'Forbidden: admin access required' });
    }

    req.user = user; // enrich req.user with full DB record
    next();
  } catch (err) {
    console.error('❌ Admin check failed:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Authorization: checks for admin role only
function authorizeAdminOnly(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: admin access required.' });
  }
  next();
}

module.exports = { authorizeAdminOrEmployee, authorizeAdminOnly };

