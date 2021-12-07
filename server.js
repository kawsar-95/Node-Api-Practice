const express = require("express");
const app = express();

const userRouter = require("./routes/userRoutes.js")

app.use(express.json());

app.use('/api/users', userRouter)

app.listen(3000, () => {
  console.log('Server Running');
});
