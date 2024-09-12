import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import { seedInitialProducts } from "./services/productService";
const app = express();
const port = 5000;
//transform any json coming from requist and assign them to req.body
app.use(express.json());
mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log("Mongo Connected!"))
  .catch((err) => console.log("Faild to connect!", err));
//seed the products to the database
seedInitialProducts();

app.use("/user", userRoute);
app.use("/product", productRoute);
app.listen(port, () =>
  console.log("Server is running at " + `http://localhost:${port}`)
);
