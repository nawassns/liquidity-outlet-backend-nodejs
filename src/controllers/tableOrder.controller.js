const { Order } = require('../models');

// GET /api/table-orders — orders linked to a specific table or all tables
exports.list = async (req, res) => {
  try {
    const { tableId, status, date, page = 1, limit = 20 } = req.query;
    const filter = { outlet: req.outletId, tableId: { $exists: true, $ne: null } };
    if (tableId) filter.tableId = tableId;
    if (status) filter.status = status;
    if (date) {
      const d = new Date(date);
      const next = new Date(d); next.setDate(d.getDate() + 1);
      filter.createdAt = { $gte: d, $lt: next };
    }
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [items, total] = await Promise.all([
      Order.find(filter).populate('user', 'name email mobile')
        .sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
      Order.countDocuments(filter)
    ]);
    return res.json({ success: true, data: { orders: items, total, page: +page, limit: +limit } });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed.', error: err.message });
  }
};
