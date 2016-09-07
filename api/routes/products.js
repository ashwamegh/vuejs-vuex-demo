const router = require('express').Router;

const productsApi = router();

// Create some initial products
const inMemoryProducts = new Array(5).fill(undefined).reduce((memo, value, index) => {
  const products = memo;

  products[index] = {
    id: index,
    name: `Product Item ${index}`,
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore, culpa.',
    price: 99,
  };

  return products;
}, {});

let idCounter = Object.keys(inMemoryProducts).length;

// Get all products
productsApi.get('/', (req, res) => {
  res.status(200); // 200 OK
  res.json(Object.keys(inMemoryProducts).map((key) => inMemoryProducts[key]));
});

// Create products
productsApi.post('/', (req, res) => {
  // TODO: validation...

  const newProduct = {
    id: idCounter,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  };

  inMemoryProducts[idCounter] = newProduct;

  ++idCounter;

  res.status(201); // 201 Created
  res.json(newProduct);
});

// Update product
productsApi.put('/:productId', (req, res) => {
  const productId = req.params.productId;

  if (!inMemoryProducts[productId]) {
    res.status(404); // 404 Not found;
    res.json({
      error: 'Product not found',
      status: 404,
    });
  }

  inMemoryProducts[productId] = {
    id: productId,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  };

  res.status(201); // 201 Created
  res.json(inMemoryProducts[productId]);
});

// Delete product
productsApi.delete('/:productId', (req, res) => {
  const productId = req.params.productId;

  delete inMemoryProducts[productId];

  res.status(204); // 204 No Content
  res.send();
});

module.exports = productsApi;
