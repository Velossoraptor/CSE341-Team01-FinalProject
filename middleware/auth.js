// Authorization: checks for admin or employee role
function authorizeAdminOrEmployee(req, res, next) {
  if (!req.user || !['admin', 'employee'].includes(req.user.role)) {
    return res
      .status(403)
      .json({ message: 'Forbidden: insufficient privileges.' });
  }
  next();
}

//Admin Access only
function authorizeAdminOnly(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res
      .status(403)
      .json({ message: 'Forbidden: admin access required.' });
  }
  next();
}

module.exports = { authorizeAdminOrEmployee, authorizeAdminOnly };
