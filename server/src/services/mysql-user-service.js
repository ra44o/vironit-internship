const db = require('../mysql');
const bcrypt = require('bcryptjs');
const { generateAuthToken } = require('../middlewares/authentication/auth');

const getBooleanInsteadOfNumber = arr => {
  return arr.map(user => {
    return {
      ...user,
      is_user_active: Boolean(user.is_user_active)
    };
  });
}

const getOne = async requestLogin => {
  try {
    const connection = await db.getConnection();
    const result = await connection.query(
      `select users.id, name, surname, is_user_active, login, city_name as city 
      from users 
      left join cities on users.city_id=cities.id 
      where users.login="${requestLogin}" and users.is_user_active=1;`
    );
    await connection.done();

    return getBooleanInsteadOfNumber(result);
  } catch (err) {
    throw new Error(err);
  }
};

const getAll = async () => {
  try {
    const connection = await db.getConnection();
    const result = await connection.query(
      `select users.id, name, surname, is_user_active, login, city_name as city 
      from users 
      left join cities on users.city_id=cities.id 
      where users.is_user_active=1;`
    );
    await connection.done();

    return getBooleanInsteadOfNumber(result);
  } catch (err) {
    throw new Error(err);
  }
};

const create = async requestBody => {
  try {
    requestBody.password = await bcrypt.hash(requestBody.password, 8);
    const connection = await db.getConnection();
    const output = await connection.insert(
      'users',
      requestBody
    );
    const newUser = await connection.getById('users', output);
    let { id: _id, ...user } = newUser;
    user._id = _id;
    user = getBooleanInsteadOfNumber([user])[0];
    await connection.done();

    return {
      user,
      token: generateAuthToken(user),
      msg: 'User created'
    };
  } catch (err) {
    throw new Error(err);
  }
};

const login = async (login, password) => {
  const connection = await db.getConnection();
  const user = (await connection.query(
    `select * from users where login="${login}";`
  ))[0];
  if (!user) {
    throw new Error('User does not exist');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Wrong password');
  }
  const token = generateAuthToken(user);

  return { token };
}

const update = async (requestId, requestBody) => {
  try {
    requestBody.password = await bcrypt.hash(requestBody.password, 8);

    const connection = await db.getConnection();
    await connection.updateById(
      'users',
      requestId,
      requestBody
    );
    await connection.done();

    return {
      msg: "User updated"
    };
  } catch (err) {
    throw new Error(err);
  }
};

const del = async requestId => {
  try {
    const connection = await db.getConnection();
    await connection.updateById(
      'users',
      requestId,
      { is_user_active: false }
    );
    await connection.done();

    return {
      msg: "User deleted"
    };
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  del,
  login
}