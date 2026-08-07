const { Stock, StockMovement } = require('../models');

// PHP categories — we expose this list so the frontend can build the tabs.
const STOCK_CATEGORIES = [
  'Whisky', 'Beer', 'Specialty Cocktails', 'Vodka', 'Gin', 'Tequila',
  'Rum', 'Wines & Sangria', 'Beverage', 'Liquor', 'Non Alcoholic', 'Bar Rail'
];

// GET /api/stock/categories
exports.categories = (_req, res) => res.json({ success: true, data: STOCK_CATEGORIES });

// GET /api/stock — list with filters: category, subCategory, productId, keyword
exports.list = async (req, res) => {
  try {
    const { page = 1, limit = 50, category, subCategory, productId, keyword, status } = req.query;
    const filter = { outletId: req.outletId };
    if (category) filter.category = category;
    if (subCategory) filter.subCategory = subCategory;
    if (productId) filter.menuItemId = productId;
    if (status) filter.status = status;
    if (keyword) filter.itemName = { $regex: keyword, $options: 'i' };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [items, total] = await Promise.all([
      Stock.find(filter).sort({ category: 1, itemName: 1 }).skip(skip).limit(parseInt(limit)),
      Stock.countDocuments(filter)
    ]);
    return res.json({ success: true, data: { items, total, page: +page, limit: +limit } });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to list stock.', error: err.message });
  }
};

// POST /api/stock — create a stock entry
exports.create = async (req, res) => {
  try {
    const stock = await Stock.create({ ...req.body, outletId: req.outletId });
    return res.status(201).json({ success: true, message: 'Stock entry created.', data: stock });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Create failed.', error: err.message });
  }
};

// GET /api/stock/:id
exports.getOne = async (req, res) => {
  const s = await Stock.findOne({ _id: req.params.id, outletId: req.outletId });
  if (!s) return res.status(404).json({ success: false, message: 'Stock not found.' });
  return res.json({ success: true, data: s });
};

// PUT /api/stock/:id
exports.update = async (req, res) => {
  try {
    const s = await Stock.findOneAndUpdate(
      { _id: req.params.id, outletId: req.outletId }, req.body,
      { new: true, runValidators: true }
    );
    if (!s) return res.status(404).json({ success: false, message: 'Stock not found.' });
    return res.json({ success: true, message: 'Stock updated.', data: s });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Update failed.', error: err.message });
  }
};

// DELETE /api/stock/:id
exports.remove = async (req, res) => {
  const s = await Stock.findOneAndDelete({ _id: req.params.id, outletId: req.outletId });
  if (!s) return res.status(404).json({ success: false, message: 'Stock not found.' });
  return res.json({ success: true, message: 'Stock deleted.' });
};

// POST /api/stock/bulk-add
// body: { items: [{ stockId, quantity }, ...], reason? }
exports.bulkAdd = async (req, res) => {
  try {
    const { items = [], reason } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'items array required.' });
    }
    const results = [];
    for (const it of items) {
      const stock = await Stock.findOne({ _id: it.stockId, outletId: req.outletId });
      if (!stock) continue;
      const before = stock.currentStock;
      stock.currentStock = before + Number(it.quantity || 0);
      await stock.save();
      await StockMovement.create({
        outletId: req.outletId,
        stockId: stock._id,
        type: 'BULK_ADD',
        quantity: Number(it.quantity || 0),
        beforeQty: before,
        afterQty: stock.currentStock,
        reason: reason || 'Bulk add',
        performedBy: req.outletId
      });
      results.push({ stockId: stock._id, before, after: stock.currentStock });
    }
    return res.json({ success: true, message: 'Bulk add completed.', data: results });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Bulk add failed.', error: err.message });
  }
};

// POST /api/stock/deduct
// body: { stockId, quantity, reason? }
exports.deduct = async (req, res) => {
  try {
    const { stockId, quantity, reason } = req.body;
    const qty = Number(quantity || 0);
    if (!stockId || qty <= 0) {
      return res.status(400).json({ success: false, message: 'stockId and positive quantity required.' });
    }
    const stock = await Stock.findOne({ _id: stockId, outletId: req.outletId });
    if (!stock) return res.status(404).json({ success: false, message: 'Stock not found.' });
    if (stock.currentStock < qty) {
      return res.status(400).json({ success: false, message: 'Insufficient stock.' });
    }
    const before = stock.currentStock;
    stock.currentStock = before - qty;
    await stock.save();
    await StockMovement.create({
      outletId: req.outletId,
      stockId: stock._id,
      type: 'DEDUCT',
      quantity: qty,
      beforeQty: before,
      afterQty: stock.currentStock,
      reason: reason || 'Manual deduct',
      performedBy: req.outletId
    });
    return res.json({ success: true, message: 'Stock deducted.', data: stock });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Deduct failed.', error: err.message });
  }
};

// GET /api/stock/movements — audit log
exports.movements = async (req, res) => {
  const { page = 1, limit = 50, stockId, type } = req.query;
  const filter = { outletId: req.outletId };
  if (stockId) filter.stockId = stockId;
  if (type) filter.type = type;
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const [items, total] = await Promise.all([
    StockMovement.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
    StockMovement.countDocuments(filter)
  ]);
  return res.json({ success: true, data: { items, total, page: +page, limit: +limit } });
};

// GET /api/stock/export — full list (used by EXPORT DATA button)
exports.exportAll = async (req, res) => {
  const items = await Stock.find({ outletId: req.outletId }).sort({ category: 1, itemName: 1 });
  return res.json({ success: true, data: items });
};
