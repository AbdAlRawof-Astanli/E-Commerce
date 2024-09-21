import { Box, Container, Typography } from "@mui/material";
import { useAuth } from "../context/Auth/AuthContext";
import { useEffect } from "react";
const MyOrdersPage = () => {
  const { getMyOrders, myOrders } = useAuth();
  useEffect(() => {
    getMyOrders();
  }, []);

  return (
    <Container
      fixed
      sx={{
        mt: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          border: 1,
          borderRadius: 2,
          padding: 1,
          backgroundColor: "#1976d2",
          color: "whitesmoke",
        }}
      >
        My Orders
      </Typography>
      {myOrders.map(({ address, orderItems, total }) => {
        return (
          <Box
            sx={{
              border: 1,
              padding: 2,
              borderRadius: 2,
              borderColor: "gray",
            }}
          >
            <Typography>Address : {address}</Typography>
            <Box>
              {orderItems.map(({ productTitle, productPrice, quantity }) => {
                return (
                  <Typography>
                    Item : {productTitle} {productPrice} {quantity}
                  </Typography>
                );
              })}
            </Box>
            <Typography>Total : {total}</Typography>
          </Box>
        );
      })}
    </Container>
  );
};
export default MyOrdersPage;
