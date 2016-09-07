const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const productsApi = require('./routes/products');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/products', productsApi);

app.listen(3000, () => {
  /* eslint no-console: "off" */
  console.log('Api started on port 3000');
});
