const Joi = require('@hapi/joi');

const createSchema = Joi.object().keys({
  city_name: Joi.string().alphanum().trim().required(),
  foundation_year: Joi.number().integer().positive().required(),
  is_city_active: Joi.boolean()
});

const updateSchema = Joi.object().keys({
  city_name: Joi.string().alphanum().trim(),
  foundation_year: Joi.number().integer().positive(),
  is_city_active: Joi.boolean()
});

const validateCityCreate = async (req, res, next) => {
  try {
    await createSchema.validateAsync(req.body);
    next();
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
};

const validateCityUpdate = async (req, res, next) => {
  try {
    await updateSchema.validateAsync(req.body);
    next();
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
}

module.exports = {
  validateCityCreate,
  validateCityUpdate
};
