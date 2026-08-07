const { Employee } = require('../models');

// GET /api/employees
exports.list = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, search } = req.query;
    const filter = { outletId: req.outletId };
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [items, total] = await Promise.all([
      Employee.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
      Employee.countDocuments(filter)
    ]);
    return res.json({ success: true, data: { employees: items, total, page: +page, limit: +limit } });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to list employees.', error: err.message });
  }
};

// POST /api/employees
exports.create = async (req, res) => {
  try {
    const emp = await Employee.create({ ...req.body, outletId: req.outletId });
    return res.status(201).json({ success: true, message: 'Employee added.', data: emp });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Create failed.', error: err.message });
  }
};

// GET /api/employees/:id
exports.getOne = async (req, res) => {
  const emp = await Employee.findOne({ _id: req.params.id, outletId: req.outletId });
  if (!emp) return res.status(404).json({ success: false, message: 'Employee not found.' });
  return res.json({ success: true, data: emp });
};

// PUT /api/employees/:id
exports.update = async (req, res) => {
  try {
    const emp = await Employee.findOneAndUpdate(
      { _id: req.params.id, outletId: req.outletId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!emp) return res.status(404).json({ success: false, message: 'Employee not found.' });
    return res.json({ success: true, message: 'Employee updated.', data: emp });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Update failed.', error: err.message });
  }
};

// DELETE /api/employees/:id
exports.remove = async (req, res) => {
  const emp = await Employee.findOneAndDelete({ _id: req.params.id, outletId: req.outletId });
  if (!emp) return res.status(404).json({ success: false, message: 'Employee not found.' });
  return res.json({ success: true, message: 'Employee deleted.' });
};

// PATCH /api/employees/:id/status
exports.updateStatus = async (req, res) => {
  const { status } = req.body;
  if (!['Active', 'Inactive'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status.' });
  }
  const emp = await Employee.findOneAndUpdate(
    { _id: req.params.id, outletId: req.outletId },
    { status }, { new: true }
  );
  if (!emp) return res.status(404).json({ success: false, message: 'Employee not found.' });
  return res.json({ success: true, message: 'Status updated.', data: emp });
};
