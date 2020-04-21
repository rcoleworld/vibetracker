const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

const app = express();

const loginRouter = require('./api/routes/login')

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use('/users', loginRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
  });
}

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
