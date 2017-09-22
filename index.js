//Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./routes/router');
const mongoose = require('mongoose');

//DB setup
mongoose.connect('mongodb://localhost/auth', { useMongoClient: true });

// App setup
app.use(morgan('combined'));
app.use(bodyParser.json());
router(app);

// Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port, () => {
    console.log('Server listening on:', port);
});

module.exports = app; // for testing