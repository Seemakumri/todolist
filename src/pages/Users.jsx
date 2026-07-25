import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Snackbar,
  Alert,
  InputAdornment,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";

const INITIAL_USERS = [
  { id: 1, name: "Admin User", email: "admin@company.com", role: "ADMIN", status: "Active" },
  { id: 2, name: "Sarah Connor", email: "sarah@company.com", role: "USER", status: "Active" },
  { id: 3, name: "John Doe", email: "john@company.com", role: "USER", status: "Inactive" },
];

export const Users = () => {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const [newUser, setNewUser] = useState({ name: "", email: "", role: "USER" });

  const showToast = (message, severity = "success") => {
    setToast({ open: true, message, severity });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name.trim() || !newUser.email.trim()) return;

    const userObj = {
      id: Date.now(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "Active",
    };

    setUsers([userObj, ...users]);
    setNewUser({ name: "", email: "", role: "USER" });
    setOpenModal(false);
    showToast("User created successfully!");
  };

  const toggleRole = (id) => {
    setUsers(
      users.map((u) =>
        u.id === id ? { ...u, role: u.role === "ADMIN" ? "USER" : "ADMIN" } : u
      )
    );
    showToast("User role updated");
  };

  const toggleStatus = (id) => {
    setUsers(
      users.map((u) =>
        u.id === id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u
      )
    );
    showToast("User status updated");
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
    showToast("User deleted", "info");
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
  <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          mb: 4,
        }}
      >          <div>
            <Typography variant="h5" fontWeight="bold">
              User Management
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Manage system permissions, active accounts, and user roles.
            </Typography>
          </div>

          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            onClick={() => setOpenModal(true)}
          >
            Add New User
          </Button>
        </Box>

        <Box mb={3}>
          <TextField
            placeholder="Search by name or email..."
            size="small"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
  input: {
    endAdornment: (
      <InputAdornment position="end">
        <SearchIcon color="action" />
      </InputAdornment>
    ),
  },
}}
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell align="center"><strong>Role</strong></TableCell>
                <TableCell align="center"><strong>Status</strong></TableCell>
                <TableCell align="right"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={user.role}
                        color={user.role === "ADMIN" ? "primary" : "default"}
                        size="small"
                        onClick={() => toggleRole(user.id)}
                        sx={{ cursor: "pointer" }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={user.status}
                        color={user.status === "Active" ? "success" : "error"}
                        variant="outlined"
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        title="Toggle Status"
                        color={user.status === "Active" ? "success" : "default"}
                        onClick={() => toggleStatus(user.id)}
                      >
                        {user.status === "Active" ? <ToggleOnIcon /> : <ToggleOffIcon />}
                      </IconButton>
                      <IconButton
                        title="Delete User"
                        color="error"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Modal for Creating New User */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="xs">
        <Box component="form" onSubmit={handleAddUser}>
          <DialogTitle>Add New User</DialogTitle>
          <DialogContent display="flex" flexDirection="column" gap={2}>
            <TextField
              margin="dense"
              label="Full Name"
              fullWidth
              required
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Email Address"
              type="email"
              fullWidth
              required
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <TextField
              margin="dense"
              select
              label="Role"
              fullWidth
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <MenuItem value="USER">USER</MenuItem>
              <MenuItem value="ADMIN">ADMIN</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
            <Button type="submit" variant="contained">
              Save User
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={toast.severity} variant="filled">
          {toast.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Users;