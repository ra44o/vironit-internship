const bcr = require('bcryptjs');

const encryptPass = async (req, res, next) => {
  try {
    if (req.body.password) {
      req.body.password = await bcr.hash(req.body.password, 8);
    }
    next();
  } catch (err) {
    res.status(403).send({ msg: err.message });
  }
};

const comparePass = async (data, hash) => {
  return await bcr.compare(data, hash);
};

module.exports = {
  encryptPass,
  comparePass
};