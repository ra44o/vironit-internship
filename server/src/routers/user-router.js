const { Router } = require('express');
const router = new Router();
const UserController = require('../controllers/user-controller');
const controller = new UserController();
const { validateUserCreate, validateUserUpdate, validateLogin } = require('../middlewares/validation/user-validation');
const { authorize } = require('../middlewares/authentication/auth');

router.get('/', authorize, controller.getAllUsers);
router.get('/:login', controller.getCertainUser);
router.post('/', validateUserCreate, controller.createUser);
router.post('/login', validateLogin, controller.login);
router.post('/refresh', controller.refresh);
router.put('/:id', authorize, validateUserUpdate, controller.updateUser);
// router.delete('/:id', authorize, controller.deleteUser);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);

module.exports = router;