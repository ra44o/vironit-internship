const Joi = require('joi');

const createSchema = Joi.object().keys({
  name: Joi.string().trim().required(),
  surname: Joi.string().alphanum().trim().required(),
  isActive: Joi.boolean().falsy(''),
  cityID: Joi.string().trim()
});

const updateSchema = Joi.object().keys({
  name: Joi.string().trim(),
  surname: Joi.string().alphanum().trim(),
  isActive: Joi.boolean().falsy(''),
  cityID: Joi.string().trim()
});

const validateUserCreate = (req, res, next) => {
  try {
    createSchema.valid(req.body);
    next();
  } catch (err) {
    res.status(400).send('Bad request');
  }
};

const validateUserUpdate = (req, res, next) => {
  try {
    updateSchema.valid(req.body);
    next();
  } catch (err) {
    res.status(400).send('Bad request');
  }
};

module.exports = {
  validateUserCreate,
  validateUserUpdate
};