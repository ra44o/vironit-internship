const express = require('express');
const router = new express.Router();
const CityController = require('../controllers/city-controller');
const controller = new CityController();
const { validateCityCreate, validateCityUpdate } = require('../middlewares/validation/city-validation');

router.get('/', controller.getCities);
router.post('/', validateCityCreate, controller.createCity);
router.put('/:id', validateCityUpdate, controller.updateCity);
router.delete('/:id', controller.deleteCity);

module.exports = router;