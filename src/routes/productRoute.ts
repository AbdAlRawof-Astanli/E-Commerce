import { getAllProducts } from "./../services/productService";
import { Router } from "express";

const router = Router();
router.get("/", async (req, res) => {
  const products = await getAllProducts();
  res.status(200).send(products);
});

export default router;
