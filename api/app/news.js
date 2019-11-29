const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const path = require('path');
const fs = require('fs');
const News = require('../models/news');
const isAuthorized = require('../middlewares/authentication');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function(req, file, cb) {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

const createRouter = () => {
  const router = express.Router();

  const removeImage = path => {
    fs.unlink(path, err => {
      if (err) console.error(err);
    });
  };

  router.get('/list', async (req, res) => {
    try {
      const news = await News.find()
        .populate({ path: 'categoryId', select: 'title' })
        .populate({ path: 'userId', select: 'username' });
      if (news) return res.send(news);
    } catch (e) {
      return res.status(404).send({ message: 'There are not any news.', error: e });
    }
  });

  router.post('/add', [isAuthorized, upload.single('image')], async (req, res) => {

    for (let el in req.body) {
      if (!req.body[el]) {
        removeImage(req.file.path);
        return res.status(400).send({ message: `${el} is required` });
      }
    }

    const data = req.body;
    data.userId = req.user._id

    if (!req.file) return res.status(400).send({ message: `Image is required` });
    else {
      data.imagePath = req.file.path;
      data.imageName = req.file.filename;
    }

    try {
      const news = new News(data);
      const result = await news.save();
      if (result) return res.send({ message: 'The news added successfully.' });
    } catch (e) {
      return res.status(400).send({ message: 'Error. Unable to add new news.', error: e });
    }
  });

  router.delete('/remove/:id', isAuthorized, async (req, res) => {
    const id = req.params.id;
    try {
      const result = await News.findByIdAndRemove(id);
      if (result) {
        removeImage(result.imagePath);
        return res.status(200).send({ message: `The news removed successfully.` });
      }
      else return res.status(404).send({ message: `The news not found.` });
    } catch (e) {
      return res.status(400).send({ message: 'Error. Unable to removed the news.', error: e });
    }
  });

  router.put('/update/:id', isAuthorized, upload.single('image'), async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    for (let el in data) {
      if (!data[el]) {
        return res.status(400).send({ message: `${el} is required` });
      }
    }

    if (req.file) {
      data.imagePath = req.file.path;
      data.imageName = req.file.filename;
      try {
        const result = await News.findOne({ _id: id });
        removeImage(result.imagePath);
      } catch (e) {
        return res.status(400).send({ message: 'Error. Unable to removed old image.', error: e });
      }
    }

    try {
      const result = await News.findByIdAndUpdate(id, data);
      if (result) return res.status(200).send({ message: `The news updated successfully.` });
      else return res.status(404).send({ message: `The news not found.` });
    } catch (e) {
      return res.status(400).send({ message: 'Error. Unable to update the news.', error: e });
    }
  });

  return router;
};

module.exports = createRouter;
