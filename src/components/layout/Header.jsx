import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role, logout } = useAuth();
  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate("/login");
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const navButtonStyle = (path) => ({
    color: "white",
    backgroundColor:
      location.pathname === path ? "rgba(255,255,255,0.25)" : "transparent",
    borderRadius: 2,
    px: 2,
    fontWeight: location.pathname === path ? "bold" : "normal",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.3)",
    },
  });
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography sx={{ flexGrow: 1, fontWeight: "bold" }} variant="h6">
          Todo Management
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {role === "ADMIN" && (
            <>
              <Button
                component={NavLink}
                to="/todos"
                sx={navButtonStyle("/todos")}
              >
                Manage Todos
              </Button>

              <Button
                component={NavLink}
                to="/notes"
                sx={navButtonStyle("/notes")}
              >
                Notes
              </Button>

              <Button
                component={NavLink}
                to="/users"
                sx={navButtonStyle("/users")}
              >
                User Management
              </Button>
            </>
          )}

          {role === "USER" && (
            <Button
              component={NavLink}
              to="/todos"
              sx={navButtonStyle("/todos")}
            >
              My Todos
            </Button>
          )}

          <Box sx={{ ml: 2 }}>
            <Avatar
              onClick={handleMenuOpen}
              sx={{
                width: 36,
                height: 36,
                bgcolor: "#e0e0e0",
                color: "#616161",
                cursor: "pointer",
                border: "1px solid #bdbdbd",
                transition: "0.2s",
                "&:hover": {
                  bgcolor: "#d6d6d6",
                },
              }}
            >
              <FaUserCircle size={36} />
            </Avatar>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem disabled>
                <strong>{role}</strong>
              </MenuItem>

              <Divider />

              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
