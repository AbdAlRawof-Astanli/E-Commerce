import { Router } from "express";
import { register, login } from "../services/userService";
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
export default router;
