// Authentication and Authorization Middleware
// we may need to adjust user role logic to match our User model
// when created

const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Authentication: verifies JWT token
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required.' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
}

// Authorization: checks for admin or employee role
function authorizeAdminOrEmployee(req, res, next) {
  if (!req.user || !['admin', 'employee'].includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden: insufficient privileges.' });
  }
  next();
}

module.exports = { authenticate, authorizeAdminOrEmployee };