const router = require('express').Router();
const ctrl = require('../controllers/tableOrder.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.use(authMiddleware);

router.get('/', ctrl.list);

module.exports = router;
