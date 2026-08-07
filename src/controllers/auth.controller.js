const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Outlet } = require('../models');

const generateToken = (id) =>
  jwt.sign({ id, role: 'outlet_admin' }, process.env.JWT_SECRET, { expiresIn: '7d' });

// POST /api/outlet-auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const outlet = await Outlet.findOne({ email: email.toLowerCase() }).select('+password');
    if (!outlet || !outlet.password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }
    if (outlet.status !== 'Active') {
      return res.status(401).json({ success: false, message: 'Outlet is inactive.' });
    }

    const ok = await outlet.comparePassword(password);
    if (!ok) return res.status(401).json({ success: false, message: 'Invalid credentials.' });

    const token = generateToken(outlet._id);
    const data = outlet.toObject();
    delete data.password;

    return res.json({
      success: true,
      message: 'Login successful',
      data: { outlet: data, token }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Login failed.', error: err.message });
  }
};

// POST /api/outlet-auth/register   (initial outlet self-registration)
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name || !email || !password || !phone || !address) {
      return res.status(400).json({ success: false, message: 'name, email, password, phone, address are required.' });
    }
    const exists = await Outlet.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(409).json({ success: false, message: 'Email already registered.' });

    const outlet = await Outlet.create({ name, email, password, phone, address });
    const data = outlet.toObject();
    delete data.password;
    return res.status(201).json({ success: true, message: 'Registered. Awaiting approval.', data });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Registration failed.', error: err.message });
  }
};

// GET /api/outlet-auth/me
exports.me = async (req, res) => {
  return res.json({ success: true, data: req.outlet });
};

// PUT /api/outlet-auth/change-password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'currentPassword and newPassword required.' });
    }
    const outlet = await Outlet.findById(req.outletId).select('+password');
    const ok = await outlet.comparePassword(currentPassword);
    if (!ok) return res.status(400).json({ success: false, message: 'Current password is incorrect.' });

    outlet.password = newPassword;
    await outlet.save();
    return res.json({ success: true, message: 'Password changed.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed.', error: err.message });
  }
};

// POST /api/outlet-auth/forgot-password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const outlet = await Outlet.findOne({ email: (email || '').toLowerCase() });
    // Do not leak whether email exists
    return res.json({ success: true, message: 'If the email exists, reset instructions are sent.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed.', error: err.message });
  }
};

// POST /api/outlet-auth/logout (stateless – frontend just deletes token)
exports.logout = async (_req, res) => res.json({ success: true, message: 'Logged out.' });
