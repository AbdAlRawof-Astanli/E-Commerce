import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import userModel from "../models/userModel";

export interface ExtendRequest extends Request {
  user?: any;
}

const vaildateJWT = (req: ExtendRequest, res: Response, next: NextFunction) => {
  const authorizationHeader = req.get("authorization");
  if (!authorizationHeader) {
    res.status(403).send("Authorization header was not provided");
    return;
  }
  const token = authorizationHeader.split(" ")[1];
  if (!token) {
    res.status(403).send("Bearer token not found!");
    return;
  }
  //payload : is the data i assign them first time in jwt.sign
  jwt.verify(
    token,
    "58SwF4Jwqm1KPEx8FR8CKvxsqLavx6jY",
    async (err, payload) => {
      if (err) {
        res.status(403).send("Invaild Token");
        return;
      }
      // Fetch user from database on payload
      if (!payload) {
        res.status(403).send("Invaild Token");
        return;
      }
      const userPayload = payload as {
        email: string;
        firstName: string;
        lastName: string;
      };
      const user = await userModel.findOne({ email: userPayload.email });
      req.user = user;
      next();
    }
  );
};

export default vaildateJWT;
