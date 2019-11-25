const jwt = require('jsonwebtoken');
const User = require('../../models/user-model');

const authorize = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
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
    res.status(401).send({ msg: err.message });
  }
}

const generateAuthToken = user => {
  return jwt.sign({ _id: user._id }, 'myapp');
}

module.exports = {
  authorize,
  generateAuthToken
};