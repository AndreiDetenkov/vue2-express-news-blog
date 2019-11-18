const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 8000;

app.get('/', function (req, res) {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log('test app listening on port 8000!');
});
