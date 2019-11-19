const express = require('express');
const router = new express.Router();
const UserController = require('../controllers/user-controller');
const controller = new UserController();

router.get('/', controller.getAllUsers);
router.get('/:id', controller.getCertainUser);
router.post('/', controller.createUser);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);

module.exports = router;