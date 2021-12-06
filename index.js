
/* PONDIT CLASS NO 15
REST API WITH HTTP METHOD CLASS PRACTICE
*/
const express = require('express');

const app = express();

app.use(express.json());

const products = [
  {
    id: 1,
    name: 'Addidas',
  },
  {
    id: 2,
    name: 'Nike',
  },
  {
    id: 3,
    name: 'Puma',
  },
  {
    id: 4,
    name: 'Reebok',
  },

]

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/users', function (req, res) {
  res.send(['habib', 'mohamed', 'ahmed']);
});

app.get('/api/products', function (req, res) {
  res.send(products);
});

app.get('/api/products/:id', function (req, res) {
  const id = (req.params.id);
  console.log(id)
  res.send(`product with id ${id} updated`);
})

app.post('/api/products', function (req, res) {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name
  }
  products.push(newProduct)

  res.send(newProduct)
})



app.put('/api/products/:id', function (req, res) {
  const id = (req.params.id);

  const product = products.find(product => product.id == id);

  if (!product) return res.status(404).send('product not found');
  product.name = req.body.name;

  res.send(products);
});

app.delete('/api/products/:id', function (req, res) {
  const id = (req.params.id);
  const product = products.find(product => product.id == id);

  if (!product) return res.status(404).send('product not found');

  const index = products.indexOf(product);
  products.splice(index, 1);
  res.send('product removed');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});