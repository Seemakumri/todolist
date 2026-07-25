import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Typography,
  Box,
  Checkbox,
  Chip,
  MenuItem,
  Stack,
  InputAdornment,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { useAuth } from "../context/AuthContext";

const INITIAL_TODOS = [
  {
    id: 1,
    title: "Set up project repository",
    completed: true,
    assignedTo: "Admin",
    priority: "High",
  },
  {
    id: 2,
    title: "Design dashboard layout",
    completed: false,
    assignedTo: "Sarah Connor",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Integrate static mock state",
    completed: false,
    assignedTo: "John Doe",
    priority: "Low",
  },
];

export const Todos = () => {
  const { role, user } = useAuth();
  const isAdmin = role === "ADMIN";

  const [todos, setTodos] = useState(INITIAL_TODOS);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [assignedTo, setAssignedTo] = useState("Unassigned");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const addTodo = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTodo = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
      assignedTo: isAdmin ? assignedTo : user?.name || "Me",
      priority,
    };

    setTodos([newTodo, ...todos]);
    setTitle("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const visibleTodos = todos.filter((todo) => {
    const matchesUser =
      isAdmin ||
      todo.assignedTo === (user?.name || "Me") ||
      todo.assignedTo === "Unassigned";

    const matchesSearch = todo.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL"
        ? true
        : statusFilter === "COMPLETED"
        ? todo.completed
        : !todo.completed;

    return matchesUser && matchesSearch && matchesStatus;
  });

  const getPriorityColor = (p) => {
    switch (p) {
      case "High":
        return "error";
      case "Medium":
        return "warning";
      case "Low":
        return "info";
      default:
        return "default";
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={2} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 2,
            mb: 3,
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ flex: 1, minWidth: 240 }}>
            <Typography variant="h5" fontWeight="bold">
              {isAdmin ? "Manage Todos" : "My Todos"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {isAdmin
                ? "Assign, manage, and audit task progress across all users."
                : "View and update your assigned daily tasks."}
            </Typography>
          </Box>

          <Chip
            label={`Role: ${role || "USER"}`}
            color={isAdmin ? "primary" : "secondary"}
            variant="outlined"
            sx={{ fontWeight: 600, borderRadius: 2 }}
          />
        </Box>

        {/* Task Creation Form */}
        <Box component="form" onSubmit={addTodo} sx={{ mb: 3 }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <TextField
              fullWidth
              label="New Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              size="small"
              required
            />

            {isAdmin && (
              <TextField
                select
                label="Assign To"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                size="small"
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="Unassigned">Unassigned</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Sarah Connor">Sarah Connor</MenuItem>
                <MenuItem value="John Doe">John Doe</MenuItem>
              </TextField>
            )}

            <TextField
              select
              label="Priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              size="small"
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </TextField>

            <Button
              variant="contained"
              type="submit"
              startIcon={<AddTaskIcon />}
              sx={{ px: 3, textTransform: "none", borderRadius: 2 }}
            >
              Add
            </Button>
          </Stack>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Search and Status Filters */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={3}>
          <TextField
            placeholder="Search tasks..."
            size="small"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            select
            size="small"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{ minWidth: 160 }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <FilterListIcon color="action" />
                  </InputAdornment>
                ),
              },
            }}
          >
            <MenuItem value="ALL">All Status</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="COMPLETED">Completed</MenuItem>
          </TextField>
        </Stack>

        {/* Task List */}
        <List sx={{ p: 0 }}>
          {visibleTodos.length > 0 ? (
            visibleTodos.map((todo) => (
              <ListItem
                key={todo.id}
                sx={{
                  bgcolor: "background.paper",
                  mb: 1.5,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    boxShadow: 2,
                    borderColor: "primary.light",
                  },
                }}
                secondaryAction={
                  isAdmin && (
                    <IconButton
                      edge="end"
                      color="error"
                      onClick={() => deleteTodo(todo.id)}
                      size="small"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  )
                }
              >
                <Checkbox
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  color="primary"
                />

                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      sx={{
                        textDecoration: todo.completed ? "line-through" : "none",
                        color: todo.completed ? "text.disabled" : "text.primary",
                        fontWeight: todo.completed ? 400 : 500,
                      }}
                    >
                      {todo.title}
                    </Typography>
                  }
                  secondary={
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      mt={0.5}
                    >
                      <Chip
                        label={todo.priority}
                        size="small"
                        color={getPriorityColor(todo.priority)}
                        variant="outlined"
                        sx={{ height: 20, fontSize: "0.7rem", fontWeight: 600 }}
                      />
                      {isAdmin && (
                        <Typography variant="caption" color="text.secondary">
                          Assigned to: <strong>{todo.assignedTo}</strong>
                        </Typography>
                      )}
                    </Stack>
                  }
                />
              </ListItem>
            ))
          ) : (
            <Paper variant="outlined" sx={{ p: 4, textAlign: "center", borderRadius: 2 }}>
              <Typography color="text.secondary">No tasks found matching your filters.</Typography>
            </Paper>
          )}
        </List>
      </Paper>
    </Container>
  );
};

export default Todos;