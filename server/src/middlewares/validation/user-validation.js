const Joi = require('@hapi/joi');

const createSchema = Joi.object({
  name: Joi.string().trim().required(),
  surname: Joi.string().alphanum().trim().required(),
  is_user_active: Joi.boolean().falsy(''),
  city_id: Joi.string(),
  login: Joi.string().min(3),
  password: Joi.string().min(3)
});

const updateSchema = Joi.object({
  name: Joi.string().trim(),
  surname: Joi.string().alphanum().trim(),
  is_user_active: Joi.boolean().falsy(''),
  login: Joi.string().min(3),
  password: Joi.string().min(3)
});

const loginSchema = Joi.object({
  login: Joi.string().min(3).required(),
  password: Joi.string().min(3).required()
});

const validateUserCreate = async (req, res, next) => {
  try {
    await createSchema.validateAsync(req.body);
    next();
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
};

const validateUserUpdate = async (req, res, next) => {
  try {
    await updateSchema.validateAsync(req.body);
    next();
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
};

const validateLogin = async (req, res, next) => {
  try {
    await loginSchema.validateAsync(req.body);
    next();
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
};

module.exports = {
  validateUserCreate,
  validateUserUpdate,
  validateLogin
};