const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const NewsSchema = new Schema({
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  imageName: {
    type: String,
    required: true
  },
  imagePath: {
    type: String,
    required: true
  }
});

const News = mongoose.model('News', NewsSchema);
module.exports = News;
