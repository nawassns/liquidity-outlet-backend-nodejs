const router = require('express').Router();
const ctrl = require('../controllers/transaction.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

// Outlet admin views their own transactions
router.use(authMiddleware);

router.get('/', ctrl.list);
router.get('/:id', ctrl.getOne);

// The "create / update / delete" endpoints exist in the super-admin project,
// because super-admin records payments to outlets. They are NOT exposed here.

module.exports = router;
