const express = require('express');
const Category = require('../models/category');

const createRouter = () => {
  const router = express.Router();

  router.get('/list', async (req, res) => {
    try {
      // const categories = await Category.find().populate({ path: 'parentId', select: 'title' });
      const categories = await Category.find();
      if (categories) res.send(categories);
    } catch (error) {
      return res.status(404).send({ message: 'There are not any categories.' });
    }
  });

  router.get('/parent/list', async (req, res) => {
    try {
      const categories = await Category.find({ parentId: null });
      if (categories) res.send(categories);
    } catch (error) {
      return res.status(404).send({ message: 'There are not any parent categories.' });
    }
  });

  router.post('/add', async (req, res) => {
    const request = req.body;

    if (!request.title) {
      return res.status(400).send({ message: 'Please fill the gap - title.' });
    }

    const isCategoryExist = await Category.findOne({ title: request.title });
    if (isCategoryExist) {
      res.status(400).send({ message: 'This category has already existed.' });
    } else {
      try {
        const category = new Category(request);
        const newCategory = await category.save();
        if (newCategory) res.send({ message: 'The Category added successfully.' });
      } catch (e) {
        return res.status(400).send({ message: 'Error. Unable to add new category.' });
      }
    }
  });

  router.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    const { title, parentId } = req.body;

    try {
      await Category.findByIdAndUpdate(id, { title, parentId });
      res.status(200).send({message: `The category "${title}" - updated successfully.`})
    } catch (e) {
      return res.status(400).send({ message: 'Error. Unable to update the category.' });
    }
  });

  return router;
};

module.exports = createRouter;
