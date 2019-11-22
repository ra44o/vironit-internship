const express = require('express');
const router = new express.Router();
const UserController = require('../controllers/user-controller');
const controller = new UserController();
const { validateUserCreate, validateUserUpdate } = require('../middlewares/validation/user-validation');

router.get('/', controller.getAllUsers);
router.get('/:id', controller.getCertainUser);
router.post('/', validateUserCreate, controller.createUser);
router.put('/:id', validateUserUpdate, controller.updateUser);
router.delete('/:id', controller.deleteUser);

module.exports = router;