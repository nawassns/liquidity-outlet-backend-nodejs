const { MenuItem } = require('../models');

// GET /api/menu — list outlet's menu, filterable by category/type/search
exports.list = async (req, res) => {
  try {
    const { page = 1, limit = 50, category, type, status, search, isAvailable } = req.query;
    const filter = { outletId: req.outletId };
    if (category) filter.category = category;
    if (type) filter.type = type;
    if (status) filter.status = status;
    if (typeof isAvailable !== 'undefined') filter.isAvailable = isAvailable === 'true';
    if (search) filter.name = { $regex: search, $options: 'i' };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [items, total] = await Promise.all([
      MenuItem.find(filter).sort({ category: 1, name: 1 }).skip(skip).limit(parseInt(limit)),
      MenuItem.countDocuments(filter)
    ]);
    return res.json({ success: true, data: { items, total, page: +page, limit: +limit } });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to list menu.', error: err.message });
  }
};

// GET /api/menu/categories — distinct category list for this outlet
exports.categories = async (req, res) => {
  const cats = await MenuItem.distinct('category', { outletId: req.outletId });
  return res.json({ success: true, data: cats });
};

// POST /api/menu
exports.create = async (req, res) => {
  try {
    const item = await MenuItem.create({ ...req.body, outletId: req.outletId });
    return res.status(201).json({ success: true, message: 'Menu item added.', data: item });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Create failed.', error: err.message });
  }
};

// GET /api/menu/:id
exports.getOne = async (req, res) => {
  const item = await MenuItem.findOne({ _id: req.params.id, outletId: req.outletId });
  if (!item) return res.status(404).json({ success: false, message: 'Menu item not found.' });
  return res.json({ success: true, data: item });
};

// PUT /api/menu/:id
exports.update = async (req, res) => {
  try {
    const item = await MenuItem.findOneAndUpdate(
      { _id: req.params.id, outletId: req.outletId },
      req.body, { new: true, runValidators: true }
    );
    if (!item) return res.status(404).json({ success: false, message: 'Menu item not found.' });
    return res.json({ success: true, message: 'Menu item updated.', data: item });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Update failed.', error: err.message });
  }
};

// DELETE /api/menu/:id
exports.remove = async (req, res) => {
  const item = await MenuItem.findOneAndDelete({ _id: req.params.id, outletId: req.outletId });
  if (!item) return res.status(404).json({ success: false, message: 'Menu item not found.' });
  return res.json({ success: true, message: 'Menu item deleted.' });
};

// PATCH /api/menu/:id/availability
exports.toggleAvailability = async (req, res) => {
  const item = await MenuItem.findOne({ _id: req.params.id, outletId: req.outletId });
  if (!item) return res.status(404).json({ success: false, message: 'Menu item not found.' });
  item.isAvailable = !item.isAvailable;
  await item.save();
  return res.json({ success: true, message: 'Availability toggled.', data: item });
};
