import { createContext, useContext } from "react";
import { CartItem } from "../../types/CartItem";

interface CartContextType {
  cartItems: CartItem[];
  totalAmount: number;
  addItemToCart: (productId: string) => void;
  removeItemInCart: (productId: string) => void;
  updateItemInCart: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  totalAmount: 0,
  addItemToCart: () => {},
  updateItemInCart: () => {},
  removeItemInCart: () => {},
  clearCart: () => {},
});
export const useCart = () => useContext(CartContext);
