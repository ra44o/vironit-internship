const { Router } = require('express');
const router = new Router();
const UserController = require('../controllers/user-controller');
const controller = new UserController();
const { validateUserCreate, validateUserUpdate, validateLogin } = require('../middlewares/validation/user-validation');
const { authorize } = require('../middlewares/authentication/auth');

router.get('/', controller.getAllUsers);
router.get('/:id', controller.getCertainUser);
router.post('/', validateUserCreate, controller.createUser);
router.post('/login', validateLogin, controller.login);
router.put('/:id', authorize, validateUserUpdate, controller.updateUser);
router.delete('/:id', authorize, controller.deleteUser);

module.exports = router;