const { Stock, Order, Tip, MenuItem } = require('../models');

/* ============================================================
   OUTLET REPORTS — all reports the outlet admin can view.
   Each is a separate endpoint. The "Current Price List" is a
   SINGLE endpoint that returns prices for ALL categories
   (Whisky, Beer, Vodka, etc.) — frontend filters by category tab.
   ============================================================ */

// 1. GET /api/outlet-reports/current-price-list
// SINGLE API returns price data for every item across all categories.
// Optional ?category=Whisky filter, ?subCategory=, ?keyword= filters.
// Response includes Lock Price, Highest Price, Minimum Price, Current Price.
exports.currentPriceList = async (req, res) => {
  try {
    const { category, subCategory, keyword } = req.query;
    const filter = { outletId: req.outletId };
    if (category) filter.category = category;
    if (subCategory) filter.subCategory = subCategory;
    if (keyword) filter.itemName = { $regex: keyword, $options: 'i' };

    const items = await Stock.find(filter).sort({ category: 1, itemName: 1 });

    // Group by category (so the frontend can render tabs easily)
    const grouped = {};
    for (const it of items) {
      if (!grouped[it.category]) grouped[it.category] = [];
      grouped[it.category].push({
        _id: it._id,
        category: it.category,
        subCategory: it.subCategory,
        name: it.itemName,
        image: null,
        lockPrice: it.lockPrice,
        highestPrice: it.highestPrice,
        minimumPrice: it.minimumPrice,
        currentPrice: it.currentPrice,
        currentStock: it.currentStock,
        unit: it.unit
      });
    }

    return res.json({
      success: true,
      data: {
        items,            // flat list (for table view)
        grouped,          // grouped by category (for tabs)
        categories: Object.keys(grouped),
        total: items.length
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed.', error: err.message });
  }
};

// 2. GET /api/outlet-reports/daily — today's data
exports.dailyReport = async (req, res) => {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
  const data = await Order.aggregate([
    { $match: { outlet: req.outletId, createdAt: { $gte: today, $lt: tomorrow } } },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        amount: { $sum: '$totalAmount' }
      }
    }
  ]);
  const summary = await Order.aggregate([
    { $match: { outlet: req.outletId, createdAt: { $gte: today, $lt: tomorrow } } },
    { $group: { _id: null, totalOrders: { $sum: 1 }, totalAmount: { $sum: '$totalAmount' } } }
  ]);
  return res.json({
    success: true,
    data: { breakdown: data, summary: summary[0] || { totalOrders: 0, totalAmount: 0 } }
  });
};

// 3. GET /api/outlet-reports/date-wise?startDate=&endDate=
exports.dateWiseReport = async (req, res) => {
  const { startDate, endDate } = req.query;
  if (!startDate || !endDate) {
    return res.status(400).json({ success: false, message: 'startDate and endDate required.' });
  }
  const data = await Order.aggregate([
    {
      $match: {
        outlet: req.outletId,
        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        orders: { $sum: 1 },
        amount: { $sum: '$totalAmount' }
      }
    },
    { $sort: { _id: 1 } }
  ]);
  return res.json({ success: true, data });
};

// 4. GET /api/outlet-reports/category-wise-sales
exports.categoryWiseSales = async (req, res) => {
  const data = await Order.aggregate([
    { $match: { outlet: req.outletId, status: { $nin: ['Cancelled', 'Failed'] } } },
    { $unwind: '$items' },
    {
      $group: {
        _id: '$items.category',
        unitsSold: { $sum: '$items.quantity' },
        salesValue: { $sum: { $multiply: ['$items.quantity', '$items.price'] } }
      }
    },
    { $sort: { salesValue: -1 } }
  ]);
  return res.json({ success: true, data });
};

// 5. GET /api/outlet-reports/category-wise-stock
exports.categoryWiseStock = async (req, res) => {
  const data = await Stock.aggregate([
    { $match: { outletId: req.outletId } },
    {
      $group: {
        _id: '$category',
        totalItems: { $sum: 1 },
        totalStock: { $sum: '$currentStock' },
        avgPrice: { $avg: '$currentPrice' }
      }
    },
    { $sort: { _id: 1 } }
  ]);
  return res.json({ success: true, data });
};

// 6. GET /api/outlet-reports/item-wise-sales
exports.itemWiseSales = async (req, res) => {
  const { category, startDate, endDate } = req.query;
  const match = { outletId: req.outletId, status: { $nin: ['Cancelled', 'Failed'] } };
  if (startDate || endDate) {
    match.createdAt = {};
    if (startDate) match.createdAt.$gte = new Date(startDate);
    if (endDate) match.createdAt.$lte = new Date(endDate);
  }
  const pipeline = [
    { $match: match },
    { $unwind: '$items' }
  ];
  if (category) pipeline.push({ $match: { 'items.category': category } });
  pipeline.push({
    $group: {
      _id: '$items.menuItemId',
      itemName: { $first: '$items.name' },
      category: { $first: '$items.category' },
      unitsSold: { $sum: '$items.quantity' },
      salesValue: { $sum: { $multiply: ['$items.quantity', '$items.price'] } }
    }
  });
  pipeline.push({ $sort: { salesValue: -1 } });
  const data = await Order.aggregate(pipeline);
  return res.json({ success: true, data });
};

// 7. GET /api/outlet-reports/category-wise-compare?period1Start=...&period2Start=...
exports.categoryWiseCompare = async (req, res) => {
  const { period1Start, period1End, period2Start, period2End } = req.query;
  if (!period1Start || !period1End || !period2Start || !period2End) {
    return res.status(400).json({ success: false, message: 'All 4 dates required.' });
  }
  const make = async (s, e) => Order.aggregate([
    { $match: { outlet: req.outletId, createdAt: { $gte: new Date(s), $lte: new Date(e) } } },
    { $unwind: '$items' },
    { $group: {
        _id: '$items.category',
        salesValue: { $sum: { $multiply: ['$items.quantity', '$items.price'] } }
    } }
  ]);
  const [p1, p2] = await Promise.all([make(period1Start, period1End), make(period2Start, period2End)]);
  const map = {};
  p1.forEach(r => { map[r._id] = { category: r._id, period1: r.salesValue, period2: 0 }; });
  p2.forEach(r => {
    if (!map[r._id]) map[r._id] = { category: r._id, period1: 0, period2: r.salesValue };
    else map[r._id].period2 = r.salesValue;
  });
  return res.json({ success: true, data: Object.values(map) });
};

// 8. GET /api/outlet-reports/liquor-wise-compare
exports.liquorWiseCompare = async (req, res) => {
  // Same as category-wise-compare but limited to liquor categories
  const liquorCats = ['Whisky', 'Beer', 'Specialty Cocktails', 'Vodka', 'Gin', 'Tequila',
    'Rum', 'Wines & Sangria', 'Liquor', 'Bar Rail'];
  const { period1Start, period1End, period2Start, period2End } = req.query;
  if (!period1Start || !period1End || !period2Start || !period2End) {
    return res.status(400).json({ success: false, message: 'All 4 dates required.' });
  }
  const make = async (s, e) => Order.aggregate([
    {
      $match: {
        outlet: req.outletId,
        createdAt: { $gte: new Date(s), $lte: new Date(e) }
      }
    },
    { $unwind: '$items' },
    { $match: { 'items.category': { $in: liquorCats } } },
    { $group: {
        _id: { category: '$items.category', name: '$items.name' },
        unitsSold: { $sum: '$items.quantity' },
        salesValue: { $sum: { $multiply: ['$items.quantity', '$items.price'] } }
    } }
  ]);
  const [p1, p2] = await Promise.all([make(period1Start, period1End), make(period2Start, period2End)]);
  return res.json({ success: true, data: { period1: p1, period2: p2 } });
};

// 9. GET /api/outlet-reports/orders
exports.orderReport = async (req, res) => {
  const { startDate, endDate, status } = req.query;
  const filter = { outlet: req.outletId };
  if (status) filter.status = status;
  if (startDate || endDate) {
    filter.createdAt = {};
    if (startDate) filter.createdAt.$gte = new Date(startDate);
    if (endDate) filter.createdAt.$lte = new Date(endDate);
  }
  const orders = await Order.find(filter).sort({ createdAt: -1 }).limit(500);
  const summary = await Order.aggregate([
    { $match: filter },
    { $group: { _id: null, count: { $sum: 1 }, amount: { $sum: '$totalAmount' } } }
  ]);
  return res.json({
    success: true,
    data: { orders, summary: summary[0] || { count: 0, amount: 0 } }
  });
};

// 10. GET /api/outlet-reports/tips
exports.tipsReport = async (req, res) => {
  const { startDate, endDate } = req.query;
  const filter = { outletId: req.outletId };
  if (startDate || endDate) {
    filter.tipDate = {};
    if (startDate) filter.tipDate.$gte = new Date(startDate);
    if (endDate) filter.tipDate.$lte = new Date(endDate);
  }
  const tips = await Tip.find(filter).populate('employeeId', 'name role').sort({ tipDate: -1 }).limit(500);
  const summary = await Tip.aggregate([
    { $match: filter },
    { $group: { _id: '$paymentMode', total: { $sum: '$amount' }, count: { $sum: 1 } } }
  ]);
  const totalAmount = summary.reduce((a, s) => a + (s.total || 0), 0);
  return res.json({ success: true, data: { tips, summaryByMode: summary, totalAmount } });
};
;
