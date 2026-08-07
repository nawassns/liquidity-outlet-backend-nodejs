const router = require('express').Router();
const ctrl = require('../controllers/dashboard.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.use(authMiddleware);

router.get('/', ctrl.overview);
router.get('/top-sold-items', ctrl.topSoldItems);
router.get('/data-overview', ctrl.dataOverview);
router.get('/monthly-sales', ctrl.monthlySales);

module.exports = router;
