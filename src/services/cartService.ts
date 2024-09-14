import { cartModel } from "../models/cartModel";
import productModel from "../models/productModel";

interface CreateCartForUser {
  userId: string;
}

const createCartForUser = async ({ userId }: CreateCartForUser) => {
  const cart = await cartModel.create({ userId, totalAmount: 0, items: [] });
  cart.save();
  return cart;
};
interface GetActiveCartForUser {
  userId: string;
}
export const getActiveCartForUser = async ({
  userId,
}: GetActiveCartForUser) => {
  let cart = await cartModel.findOne({ userId, status: "active" });
  if (!cart) {
    cart = await createCartForUser({ userId });
  }
  return cart;
};
interface AddItemToCart {
  productId: any;
  quantity: number;
  userId: string;
}
export const addItemCart = async ({
  productId,
  quantity,
  userId,
}: AddItemToCart) => {
  const cart = await getActiveCartForUser({ userId });
  //Does the item exsit in the cart ?
  const existInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );
  if (existInCart) {
    return { data: "Item already exist in cart!", statusCode: 400 };
  }
  //Fetch the product
  const product = await productModel.findById(productId);
  if (!product) {
    return { data: "Product not found!", statusCode: 400 };
  }
  if (product.stock < quantity) {
    return { data: "Low stock for item", statusCode: 400 };
  }
  cart.items.push({
    product: productId,
    unitPrice: product.price,
    quantity: quantity,
  });
  product.stock -= quantity;
  const updatedproduct = await product.save();
  //Update the totalAmount fror the cart
  cart.totalAmount += product.price * quantity;
  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
};
