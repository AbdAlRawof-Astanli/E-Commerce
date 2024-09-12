import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
const app = express();
const port = 5000;
//transform any json coming from requist and assign them to req.body
app.use(express.json());
mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log("Mongo Connected!"))
  .catch((err) => console.log("Faild to connect!", err));

app.use("/user", userRoute);

app.listen(port, () =>
  console.log("Server is running at " + `http://localhost:${port}`)
);
