const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require ('path');
const port = 3000;
const route = require('./src/routes/router');

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static('src/public'));
app.use(express.urlencoded({ extended: true }));
app.use('/', route);

app.listen(port, () => console.log('App running'));

module.exports = app;