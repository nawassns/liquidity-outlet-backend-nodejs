const router = require('express').Router();
const ctrl = require('../controllers/report.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.use(authMiddleware);

// "Current Price List" = single endpoint returning prices for ALL categories
// (Whisky, Beer, Vodka, etc.). Frontend filters with ?category=Whisky or uses
// the "grouped" response for tab views.
router.get('/current-price-list', ctrl.currentPriceList);

router.get('/daily', ctrl.dailyReport);
router.get('/date-wise', ctrl.dateWiseReport);
router.get('/category-wise-sales', ctrl.categoryWiseSales);
router.get('/category-wise-stock', ctrl.categoryWiseStock);
router.get('/item-wise-sales', ctrl.itemWiseSales);
router.get('/category-wise-compare', ctrl.categoryWiseCompare);
router.get('/liquor-wise-compare', ctrl.liquorWiseCompare);
router.get('/orders', ctrl.orderReport);
router.get('/tips', ctrl.tipsReport);

module.exports = router;
