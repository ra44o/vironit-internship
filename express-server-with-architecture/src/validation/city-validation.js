const Joi = require('joi');

const createSchema = Joi.object().keys({
  cityName: Joi.string().trim().required(),
  foundationYear: Joi.number().required(),
  isCityActive: Joi.boolean()
});

const updateSchema = Joi.object().keys({
  cityName: Joi.string().trim(),
  foundationYear: Joi.number(),
  isCityActive: Joi.boolean()
});

module.exports = {
  createSchema,
  updateSchema
};
