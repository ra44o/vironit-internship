const City = require('../models/city-model');
const Joi = require('joi');
const { createSchema, updateSchema } = require('../validation/city-validation');

const get = async () => {
  return await City.find(
    {},
    err => {
      if (err) {
        throw new Error('Can not find cities');
      }
    }
  );
}

const create = async requestBody => {
  Joi.validate(requestBody, createSchema, err => {
    if (err) {
      throw new Error(err);
    }
  });

  const newCity = new City({ ...requestBody })
  await newCity.save();

  return 'City created';
}

const update = async (requestId, requestBody) => {
  Joi.validate(requestBody, updateSchema, err => {
    if (err) {
      throw new Error(err);
    }
  });

  await City.updateOne(
    { _id: requestId },
    {
      $set: { ...requestBody }
    }
  );

  return 'City updated';
}

const del = async requestId => {
  await City.updateOne(
    { _id: requestId },
    {
      $set: { "isActive": false }
    }
  );
}

module.exports = {
  get,
  create,
  update,
  del
}