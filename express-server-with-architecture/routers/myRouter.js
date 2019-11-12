const express = require('express');
const router = new express.Router();
const MyController = require('../controllers/myController');
const controller = new MyController();

router.get('/', controller.getUsers);
router.post('/', controller.createUser);
router.put('/', controller.updateUser);
router.delete('/', controller.deleteUser);

module.exports = router;