import { Box, Container, Typography } from "@mui/material";
import { useCart } from "../context/Cart/CartContext";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const {
    cartItems,
    totalAmount,
    updateItemInCart,
    removeItemInCart,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const handleQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      return;
    }
    updateItemInCart(productId, quantity);
  };

  const handleRemoveItem = async (productId: string) => {
    removeItemInCart(productId);
  };
  const handleCheckout = () => {
    navigate("/checkout");
  };

  const renderCartItem = () => {
    return (
      <Box display="flex" flexDirection="column" gap={4}>
        {cartItems.map((item) => {
          {
            return (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexDirection="row"
                sx={{
                  border: 1,
                  borderColor: "#f2f2f2",
                  padding: 1,
                  borderRadius: 5,
                }}
              >
                <Box
                  display="flex"
                  gap={1}
                  alignItems="center"
                  flexDirection="row"
                >
                  <img src={item.image} alt="" width={100} />
                  <Box>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography>
                      {item.quantity} x {item.unitPrice} $
                    </Typography>
                    <Button onClick={() => handleRemoveItem(item.productId)}>
                      RemoveItem
                    </Button>
                  </Box>
                </Box>
                <ButtonGroup
                  variant="contained"
                  aria-label="Basic button group"
                >
                  <Button
                    onClick={() => {
                      handleQuantity(item.productId, item.quantity + 1);
                      console.log(item.productId);
                    }}
                  >
                    +
                  </Button>
                  <Button
                    onClick={() =>
                      handleQuantity(item.productId, item.quantity - 1)
                    }
                  >
                    -
                  </Button>
                </ButtonGroup>
              </Box>
            );
          }
        })}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexDirection="row"
        >
          <Typography>Total Amount : {totalAmount.toFixed(2)} $</Typography>
          <Button variant="contained" onClick={handleCheckout}>
            Go To Checkout
          </Button>
        </Box>
      </Box>
    );
  };
  return (
    <Container fixed={true} sx={{ mt: 2 }}>
      <Box display="flex" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h5">My Cart</Typography>
        <Button onClick={() => clearCart()}>Clear Cart</Button>
      </Box>
      {cartItems.length ? (
        renderCartItem()
      ) : (
        <Box>
          <Typography>
            Cart is Empty,Please start shopping and add items first
          </Typography>
        </Box>
      )}
    </Container>
  );
};
export default CartPage;
