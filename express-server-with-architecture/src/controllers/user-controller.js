const service = require('../services/user-service');

class UserController {
  constructor() { }

  async getAllUsers(req, res) {
    try {
      const result = await service.getAll();
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send({ msg: err.message });
    }
  }

  async getCertainUser(req, res) {
    try {
      const result = await service.getOne(req.params.id);
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send({ msg: err.message });
    }
  }

  async createUser(req, res) {
    try {
      const result = await service.create(req.body);
      res.status(201).send(result);
    } catch (err) {
      res.status(400).send({ msg: err.message });
    }
  }

  async updateUser(req, res) {
    try {
      const result = await service.update(req.params.id, req.body);
      res.status(204).send(result);
    } catch (err) {
      res.status(400).send({ msg: err.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const result = await service.del(req.params.id);
      res.status(204).send(result);
    } catch (err) {
      res.status(400).send({ msg: err.message });
    }
  }
}

module.exports = UserController;