const { Order, Tip, OutletTransaction, Stock, MenuItem } = require('../models');

// GET /api/outlet-dashboard — dashboard for outlet admin (single outlet view)
exports.overview = async (req, res) => {
  try {
    const outletId = req.outletId;

    const [orderStats, today, tipsSum, transactions] = await Promise.all([
      Order.aggregate([
        { $match: { outlet: outletId } },
        { $group: { _id: null, total: { $sum: 1 }, totalAmount: { $sum: '$totalAmount' } } }
      ]),
      Order.aggregate([
        {
          $match: {
            outlet: outletId,
            createdAt: { $gte: (() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; })() }
          }
        },
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      Tip.aggregate([
        { $match: { outletId } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]),
      OutletTransaction.aggregate([
        { $match: { outletId, status: 'Completed' } },
        { $group: { _id: '$transactionType', total: { $sum: '$amount' } } }
      ])
    ]);

    const stat = orderStats[0] || { total: 0, totalAmount: 0 };
    const todayCounts = today.reduce((a, c) => ({ ...a, [c._id]: c.count }), {});
    const txMap = transactions.reduce((a, c) => ({ ...a, [c._id]: c.total }), {});

    return res.json({
      success: true,
      data: {
        totalOrders: stat.total,
        totalOrderAmount: stat.totalAmount,
        todayOrders: todayCounts,
        totalTips: (tipsSum[0] && tipsSum[0].total) || 0,
        receivedFromLiquidity: txMap.CREDIT || 0,
        paidToLiquidity: txMap.DEBIT || 0,
        isShopOpen: req.outlet.isShopOpen
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed.', error: err.message });
  }
};

// GET /api/outlet-dashboard/top-sold-items — top-selling menu items
exports.topSoldItems = async (req, res) => {
  const outletId = req.outletId;
  const { limit = 5 } = req.query;
  const items = await Order.aggregate([
    { $match: { outlet: outletId, status: { $in: ['Delivered', 'Completed', 'Served'] } } },
    { $unwind: '$items' },
    {
      $group: {
        _id: '$items.menuItemId',
        name: { $first: '$items.name' },
        unitsSold: { $sum: '$items.quantity' },
        salesValue: { $sum: { $multiply: ['$items.quantity', '$items.price'] } }
      }
    },
    { $sort: { unitsSold: -1 } },
    { $limit: parseInt(limit) }
  ]);
  return res.json({ success: true, data: items });
};

// GET /api/outlet-dashboard/data-overview — totals breakdown for sidebar widget
exports.dataOverview = async (req, res) => {
  const outletId = req.outletId;
  const sums = await Order.aggregate([
    { $match: { outlet: outletId, status: { $nin: ['Cancelled', 'Failed'] } } },
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalSalesAmount: { $sum: '$totalAmount' },
        totalSalesLiquor: {
          $sum: { $cond: [{ $eq: ['$orderType', 'Liquor'] }, '$totalAmount', 0] }
        },
        totalSalesFood: {
          $sum: { $cond: [{ $eq: ['$orderType', 'Food'] }, '$totalAmount', 0] }
        },
        totalSalesVault: {
          $sum: { $cond: [{ $eq: ['$orderType', 'Vault'] }, '$totalAmount', 0] }
        }
      }
    }
  ]);
  const data = sums[0] || {
    totalOrders: 0, totalSalesAmount: 0, totalSalesLiquor: 0, totalSalesFood: 0, totalSalesVault: 0
  };
  delete data._id;
  return res.json({ success: true, data });
};

// GET /api/outlet-dashboard/monthly-sales — last 12 months sales (for chart)
exports.monthlySales = async (req, res) => {
  const outletId = req.outletId;
  const start = new Date();
  start.setMonth(start.getMonth() - 11);
  start.setDate(1); start.setHours(0, 0, 0, 0);

  const data = await Order.aggregate([
    { $match: { outlet: outletId, createdAt: { $gte: start } } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        amount: { $sum: '$totalAmount' },
        orders: { $sum: 1 }
      }
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } }
  ]);

  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const result = data.map((d) => ({
    month: months[d._id.month - 1],
    year: d._id.year,
    amount: d.amount,
    orders: d.orders
  }));
  return res.json({ success: true, data: result });
};
