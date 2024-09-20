import { CheckCircleOutline } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };
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
      <CheckCircleOutline sx={{ color: "green", fontSize: "80px" }} />
      <Typography variant="h5">Thank for your order</Typography>
      <Typography>
        we started processing it,and we will get back to you soon
      </Typography>
      <Button variant="contained" onClick={handleHome}>
        Go To Home
      </Button>
    </Container>
  );
};
export default OrderSuccessPage;
