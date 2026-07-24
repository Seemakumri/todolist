import { Container, Paper, Typography } from "@mui/material";

export const Users = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          User Management
        </Typography>

        <Typography variant="body1">
          Only ADMIN can access this page.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Users;