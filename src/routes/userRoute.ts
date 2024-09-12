import { Router } from "express";
import { register, login } from "../services/userService";
const router = Router();
//register route
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const { data, statusCode } = await register({
    firstName,
    lastName,
    email,
    password,
  });
  res.status(statusCode).send(data);
});
//Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { statusCode, data } = await login({ email, password });
  res.status(statusCode).send(data);
});
export default router;
