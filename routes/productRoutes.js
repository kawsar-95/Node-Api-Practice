const express = require('express');
const productSchema = require('../model/productSchema');
const router = express.Router()

const products = [
  {
    id: 1,
    title: 'Adidas',
    price: 10,
    category: 'Shoe',
  },
  {
    id: 2,
    title: 'Nike',
    price: 10,
    category: 'Shoe',
  },
  {
    id: 3,
    title: 'Puma',
    price: 10,
    category: 'Shoe',
  },
  {
    id: 4,
    title: 'Reebok',
    price: 10,
    category: 'Shoe',
  },
];

const productValidation = async product => {
  try {
    await productSchema.validate(product);
    return null;
  } catch (error) {
    return error.errors[0];
  }
};

router.get("/", function (req, res) {
  res.send(products);
});

router.get("/:id", function (req, res) {
  const id = req.params.id;

  const product = products.find(product => product.id === parseInt(id));
  if (!product) return res.status(404).send("product not found");

  res.send(product);
});

router.post("/", async function (req, res) {
  const { title, price, category } = req.body;
  try {
    const error = await productValidation({ title, price, category });
    if (error) return res.status(400).send(error.message);
    const product = {
      id: products.length + 1,
      title,
      price,
      category
    };
    products.push(product);
    res.send(product);
  }
  catch (err) {
    // return res.status(404).send(err.errors[0]);
    console.log(err)
  }
});

router.put('/:id', async function (req, res) {
  const id = req.params.id;
  const { title, price, category } = req.body;
  const product = products.find(product => product.id === parseInt(id));
  if (!product) return res.status(404).send("product not found");
  try {
    const error = await productValidation({ title, price, category });
    if (error) return res.status(400).send(error.message);
    product.title = title;
    product.price = price;
    product.category = category;
    res.send(product);
  }
  catch (err) {

    console.log(err)
  }
});

router.patch('/:id', async function (req, res) {

})

module.exports = router;