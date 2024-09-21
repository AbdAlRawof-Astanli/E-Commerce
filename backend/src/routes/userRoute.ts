import { Router } from "express";
import { register, login, getMyOrders } from "../services/userService";
import vaildateJWT from "../middlewares/vaildateJWT";
import { ExtendRequest } from "../types/extendedRequest";
const router = Router();
//register route
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const { data, statusCode } = await register({
      firstName,
      lastName,
      email,
      password,
    });
    res.status(statusCode).json(data);
  } catch (error: any) {
    res.status(500).send("Something went wrong!");
  }
});
//Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { statusCode, data } = await login({ email, password });
    res.status(statusCode).json(data);
  } catch (error: any) {
    res.status(500).send("Something went wrong!");
  }
});

router.get("/my-orders", vaildateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const { statusCode, data } = await getMyOrders({ userId });
    res.status(statusCode).send(data);
  } catch (error) {
    res.status(500).send("Something went wrong!");
  }
});
export default router;
