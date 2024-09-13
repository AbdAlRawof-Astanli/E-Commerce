import express from "express";
import { getActiveCartForUser } from "../services/cartService";
import vaildateJWT from "../middlewares/vaildateJWT";
import { ExtendRequest } from "../middlewares/vaildateJWT";
const router = express.Router();

router.get("/", vaildateJWT, async (req: ExtendRequest, res) => {
  const userId = req.user._id;
  const cart = await getActiveCartForUser({ userId: userId });
  res.status(200).send(cart);
});

export default router;
