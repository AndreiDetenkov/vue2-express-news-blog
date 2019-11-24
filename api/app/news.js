const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const path = require('path');
const fs = require('fs');
const News = require('../models/news');

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

  router.get('/list', async (req, res) => {
    try {
      const news = await News.find()
        .populate({ path: 'categoryId', select: 'title' })
        .populate({ path: 'userId', select: 'username' });
      if (news) return res.send(news);
    } catch (error) {
      return res.status(404).send({ message: 'There are not any news.', error });
    }
  });

  router.post('/add', upload.single('image'), async (req, res) => {
    const removeImage = path => {
      fs.unlink(path, err => {
        if (err) console.error(err);
      });
    };

    for (let el in req.body) {
      if (!req.body[el]) {
        removeImage(req.file.path);
        return res.status(400).send({ message: `${el} is required` });
      }
    }

    const data = req.body;
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
      return res.status(400).send({ message: 'Error. Unable to add new news.' });
    }
  });

  return router;
};

module.exports = createRouter;
