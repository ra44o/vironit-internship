const jwt = require('jsonwebtoken');
const User = require('../../models/user-model');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer', '');
    if (token) {
      const decodedUser = jwt.verify(token, 'myapp');
      const dbUser = await User.findOne({ _id: decodedUser._id });
      if (!dbUser) {
        throw new Error('User not found');
      }
      next();
    } else {
      throw new Error('Please, log in');
    }
  } catch (err) {
    res.status(403).send({ msg: err.message });
  }
}

module.exports = auth;