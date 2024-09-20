import { Box, Container, Typography } from "@mui/material";
// import { useEffect, useState } from "react";
// import { BASE_URL } from "../constants/baseUrl";
// import { useAuth } from "../context/Auth/AuthContext";
import { useCart } from "../context/Cart/CartContext";

const CartPage = () => {
  // const { token } = useAuth();
  // const { cartItems, totalAmount } = useCart();
  const { cartItems } = useCart();
  // const [error, setError] = useState("");

  
  // console.log(cart);

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h5">My Cart</Typography>
      {cartItems.map((item) => {
        {
          return <Box>{item.title}</Box>;
        }
      })}
    </Container>
  );
};
export default CartPage;
