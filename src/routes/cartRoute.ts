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
  const userId = req.user._id;
  const cart = await getActiveCartForUser({ userId: userId });
  res.status(200).send(cart);
});

router.post("/items", vaildateJWT, async (req: ExtendRequest, res) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;
  const response = await addItemCart({ userId, productId, quantity });
  res.status(response.statusCode).send(response.data);
});

router.put("/items", vaildateJWT, async (req: ExtendRequest, res) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;
  const response = await updateItemInCart({
    userId,
    productId,
    quantity,
  });
  res.status(response.statusCode).send(response.data);
});
router.delete(
  "/items/:productId",
  vaildateJWT,
  async (req: ExtendRequest, res) => {
    const userId = req.user._id;
    const { productId } = req.params;
    const response = await deleteItemInCart({ userId, productId });
    res.status(response.statusCode).send(response.data);
  }
);
router.delete("/", vaildateJWT, async (req: ExtendRequest, res) => {
  const userId = req.user._id;
  const response = await clearCart({ userId });
  res.status(response.statusCode).send(response.data);
});
router.post("/checkout", vaildateJWT, async (req: ExtendRequest, res) => {
  const userId = req.user._id;
  const { address } = req.body;
  const response = await checkout({ userId, address });
  res.status(response.statusCode).send(response.data);
});
export default router;
