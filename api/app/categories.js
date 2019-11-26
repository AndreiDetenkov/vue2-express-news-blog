const express = require('express');
const Category = require('../models/category');
const isAuthorized = require('../middlewares/authentication');

const createRouter = () => {
  const router = express.Router();

  router.get('/list', async (req, res) => {
    try {
      const categories = await Category.find().populate({ path: 'parentId', select: 'title' });
      // const categories = await Category.find();
      if (categories) return res.send(categories);
    } catch (e) {
      return res.status(404).send({ message: 'There are not any categories.', error: e });
    }
  });

  router.get('/parent/list', async (req, res) => {
    try {
      const categories = await Category.find({ parentId: null });
      if (categories) return res.send(categories);
    } catch (e) {
      return res.status(404).send({ message: 'There are not any parent categories.', error: e });
    }
  });

  router.post('/add', isAuthorized, async (req, res) => {
    const { title, parentId } = req.body;

    if (!title) return res.status(400).send({ message: 'Please fill the gap - title.' });

    const isCategoryExist = await Category.findOne({ title });
    if (isCategoryExist)
      return res.status(400).send({ message: 'This category has already existed.' });
    else {
      try {
        const category = new Category({ title, parentId });
        const newCategory = await category.save();
        if (newCategory) return res.send({ message: 'The Category added successfully.' });
      } catch (e) {
        return res.status(400).send({ message: 'Error. Unable to add new category.', error: e });
      }
    }
  });

  router.put('/update/:id', isAuthorized, async (req, res) => {
    const id = req.params.id;
    const { title, parentId } = req.body;

    try {
      const result = await Category.findByIdAndUpdate(id, { title, parentId });
      if (result) return res.status(200).send({ message: `The category updated successfully.` });
      else return res.status(404).send({ message: `The category not found.` });
    } catch (e) {
      return res.status(400).send({ message: 'Error. Unable to update the category.', error: e });
    }
  });

  router.delete('/remove/:id', isAuthorized, async (req, res) => {
    const id = req.params.id;
    // TODO: add validation - do not remove category if the category uses in article
    try {
      const result = await Category.findByIdAndRemove(id);
      if (result) return res.status(200).send({ message: `The category removed successfully.` });
      else return res.status(404).send({ message: `The category not found.` });
    } catch (e) {
      return res.status(400).send({ message: 'Error. Unable to removed the category.', error: e });
    }
  });

  return router;
};

module.exports = createRouter;
