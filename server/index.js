'use strict';

const express = require('express');
const path = require('path');

const app = express();
const root = path.join(__dirname, '../app');
const port = 1337;

app.use(express.static(root));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: root });
});

app.get('/color-schemes/:scheme', (req, res) => {
  res.sendFile(`color-schemes/${req.params.scheme}.json`, { root: root });
});

app.get('/lists/:list', (req, res) => {
  res.sendFile(`lists/${req.params.list}.json`, { root: root });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
