const router = require('express').Router();
const ctrl = require('../controllers/stock.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.use(authMiddleware);

router.get('/', ctrl.list);
router.get('/categories', ctrl.categories);
router.get('/movements', ctrl.movements);
router.get('/export', ctrl.exportAll);

router.post('/', ctrl.create);
router.post('/bulk-add', ctrl.bulkAdd);
router.post('/deduct', ctrl.deduct);

router.get('/:id', ctrl.getOne);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
