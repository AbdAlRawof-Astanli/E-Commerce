import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { orderModel } from "../models/orderModel";
//contain all the functionality of user
interface RegisterParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export const register = async ({
  firstName,
  lastName,
  email,
  password,
}: RegisterParams) => {
  //Search if the User already do registration
  //findOne Function Take the parameter to filter the search
  const findUser = await userModel.findOne({ email: email });
  if (findUser) {
    return {
      data: "User Already exist!",
      statusCode: 400,
    };
  }
  //encryption incoming password with 10 salt round
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new userModel({
    email,
    password: hashedPassword,
    firstName,
    lastName,
  });
  await newUser.save();
  return {
    data: generateJWT({ firstName, lastName, email, password }),
    statusCode: 201,
  };
};

//Handle Login
interface LoginParams {
  email: string;
  password: string;
}
export const login = async ({ email, password }: LoginParams) => {
  const findUser = await userModel.findOne({ email: email });
  if (!findUser) {
    return { data: "Incorrect email or password", statusCode: 400 };
  }

  const passwordMatch = await bcrypt.compare(password, findUser.password);
  if (passwordMatch) {
    return {
      data: generateJWT({
        firstName: findUser.firstName,
        lastName: findUser.lastName,
        email,
      }),
      statusCode: 200,
    };
  }
  return { data: "Incorrect email or password", statusCode: 400 };
};

interface getMyOrdersParams {
  userId: string;
}

export const getMyOrders = async ({ userId }: getMyOrdersParams) => {
  try {
    return { data: await orderModel.find({ userId }), statusCode: 200 };
  } catch (error) {
    return { data: "Something Went Wront", statusCode: 404 };
  }
};

const generateJWT = (data: Object) => {
  return jwt.sign(data, process.env.JWT_SECRECT || "");
};
