const service = require('../services/myService');

class MyController {
  constructor() { }

  getUsers(req, res) {
    try {
      const result = service.get();
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send({ msg: err.message });
    }
  }

  createUser(req, res) {
    try {
      const result = service.create(req.body);
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send({ msg: err.message });
    }
  }

  updateUser(req, res) {
    try {
      const result = service.update(req.body);
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send({ msg: err.message });
    }
  }

  deleteUser(req, res) {
    try {
      const result = service.del(req.params.id);
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send({ msg: err.message });
    }
  }
}

module.exports = MyController;