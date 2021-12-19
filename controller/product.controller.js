const { Product } = require("../models/dbmodel");
const { validateProductUpload, validateProductUpdate } = require("../validations/product.validate");

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();

    res.status(200).send(products);
  }
  catch (err) {
    console.error(err);
    res.status(500).send('Internal server error!');
  }
}

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({
      where: {
        id
      }
    })
    if (!product) return res.status(404).send('Product not found!');

    res.status(200).send(product);
  }
  catch (err) {
    console.log(err);
    res.status(500).send('Internal server error!');
  }
}

const postProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    const err = await validateProductUpload({ name, price, description, category });

    if (err) return res.status(400).send(err);

    const product = await Product.create({
      name,
      price,
      description,
      category
    });

    res.status(201).send(product);

  }
  catch (err) {
    console.log(err);
    res.status(500).send('Internal server error!')
  }
}

const putProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, category } = req.body;

    const err = await validateProductUpdate({ name, price, description, category });

    if (err) return res.status(400).send(err);

    const product = await Product.update({
      name,
      price,
      description,
      category
    }, {
      where: {
        id
      }
    });

    if (!product) return res.status(404).send('Product not found!');

    res.status(201).send(product);
  }
  catch (err) {
    console.log(err);
    res.status(500).send('Internal server error!');
  }
}

const patchProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, category } = req.body;

    const err = await validateProductUpdate({ name, price, description, category });

    if (err) return res.status(400).send(err);

    const product = await Product.update({
      where: {
        id
      }
    });

    if (!product) return res.status(404).send('Product not found!');

    if (name) product.update({ name })
    if (price) product.update({ price })
    if (description) product.update({ description })
    if (category) product.update({ category })

    res.status(201).send(product);
  }
  catch (err) {
    console.log(err);
    res.status(500).send('Internal server error!')
  }
}

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findOne({
    where: {
      id
    }
  });

  if (!product) return res.status(404).send('Product not found!');

  await product.destroy();

  res.sendStatus(201).send(product);
}
module.exports = {
  getProduct,
  getProducts,
  postProduct,
  putProduct,
  patchProduct,
  deleteProduct
}