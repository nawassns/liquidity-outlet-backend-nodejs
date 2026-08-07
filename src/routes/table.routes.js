const router = require('express').Router();
const ctrl = require('../controllers/table.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.use(authMiddleware);

router.get('/', ctrl.list);
router.get('/status-overview', ctrl.statusOverview);
router.post('/', ctrl.create);
router.get('/:id', ctrl.getOne);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);
router.patch('/:id/status', ctrl.updateStatus);

module.exports = router;
