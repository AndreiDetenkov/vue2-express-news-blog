const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const categories = require('./app/categories');
const users = require('./app/users');
const news = require('./app/news');
const admin = require('./app/admin');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 8000;
const uri =
  'mongodb+srv://genius_spirit:KvRl9YNb0g53pfUl@cluster0-drwqg.mongodb.net/news?retryWrites=true&w=majority';
mongoose.connect(uri, {
  useNewUrlParser: true,
	useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
	autoReconnect: true,
  reconnectTries: 10,
  reconnectInterval: 500,
  poolSize: 10,
  bufferMaxEntries: 0,
  family: 4,
});

const db = mongoose.connection;
db.once('open', () => {
  console.log('Mongoose connected!');

  app.use('/categories', categories());
  app.use('/users', users());
  app.use('/news', news());
  app.use('/admin', admin());

  app.listen(port, error => {
    if (error) return console.log(`Server error: ${error}`);
    console.log('test app started on port 8000!');
  });
});
