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
    await createSchema.validate(req.body);
    next();
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
};

const validateCityUpdate = async (req, res, next) => {
  try {
    await updateSchema.validate(req.body);
    next();
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
}

module.exports = {
  validateCityCreate,
  validateCityUpdate
};
