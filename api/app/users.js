const express = require('express');
const User = require('../models/user');
const isAuthorized = require('../middlewares/authentication');


const createRouter = () => {
  const router = express.Router();

  let validateCredentials = (res, username, password, password2) => {
    if (!username || !password || !password2)
      return res.status(400).send({ message: 'Username and Password are required' });
    if (username && username.length < 4)
      return res.status(400).send({ message: 'Username must be more than 4 characters.' });
    if (password.length < 6 || password2.length < 6)
      return res.status(400).send({ message: 'Password must be more than 6 characters.' });
  };

  router.post('/create', isAuthorized, async (req, res) => {
    const { username, password, password2, role } = req.body;

    await validateCredentials(res, username, password, password2);

    const user = await User.findOne({ username });
    if (user)
      return res.status(400).send({ message: `The user "${username}" - has already existed.` });
    else {
      if (password === password2) {
        try {
          const user = await new User({ username, password, role });
          const result = await user.save();
          if (result) return res.send({ message: `"${result.username}" - created successfully.` });
        } catch (e) {
          return res.status(400).send({ message: 'Error. Unable to create new user.', error: e });
        }
      } else {
        return res.status(400).send({ message: 'The entered passwords do not match' });
      }
    }
  });

  router.get('/list', isAuthorized, async (req, res) => {
    try {
      const users = await User.find();
      if (users) return res.send(users);
    } catch (error) {
      return res.status(404).send({ message: 'There are not any users.' });
    }
  });

  router.delete('/remove/:id', isAuthorized, async (req, res) => {
    const id = req.params.id;
    // TODO: add validation - do not remove user if the user uses in article
    try {
      const result = await User.findByIdAndRemove(id);
      if (result) res.status(200).send({ message: 'The User removed successfully.' });
      else return res.status(404).send({ message: `The User not found.` });
    } catch (e) {
      return res.status(400).send({ message: 'Error. Unable to removed the user.' });
    }
  });

  router.put('/update-username/:id', isAuthorized, async (req, res) => {
    const id = req.params.id;
    if (!req.body.username) return res.status(400).send({ message: 'Username is required' });

    try {
      const query = await User.findByIdAndUpdate(id, { username: req.body.username });
      if (query) return res.send({ message: `Username updated successfully.` });
    } catch (e) {
      return res.status(400).send({ message: 'Error. Unable to update the username.' });
    }
  });

  router.put('/update-pass/:id', isAuthorized, async (req, res) => {
    const id = req.params.id;
    if (!req.body.password) return res.status(400).send({ message: 'Password is required' });

    try {
      const user = await User.findOne({ _id: id });
      const newPass = await user.cryptPass(req.body.password);
      const query = await User.findByIdAndUpdate(id, { password: newPass });
      if (query) return res.send({ message: `Password updated successfully.` });
    } catch (e) {
      return res.status(400).send({ message: 'Error. Unable to update the username.' });
    }
  });

  return router;
};
module.exports = createRouter;
