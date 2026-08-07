const router = require('express').Router();
const ctrl = require('../controllers/menu.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.use(authMiddleware);

router.get('/', ctrl.list);
router.get('/categories', ctrl.categories);
router.post('/', ctrl.create);
router.get('/:id', ctrl.getOne);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);
router.patch('/:id/availability', ctrl.toggleAvailability);

module.exports = router;
