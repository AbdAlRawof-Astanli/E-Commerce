import { cartModel, ICart, ICartItem } from "../models/cartModel";
import { IOrderItem, orderModel } from "../models/orderModel";
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
  populateProduct?: boolean;
}
export const getActiveCartForUser = async ({
  userId,
  populateProduct,
}: GetActiveCartForUser) => {
  let cart;
  if (populateProduct) {
    cart = await cartModel
      .findOne({ userId, status: "active" })
      .populate("items.product");
  } else {
    cart = await cartModel.findOne({ userId, status: "active" });
  }
  if (!cart) {
    cart = await createCartForUser({ userId });
  }
  return cart;
};

interface ClearCart {
  userId: string;
}
export const clearCart = async ({ userId }: ClearCart) => {
  const cart = await getActiveCartForUser({ userId });
  cart.items = [];
  cart.totalAmount = 0;
  await cart.save();
  return {
    data: await getActiveCartForUser({ userId, populateProduct: true }),
    statusCode: 200,
  };
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
  //Update the totalAmount fror the cart
  cart.totalAmount += product.price * quantity;
  await cart.save();
  return {
    data: await getActiveCartForUser({ userId, populateProduct: true }),
    statusCode: 200,
  };
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

  if (product.stock < quantity) {
    return { data: "Low stock for item", statusCode: 400 };
  }
  const otherCartItems = cart.items.filter(
    (p) => p.product.toString() !== productId
  );
  let total = calculateCartTotalItems({ cartItems: otherCartItems });

  existInCart.quantity = quantity;
  total += existInCart.quantity * existInCart.unitPrice;
  cart.totalAmount = total;
  await cart.save();
  return {
    data: await getActiveCartForUser({ userId, populateProduct: true }),
    statusCode: 200,
  };
};

interface DeleteItemInCart {
  productId: any;
  userId: string;
}
export const deleteItemInCart = async ({
  userId,
  productId,
}: DeleteItemInCart) => {
  const cart = await getActiveCartForUser({ userId });

  const existInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );

  if (!existInCart) {
    return { data: "Item does not exist in cart", statusCode: 400 };
  }
  const otherCartItems = cart.items.filter(
    (p) => p.product.toString() !== productId
  );
  const total = calculateCartTotalItems({ cartItems: otherCartItems });
  cart.totalAmount = total;
  cart.items = otherCartItems;
  await cart.save();
  return {
    data: await getActiveCartForUser({ userId, populateProduct: true }),
    statusCode: 200,
  };
};

const calculateCartTotalItems = ({ cartItems }: { cartItems: ICartItem[] }) => {
  const total = cartItems.reduce((sum, product) => {
    sum += product.quantity * product.unitPrice;
    return sum;
  }, 0);
  return total;
};

interface Checkout {
  userId: string;
  address: string;
}
export const checkout = async ({ userId, address }: Checkout) => {
  if (!address) {
    return { data: "Please add the address", statusCode: 400 };
  }
  const cart = await getActiveCartForUser({ userId });
  const orderItems: IOrderItem[] = [];
  // loop car itemand create orderItems
  for (const item of cart.items) {
    const product = await productModel.findById(item.product);
    if (!product) {
      return { data: "Product not found", statusCode: 400 };
    }
    const orderItem: IOrderItem = {
      productTitle: product.title,
      productImage: product.image,
      quantity: item.quantity,
      productPrice: item.unitPrice,
    };
    orderItems.push(orderItem);
  }
  const order = await orderModel.create({
    orderItems: orderItems,
    userId,
    total: cart.totalAmount,
    address,
  });
  await order.save();
  //update the cart status
  cart.status = "completed";
  await cart.save();
  return { data: order, statusCode: 200 };
};
