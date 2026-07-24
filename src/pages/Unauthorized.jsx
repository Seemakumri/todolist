import { Button, Container, Paper, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Container
      sx={{
        height: "100vh",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          padding: 5,

          textAlign: "center",
        }}
      >
        <Typography variant="h2" color="error">
          403
        </Typography>

        <Typography variant="h5">Unauthorized Access</Typography>

        <Button
          variant="contained"
          sx={{ mt: 3 }}
          onClick={() => navigate("/todos")}
        >
          Go To Todos
        </Button>
      </Paper>
    </Container>
  );
};

export default Unauthorized;
