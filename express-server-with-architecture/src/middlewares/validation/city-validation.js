const Joi = require('joi');

const createSchema = Joi.object().keys({
  cityName: Joi.string().alphanum().trim().required(),
  foundationYear: Joi.number().integer().positive().required(),
  isCityActive: Joi.boolean()
});

const updateSchema = Joi.object().keys({
  cityName: Joi.string().alphanum().trim(),
  foundationYear: Joi.number().integer().positive(),
  isCityActive: Joi.boolean()
});

const validateCityCreate = (req, res, next) => {
  try {
    createSchema.valid(req.body);
    next();
  } catch (err) {
    res.status(400).send('Bad request');
  }
};

const validateCityUpdate = (req, res, next) => {
  try {
    updateSchema.valid(req.body);
    next();
  } catch (err) {
    res.status(400).send('Bad request');
  }
}

module.exports = {
  validateCityCreate,
  validateCityUpdate
};
