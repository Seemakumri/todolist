import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import { loginUser } from "../services/authService";

const LoginPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData.email, formData.password);

      console.log(data);

      // save user details

      localStorage.setItem("user", JSON.stringify(data));

      // save role

      localStorage.setItem("role", data.role);

      alert("Login Successful");

      navigate("/todos");
    } catch (error) {
      alert("Invalid Email or Password");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        background: "#f5f5f5",
      }}
    >
      <Paper
        component="form"
        onSubmit={handleLogin}
        sx={{
          width: 400,

          padding: 4,

          borderRadius: 3,
        }}
        elevation={4}
      >
        <Typography variant="h4" textAlign="center" mb={3} fontWeight="bold">
          Login
        </Typography>

        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          fullWidth
          variant="contained"
          type="submit"
          sx={{
            mt: 3,

            py: 1.5,
          }}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
};

export default LoginPage;
