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

interface UpdateItemToCart {
  productId: any;
  quantity: number;
  userId: string;
}

export const updateItemInCart = async ({
  productId,
  quantity,
  userId,
}: UpdateItemToCart) => {
  const cart = await getActiveCartForUser({ userId });
  const existInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );
  if (!existInCart) {
    return { data: "Item does not exist in cart", statusCode: 400 };
  }
  const product = await productModel.findById(productId);
  if (!product) {
    return { data: "Product not found!", statusCode: 400 };
  }

  if (product.stock + existInCart.quantity < quantity) {
    return { data: "Low stock for item", statusCode: 400 };
  }
  const otherCartItems = cart.items.filter(
    (p) => p.product.toString() !== productId
  );

  let total = otherCartItems.reduce((sum, product) => {
    sum += product.quantity * product.unitPrice;
    return sum;
  }, 0);
  product.stock += existInCart.quantity;
  let updatedCart = await cart.save();
  existInCart.quantity = quantity;
  product.stock -= existInCart.quantity;
  total += existInCart.quantity * existInCart.unitPrice;
  cart.totalAmount = total;
  updatedCart = await cart.save();
  const updatedStockProduct = await product.save();
  return { data: updatedCart, statusCode: 200 };
};
