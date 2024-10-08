import express from "express";
import {
  getActiveCartForUser,
  updateItemInCart,
  addItemCart,
  deleteItemInCart,
  clearCart,
  checkout,
} from "../services/cartService";
import vaildateJWT from "../middlewares/vaildateJWT";
import { ExtendRequest } from "../types/extendedRequest";

const router = express.Router();

router.get("/", vaildateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const cart = await getActiveCartForUser({
      userId: userId,
      populateProduct: true,
    });
    res.status(200).send(cart);
  } catch (error: any) {
    res.status(500).send("Something went wrong!");
  }
});

router.post("/items", vaildateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    const response = await addItemCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);
  } catch (error: any) {
    res.status(500).send("Something went wrong!");
  }
});

router.put("/items", vaildateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    const response = await updateItemInCart({
      userId,
      productId,
      quantity,
    });
    res.status(response.statusCode).send(response.data);
  } catch (error: any) {
    res.status(500).send("Something went wrong!");
  }
});
router.delete(
  "/items/:productId",
  vaildateJWT,
  async (req: ExtendRequest, res) => {
    try {
      const userId = req.user._id;
      const { productId } = req.params;
      const response = await deleteItemInCart({ userId, productId });
      res.status(response.statusCode).send(response.data);
    } catch (error: any) {
      res.status(500).send("Something went wrong!");
    }
  }
);
router.delete("/", vaildateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const response = await clearCart({ userId });
    res.status(response.statusCode).send(response.data);
  } catch (error: any) {
    res.status(500).send("Something went wrong!");
  }
});
router.post("/checkout", vaildateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const { address } = req.body;
    const response = await checkout({ userId, address });
    res.status(response.statusCode).send(response.data);
  } catch (error: any) {
    res.status(500).send("Something went wrong!");
  }
});
export default router;
