const router = require('express').Router();
const ctrl = require('../controllers/ledger.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.use(authMiddleware);

router.get('/', ctrl.list);
router.post('/', ctrl.create);
router.get('/payment-receivable', ctrl.paymentReceivable);
router.get('/commissions', ctrl.commissions);
router.get('/tips', ctrl.tipsList);

module.exports = router;
