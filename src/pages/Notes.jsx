import { Container, Paper, Typography } from "@mui/material";

export const Notes = () => {
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
          Notes
        </Typography>

        <Typography variant="body1">
          Notes page is under development.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Notes;