const { OutletTransaction } = require('../models');

// GET /api/outlet-transactions  (Payment From Liquidity page)
exports.list = async (req, res) => {
  const { page = 1, limit = 20, type, status, startDate, endDate } = req.query;
  const filter = { outletId: req.outletId };
  if (type) filter.transactionType = type;
  if (status) filter.status = status;
  if (startDate || endDate) {
    filter.paidOn = {};
    if (startDate) filter.paidOn.$gte = new Date(startDate);
    if (endDate) filter.paidOn.$lte = new Date(endDate);
  }
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const [items, total] = await Promise.all([
    OutletTransaction.find(filter).sort({ paidOn: -1 }).skip(skip).limit(parseInt(limit)),
    OutletTransaction.countDocuments(filter)
  ]);

  // Totals summary
  const sums = await OutletTransaction.aggregate([
    { $match: { outletId: req.outletId, status: 'Completed' } },
    { $group: { _id: '$transactionType', total: { $sum: '$amount' } } }
  ]);
  const summary = { CREDIT: 0, DEBIT: 0 };
  sums.forEach((s) => { summary[s._id] = s.total; });

  return res.json({ success: true, data: { transactions: items, total, summary, page: +page, limit: +limit } });
};

// POST /api/outlet-transactions   (super-admin records a payment to outlet)
exports.create = async (req, res) => {
  try {
    const tx = await OutletTransaction.create({
      ...req.body,
      outletId: req.body.outletId || req.outletId,
      performedByAdminId: req.admin ? req.admin._id : null
    });
    return res.status(201).json({ success: true, message: 'Transaction recorded.', data: tx });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Create failed.', error: err.message });
  }
};

exports.getOne = async (req, res) => {
  const tx = await OutletTransaction.findOne({ _id: req.params.id, outletId: req.outletId });
  if (!tx) return res.status(404).json({ success: false, message: 'Transaction not found.' });
  return res.json({ success: true, data: tx });
};

exports.update = async (req, res) => {
  const tx = await OutletTransaction.findOneAndUpdate(
    { _id: req.params.id }, req.body, { new: true, runValidators: true }
  );
  if (!tx) return res.status(404).json({ success: false, message: 'Transaction not found.' });
  return res.json({ success: true, message: 'Transaction updated.', data: tx });
};

exports.remove = async (req, res) => {
  const tx = await OutletTransaction.findOneAndDelete({ _id: req.params.id });
  if (!tx) return res.status(404).json({ success: false, message: 'Transaction not found.' });
  return res.json({ success: true, message: 'Transaction deleted.' });
};
