const Joi = require('joi');
const Guid = require('guid');
const router = require('express').Router;

const productsApi = router();

// Create some initial products
const inMemoryProducts = new Array(5).fill(undefined).reduce((memo, value, index) => {
  const products = memo;
  const id = Guid.raw();

  products[id] = {
    id,
    name: `Product Item ${index}`,
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore, culpa.',
    price: 99,
  };

  return products;
}, {});

// Get all products
productsApi.get('/', (req, res) => {
  res.status(200); // 200 OK
  res.json({ data: Object.keys(inMemoryProducts).map((key) => inMemoryProducts[key]) });
});

// Create products
productsApi.post('/', (req, res) => {
  const validationSchema = {
    name: Joi.string().min(3).max(32).required(),
    description: Joi.string().allow('').max(128),
    price: Joi.number().integer().positive().required(),
  };

  const data = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  };

  Joi.validate(data, validationSchema, { abortEarly: false }, (err, validatedData) => {
    if (err !== null) {
      res.status(400); // 400 Bad request
      res.json({
        errors: err.details.map((info) => ({
          title: info.message,
          status: 400,
        })),
      });
      return;
    }

    const newProduct = Object.assign({
      id: Guid.raw(),
    }, validatedData);

    inMemoryProducts[newProduct.id] = newProduct;

    res.status(201); // 201 Created
    res.json({
      data: newProduct,
    });
  });
});

// Update product
productsApi.put('/:productId', (req, res) => {
  const validationSchema = {
    id: Joi.string().guid().required(),
    name: Joi.string().min(3).max(32).required(),
    description: Joi.string().allow('').max(128),
    price: Joi.number().integer().positive().required(),
  };

  const data = {
    id: req.params.productId,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  };

  Joi.validate(data, validationSchema, { abortEarly: false }, (err, validatedData) => {
    if (err !== null) {
      res.status(400); // 400 Bad request
      res.json({
        errors: err.details.map((info) => ({
          title: info.message,
          status: 400,
        })),
      });
      return;
    }

    if (!inMemoryProducts[validatedData.id]) {
      res.status(404); // 404 Not found;
      res.json({
        errors: [{
          error: 'Product not found',
          status: 404,
        }],
      });
      return;
    }

    inMemoryProducts[validatedData.id] = validatedData;

    res.status(201); // 201 Created
    res.json({ data: validatedData });
  });
});

// Delete product
productsApi.delete('/:productId', (req, res) => {
  const productId = req.params.productId;

  if (!inMemoryProducts[productId]) {
    res.status(404); // 404 Not found;
    res.json({
      errors: [{
        error: 'Product not found',
        status: 404,
      }],
    });
    return;
  }

  delete inMemoryProducts[productId];

  res.status(204); // 204 No Content
  res.send();
});

module.exports = productsApi;
