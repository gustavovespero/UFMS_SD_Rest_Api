const express = require('express');
const routes = require('./routes');

require('./index.js');

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3000);