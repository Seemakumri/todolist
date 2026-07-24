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
  Checkbox
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// Static dummy data
const INITIAL_TODOS = [
  { id: 1, title: "Set up project repository", completed: true },
  { id: 2, title: "Design dashboard layout", completed: false },
  { id: 3, title: "Integrate static mock state", completed: false }
];

export const Todos = () => {
  const [todos, setTodos] = useState(INITIAL_TODOS);
  const [title, setTitle] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTodo = {
      id: Date.now(),
      title: title,
      completed: false
    };

    setTodos([...todos, newTodo]);
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

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom align="center">
          Todo List (Static Mode)
        </Typography>

        <Box component="form" onSubmit={addTodo} sx={{ display: "flex", gap: 1, mb: 2 }}>
          <TextField
            fullWidth
            label="New Todo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            size="small"
          />
          <Button variant="contained" type="submit">
            Add
          </Button>
        </Box>

        <List>
          {todos.map((todo) => (
            <ListItem
              key={todo.id}
              secondaryAction={
                <IconButton edge="end" onClick={() => deleteTodo(todo.id)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <Checkbox
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <ListItemText
                primary={todo.title}
                sx={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "text.secondary" : "inherit"
                }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};