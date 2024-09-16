import { getAllProducts } from "./../services/productService";
import { Router } from "express";

const router = Router();
router.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).send(products);
  } catch (error: any) {
    res.status(500).send("Something went wrong!");
  }
});

export default router;
