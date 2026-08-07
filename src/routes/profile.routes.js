const router = require('express').Router();
const ctrl = require('../controllers/profile.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.use(authMiddleware);

router.get('/me', ctrl.getProfile);
router.put('/me', ctrl.updateProfile);
router.patch('/shop-status', ctrl.toggleShopStatus);

module.exports = router;
