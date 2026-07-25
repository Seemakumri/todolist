import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await loginUser(formData.email, formData.password);

      login(data);

      setToast({
        open: true,
        message: "Login Successful!",
        severity: "success",
      });

      setTimeout(() => navigate("/todos"), 1000);
    } catch (error) {
      setToast({
        open: true,
        message: error.response?.data?.message || "Invalid Email or Password",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#1f2a44",
          px: 2,
        }}
      >
        <Paper
          elevation={10}
          component="form"
          onSubmit={handleLogin}
          sx={{
            width: 360,
            p: 4,
            borderRadius: 3,
            textAlign: "center",
            boxShadow: "0px 15px 35px rgba(0,0,0,0.35)",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "#1976d2",
              width: 50, // was 62
              height: 50, // was 62
              mx: "auto",
              mb: 2,
              boxShadow: "0 6px 15px rgba(25,118,210,0.4)",
            }}
          >
            <LockOutlinedIcon fontSize="medium" />
          </Avatar>

          {/* Heading */}
          <Typography variant="h5" fontWeight="600" gutterBottom>
            Welcome Back
          </Typography>

          <Typography variant="body1" color="text.secondary" mb={3}>
            Sign in to access your dashboard
          </Typography>

          {/* Email */}
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            margin="dense"
          />

          {/* Password */}
          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            required
            margin="dense"
            sx={{ mt: 2 }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          {/* Button */}
          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={loading}
            sx={{
              mt: 3.5,
              py: 1.2,
              fontSize: 18,
              fontWeight: "bold",
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </Paper>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() =>
          setToast({
            ...toast,
            open: false,
          })
        }
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          severity={toast.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoginPage;
