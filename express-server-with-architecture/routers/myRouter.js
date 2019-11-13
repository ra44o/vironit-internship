const express = require('express');
const router = new express.Router();
const MyController = require('../controllers/myController');
const controller = new MyController();

router.get('/api/users', controller.getUsers);
router.post('/api/users', controller.createUser);
router.put('/api/users', controller.updateUser);
router.delete('/api/users/:id', controller.deleteUser);

module.exports = router;