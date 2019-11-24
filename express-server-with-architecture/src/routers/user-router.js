const express = require('express');
const router = new express.Router();
const UserController = require('../controllers/user-controller');
const controller = new UserController();
const { validateUserCreate, validateUserUpdate, validateLogin } = require('../middlewares/validation/user-validation');
const { authorize } = require('../middlewares/authentication/auth');
const { encryptPass } = require('../middlewares/encryption/hash')

router.get('/', controller.getAllUsers);
router.get('/:id', controller.getCertainUser);
router.post('/', validateUserCreate, encryptPass, controller.createUser);
router.post('/login', validateLogin, controller.login);
router.put('/:id', authorize, validateUserUpdate, encryptPass, controller.updateUser);
router.delete('/:id', authorize, controller.deleteUser);

module.exports = router;