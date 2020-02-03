const service = require('../services/city-service');
// const service = require('../services/mysql-city-service');

class CityController {
  constructor() { }

  async getCities(req, res) {
    try {
      const result = await service.get();
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send({ msg: error.message });
    }
  }

  async createCity(req, res) {
    try {
      const result = await service.create(req.body);
      res.status(201).send(result);
    } catch (error) {
      res.status(400).send({ msg: error.message });
    }
  }

  async updateCity(req, res) {
    try {
      const result = await service.update(req.params.id, req.body);
      res.status(204).send(result);
    } catch (error) {
      res.status(400).send({ msg: error.message });
    }
  }

  async deleteCity(req, res) {
    try {
      const result = await service.del(req.params.id);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send({ msg: error.message });
    }
  }
}

module.exports = CityController;