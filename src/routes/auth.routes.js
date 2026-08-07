const router = require('express').Router();
const ctrl = require('../controllers/auth.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.post('/login', ctrl.login);
router.post('/register', ctrl.register);
router.post('/forgot-password', ctrl.forgotPassword);

router.get('/me', authMiddleware, ctrl.me);
router.put('/change-password', authMiddleware, ctrl.changePassword);
router.post('/logout', authMiddleware, ctrl.logout);

module.exports = router;
