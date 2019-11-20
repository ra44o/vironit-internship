const Joi = require('joi');

const createSchema = Joi.object().keys({
  name: Joi.string().trim().required(),
  surname: Joi.string().trim().required(),
  isActive: Joi.boolean(),
  cityID: Joi.string().trim()
});

const updateSchema = Joi.object().keys({
  name: Joi.string().trim(),
  surname: Joi.string().trim(),
  isActive: Joi.boolean(),
  cityID: Joi.string().trim()
});

module.exports = {
  createSchema,
  updateSchema
};