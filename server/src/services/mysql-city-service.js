const db = require('../mysql');

const get = async () => {
  const connection = await db.getConnection();
  const result = await connection.query(
    `select * from cities;`
  );
  await connection.done();

  return result;
};

const create = async requestBody => {
  try {
    const connection = await db.getConnection();
    await connection.insert(
      'cities',
      requestBody
    );

    return {
      msg: "City created"
    };
  } catch (err) {
    throw new Error(err);
  }
};

const update = async (requestId, requestBody) => {
  try {
    const connection = db.getConnection();
    await connection.updateById(
      'cities',
      requestId,
      requestBody
    );
    await connection.done();

    return {
      msg: "City updated"
    }
  } catch (err) {
    throw new Error(err);
  }
};

const del = async requestId => {
  try {
    const connection = db.getConnection();
    await connection.updateById(
      'cities',
      requestId,
      { is_city_active: false }
    );
    await connection.done();

    return {
      msg: "City deleted"
    }
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  get,
  create,
  update,
  del
}