const City = require('../models/city-model');

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
  const newCity = new City({ ...requestBody })
  await newCity.save();

  return {
    msg: 'City created'
  };
}

const update = async (requestId, requestBody) => {
  await City.updateOne(
    { _id: requestId },
    {
      $set: { ...requestBody }
    }
  );

  return {
    msg: 'City updated'
  };
}

const del = async requestId => {
  await City.updateOne(
    { _id: requestId },
    {
      $set: { "is_city__active": false }
    }
  );

  return {
    msg: 'City deleted'
  }
}

module.exports = {
  get,
  create,
  update,
  del
}