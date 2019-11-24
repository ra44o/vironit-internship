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

const validateCityCreate = async (req, res, next) => {
  try {
    await createSchema.validateAsync(req.body);
    next();
  } catch (err) {
    res.status(400).send('Bad request');
  }
};

const validateCityUpdate = async (req, res, next) => {
  try {
    await updateSchema.validateAsync(req.body);
    next();
  } catch (err) {
    res.status(400).send('Bad request');
  }
}

module.exports = {
  validateCityCreate,
  validateCityUpdate
};
