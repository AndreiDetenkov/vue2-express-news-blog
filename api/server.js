const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const categories = require('./app/categories');

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8000;
const uri =
  'mongodb+srv://genius_spirit:KvRl9YNb0g53pfUl@cluster0-drwqg.mongodb.net/news?retryWrites=true&w=majority';
mongoose.connect(uri, {
  useNewUrlParser: true,
	useUnifiedTopology: true,
	autoReconnect: true,
  reconnectTries: 5,
  reconnectInterval: 500,
  family: 4,
});

const db = mongoose.connection;
db.once('open', () => {
  console.log('Mongoose connected!');

  app.use('/categories', categories());

  app.listen(port, error => {
    if (error) return console.log(`Server error ${error}`);
    console.log('test app started on port 8000!');
  });
});
