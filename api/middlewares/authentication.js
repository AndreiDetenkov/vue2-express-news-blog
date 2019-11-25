const User = require('../models/user');

module.exports = async (req, res, next) => {
  const token = req.get('token') || req.headers['token'];
  if (!token) return res.status(401).send({message: 'Access denied. No token provided.'});

  try {
    const user = await User.findOne({token});
    if (!user) return res.status(401).send({message: 'Access denied. User not found.'});
    req.user = user;
    next();
  } catch (e) {
    return res.status(401).send({ message: 'Invalid request.', error: e });
  }
};
