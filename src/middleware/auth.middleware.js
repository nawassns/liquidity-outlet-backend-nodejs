const jwt = require('jsonwebtoken');
const { Outlet } = require('../models');

// Outlet-admin authentication. Attaches req.outlet (the logged-in outlet).
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'outlet_admin') {
      return res.status(403).json({ success: false, message: 'Not an outlet admin token.' });
    }

    const outlet = await Outlet.findById(decoded.id).select('-password');
    if (!outlet) {
      return res.status(401).json({ success: false, message: 'Outlet not found. Token invalid.' });
    }
    if (outlet.status !== 'Active') {
      return res.status(401).json({ success: false, message: 'Outlet is inactive.' });
    }

    req.outlet = outlet;
    req.outletId = outlet._id;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') return res.status(401).json({ success: false, message: 'Invalid token.' });
    if (error.name === 'TokenExpiredError') return res.status(401).json({ success: false, message: 'Token expired.' });
    return res.status(500).json({ success: false, message: 'Authentication failed.', error: error.message });
  }
};

module.exports = { authMiddleware };
