import { Box, Container, TextField, Typography } from "@mui/material";
import { useCart } from "../context/Cart/CartContext";
import Button from "@mui/material/Button";
import { useRef } from "react";
const CheckoutPage = () => {
  const { cartItems, totalAmount } = useCart();

  const addressRef = useRef<HTMLInputElement>(null);

  const renderCartItem = () => {
    return (
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        sx={{
          border: 1,
          borderColor: "#f2f2f2",
          padding: 1,
          borderRadius: 5,
        }}
      >
        {cartItems.map((item) => {
          {
            return (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexDirection="row"
                width="100%"
              >
                <Box
                  display="flex"
                  gap={1}
                  alignItems="center"
                  flexDirection="row"
                  width="100%"
                >
                  <img src={item.image} alt="" width={100} />
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                    width="100%"
                  >
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography>
                      {item.quantity} x {item.unitPrice} $
                    </Typography>
                  </Box>
                </Box>
              </Box>
            );
          }
        })}
        <Box>
          <Typography sx={{ textAlign: "right" }} variant="body2">
            Total Amount : {totalAmount.toFixed(2)} $
          </Typography>
        </Box>
      </Box>
    );
  };
  return (
    <Container
      fixed={true}
      sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}
    >
      <Box display="flex" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h5">Checkout</Typography>
      </Box>
      <TextField
        inputRef={addressRef}
        label="Delivery Address"
        name="address"
        fullWidth
      ></TextField>
      {renderCartItem()}
      <Button variant="contained" fullWidth>
        Pay Now
      </Button>
    </Container>
  );
};
export default CheckoutPage;
