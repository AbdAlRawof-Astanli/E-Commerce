import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import cartRoute from "./routes/cartRoute";
import { seedInitialProducts } from "./services/productService";
import cors from "cors";
dotenv.config();
const app = express();
const port = 3000;
//transform any json coming from requist and assign them to req.body
app.use(express.json());
app.use(cors());
//connect to Database
mongoose
  .connect(process.env.DATABASE_URL || "")
  .then(() => console.log("Mongo Connected!"))
  .catch((err) => console.log("Faild to connect!", err));
//seed the products to the database
seedInitialProducts();
//Routes
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);

app.listen(port, () =>
  console.log("Server is running at " + `http://localhost:${port}`)
);
