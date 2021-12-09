const express = require("express");
const app = express();

const userRouter = require("./routes/userRoutes.js");
const productRouter = require("./routes/productRoutes.js");

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

app.listen(8000, () => {
  console.log('Server Running on port 8000');
});
