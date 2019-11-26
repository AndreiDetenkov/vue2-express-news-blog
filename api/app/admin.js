const express = require('express');
const User = require('../models/user');

module.exports = createRouter = () => {
  const router = express.Router();

  router.post('/login', async (req, res) => {
    let user;
    let isMatch;
    const { username, password } = req.body;

    try {
      user = await User.findOne({ username });
      if (!user) return res.status(400).send({ message: 'Incorrect username.' });
    } catch (e) {
      return res.status(400).send({ message: ' Username Error.', error: e });
    }

    try {
      isMatch = await user.comparePassword(password);
      if (!isMatch) return res.status(400).send({ message: 'Incorrect password' });
    } catch (e) {
      return res.status(400).send({ message: 'Password Error.', error: e });
    }

    const token = user.generateToken();
    user.token = token;

    try {
      await user.save();
      return res.send({ message: 'login success.', token });
    } catch (e) {
      return res.status(400).send({ message: 'Login Error.', error: e });
    }
  });

  router.delete('/logout', async (req, res) => {
    const token = req.get('token') || req.headers['token'];
    let user;

    if (!token) return res.send({ message: 'logout success.' });

    try {
      user = await User.findOne({ token });
      if (!user) return res.send({ message: 'logout success.' });
    } catch (e) {
      return res.status(400).send({ message: 'Error.', error: e });
    }

    user.token = null;

    try {
      await user.save();
      return res.send({ message: 'logout success.' })
    } catch (e) {
      return res.status(400).send({ message: 'Error.', error: e });
    }
  });

  return router;
};
