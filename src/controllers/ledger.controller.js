const { LedgerEntry, OutletTransaction, Order, Tip, Commission } = require('../models');

// GET /api/ledger — full ledger entries for current outlet ("View Ledger" page)
exports.list = async (req, res) => {
  const { page = 1, limit = 50, entryType, startDate, endDate } = req.query;
  const filter = { outletId: req.outletId };
  if (entryType) filter.entryType = entryType;
  if (startDate || endDate) {
    filter.entryDate = {};
    if (startDate) filter.entryDate.$gte = new Date(startDate);
    if (endDate) filter.entryDate.$lte = new Date(endDate);
  }
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const [items, total] = await Promise.all([
    LedgerEntry.find(filter).sort({ entryDate: -1 }).skip(skip).limit(parseInt(limit)),
    LedgerEntry.countDocuments(filter)
  ]);

  const sums = await LedgerEntry.aggregate([
    { $match: { outletId: req.outletId } },
    { $group: { _id: null, totalDebit: { $sum: '$debit' }, totalCredit: { $sum: '$credit' } } }
  ]);
  const totals = sums[0] || { totalDebit: 0, totalCredit: 0 };
  totals.balance = (totals.totalCredit || 0) - (totals.totalDebit || 0);

  return res.json({ success: true, data: { entries: items, total, totals, page: +page, limit: +limit } });
};

// POST /api/ledger — manual entry
exports.create = async (req, res) => {
  try {
    const entry = await LedgerEntry.create({ ...req.body, outletId: req.outletId });
    return res.status(201).json({ success: true, message: 'Ledger entry created.', data: entry });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Create failed.', error: err.message });
  }
};

// GET /api/ledger/payment-receivable  (Payments Receivable page)
exports.paymentReceivable = async (req, res) => {
  // Sum of unpaid commissions / pending receivables
  const pendingCommissions = await Commission.aggregate([
    { $match: { outletId: req.outletId, status: 'Pending' } },
    { $group: { _id: null, total: { $sum: '$payableToOutlet' }, count: { $sum: 1 } } }
  ]);
  const pendingTransactions = await OutletTransaction.aggregate([
    { $match: { outletId: req.outletId, transactionType: 'CREDIT', status: 'Pending' } },
    { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } }
  ]);

  const commissions = pendingCommissions[0] || { total: 0, count: 0 };
  const transactions = pendingTransactions[0] || { total: 0, count: 0 };

  return res.json({
    success: true,
    data: {
      pendingCommissionsAmount: commissions.total,
      pendingCommissionsCount: commissions.count,
      pendingTransactionsAmount: transactions.total,
      pendingTransactionsCount: transactions.count,
      totalReceivable: commissions.total + transactions.total
    }
  });
};

// GET /api/ledger/commissions  (Order Commissions page)
exports.commissions = async (req, res) => {
  const { page = 1, limit = 50, status, startDate, endDate } = req.query;
  const filter = { outletId: req.outletId };
  if (status) filter.status = status;
  if (startDate || endDate) {
    filter.recordedOn = {};
    if (startDate) filter.recordedOn.$gte = new Date(startDate);
    if (endDate) filter.recordedOn.$lte = new Date(endDate);
  }
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const [items, total] = await Promise.all([
    Commission.find(filter).populate('orderId', 'orderNumber totalAmount status')
      .sort({ recordedOn: -1 }).skip(skip).limit(parseInt(limit)),
    Commission.countDocuments(filter)
  ]);
  const sums = await Commission.aggregate([
    { $match: { outletId: req.outletId } },
    { $group: { _id: null,
        totalCommission: { $sum: '$commissionAmount' },
        totalPayable: { $sum: '$payableToOutlet' } } }
  ]);
  return res.json({ success: true, data: { commissions: items, total, summary: sums[0] || {}, page: +page, limit: +limit } });
};

// GET /api/ledger/tips  (Tips By Customer page)
exports.tipsList = async (req, res) => {
  const { page = 1, limit = 50, startDate, endDate, employeeId } = req.query;
  const filter = { outletId: req.outletId };
  if (employeeId) filter.employeeId = employeeId;
  if (startDate || endDate) {
    filter.tipDate = {};
    if (startDate) filter.tipDate.$gte = new Date(startDate);
    if (endDate) filter.tipDate.$lte = new Date(endDate);
  }
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const [items, total] = await Promise.all([
    Tip.find(filter).populate('employeeId', 'name role')
      .sort({ tipDate: -1 }).skip(skip).limit(parseInt(limit)),
    Tip.countDocuments(filter)
  ]);
  const sum = await Tip.aggregate([
    { $match: { outletId: req.outletId } },
    { $group: { _id: null, total: { $sum: '$amount' } } }
  ]);
  return res.json({ success: true, data: { tips: items, total, totalAmount: (sum[0] && sum[0].total) || 0, page: +page, limit: +limit } });
};
