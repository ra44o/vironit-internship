const express = require('express');
const router = new express.Router();
const UserController = require('../controllers/user-controller');
const controller = new UserController();
const { validateUserCreate, validateUserUpdate, validateLogin } = require('../middlewares/validation/user-validation');
const auth = require('../middlewares/authentication/auth');

router.get('/', controller.getAllUsers);
router.get('/:id', controller.getCertainUser);
router.post('/', validateUserCreate, controller.createUser);
router.post('/login', validateLogin, controller.login);
router.put('/:id', auth, validateUserUpdate, controller.updateUser);
router.delete('/:id', auth, controller.deleteUser);

module.exports = router;