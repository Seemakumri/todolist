// import React, { useState } from "react";
// import {
//   Container,
//   Typography,
//   Box,
//   Button,
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   IconButton,
//   TextField,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Chip,
//   MenuItem,
//   InputAdornment,
//   Paper,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import PushPinIcon from "@mui/icons-material/PushPin";
// import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
// import AddIcon from "@mui/icons-material/Add";
// import SearchIcon from "@mui/icons-material/Search";

// const INITIAL_NOTES = [
//   {
//     id: 1,
//     title: "Sprint Review Guidelines",
//     content:
//       "Please ensure all Todo tasks are assigned and updated before Friday 5 PM.",
//     category: "Work",
//     pinned: true,
//     date: "2026-03-20",
//   },
//   {
//     id: 2,
//     title: "System Maintenance Notice",
//     content:
//       "Backend APIs will undergo scheduled maintenance on Sunday from 2 AM to 4 AM IST.",
//     category: "Announcement",
//     pinned: false,
//     date: "2026-03-22",
//   },
// ];

// export const Notes = () => {
//   const [notes, setNotes] = useState(INITIAL_NOTES);
//   const [search, setSearch] = useState("");
//   const [openModal, setOpenModal] = useState(false);

//   const [newNote, setNewNote] = useState({
//     title: "",
//     content: "",
//     category: "Work",
//   });

//   const handleAddNote = (e) => {
//     e.preventDefault();
//     if (!newNote.title.trim() || !newNote.content.trim()) return;

//     const noteObj = {
//       id: Date.now(),
//       title: newNote.title,
//       content: newNote.content,
//       category: newNote.category,
//       pinned: false,
//       date: new Date().toISOString().split("T")[0],
//     };

//     setNotes([noteObj, ...notes]);
//     setNewNote({ title: "", content: "", category: "Work" });
//     setOpenModal(false);
//   };

//   const togglePin = (id) => {
//     setNotes(notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)));
//   };

//   const handleDelete = (id) => {
//     setNotes(notes.filter((n) => n.id !== id));
//   };

//   // Sort pinned notes to top
//   const sortedNotes = [...notes].sort((a, b) => b.pinned - a.pinned);

//   const filteredNotes = sortedNotes.filter(
//     (n) =>
//       n.title.toLowerCase().includes(search.toLowerCase()) ||
//       n.content.toLowerCase().includes(search.toLowerCase()) ||
//       n.category.toLowerCase().includes(search.toLowerCase()),
//   );

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           flexWrap: "wrap",
//           gap: 2,
//           mb: 4,
//         }}
//       >
//         <Box>
//           <Typography variant="h5" fontWeight="bold">
//             Notes & Announcements
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Keep track of team documentation and system updates.
//           </Typography>
//         </Box>
//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           onClick={() => setOpenModal(true)}
//         >
//           Create Note
//         </Button>
//       </Box>

//       <Box sx={{ mb: 4 }}>
//         <TextField
//           placeholder="Search notes by title or keyword..."
//           size="small"
//           fullWidth
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           sx={{
//             bgcolor: "background.paper",
//             borderRadius: 2,
//           }}
//           slotProps={{
//             input: {
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <SearchIcon color="action" />
//                 </InputAdornment>
//               ),
//             },
//           }}
//         />
//       </Box>

//       <Grid container spacing={6.5}>
//         {filteredNotes.length > 0 ? (
//           filteredNotes.map((note) => (
//             <Grid item xs={12} sm={6} md={4} key={note.id}>
//               <Card
//                 elevation={2}
//                 sx={{
//                   height: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                   borderRadius: 3,
//                   transition: "all 0.2s ease-in-out",
//                   border: note.pinned
//                     ? "2px solid #1976d2"
//                     : "1px solid #e0e0e0",
//                   "&:hover": {
//                     transform: "translateY(-4px)",
//                     boxShadow: 6,
//                   },
//                 }}
//               >
//                 <CardContent sx={{ flexGrow: 1 }}>
//                   <Box
//                     display="flex"
//                     justifyContent="space-between"
//                     alignItems="center"
//                     mb={1}
//                   >
//                     <Chip
//                       label={note.category}
//                       size="small"
//                       color={
//                         note.category === "Announcement"
//                           ? "secondary"
//                           : "primary"
//                       }
//                       variant="outlined"
//                     />
//                     <IconButton size="small" onClick={() => togglePin(note.id)}>
//                       {note.pinned ? (
//                         <PushPinIcon color="primary" />
//                       ) : (
//                         <PushPinOutlinedIcon />
//                       )}
//                     </IconButton>
//                   </Box>
//                   <Typography
//                     variant="h6"
//                     fontWeight={600}
//                     gutterBottom
//                     sx={{ mt: 1 }}
//                   >
//                     {note.title}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     color="text.secondary"
//                     sx={{
//                       display: "-webkit-box",
//                       WebkitLineClamp: 3,
//                       WebkitBoxOrient: "vertical",
//                       overflow: "hidden",
//                     }}
//                   >
//                     {note.content}
//                   </Typography>
//                   <Typography
//                     variant="caption"
//                     color="text.disabled"
//                     display="block"
//                     mt={2}
//                   >
//                     Created: {note.date}
//                   </Typography>
//                 </CardContent>

//                 <CardActions
//                   sx={{
//                     justifyContent: "flex-end",
//                     px: 2,
//                     pb: 2,
//                     pt: 0,
//                   }}
//                 >
//                   <IconButton
//                     color="error"
//                     size="small"
//                     onClick={() => handleDelete(note.id)}
//                   >
//                     <DeleteIcon fontSize="small" />
//                   </IconButton>
//                 </CardActions>
//               </Card>
//             </Grid>
//           ))
//         ) : (
//           <Grid item xs={12}>
//             <Paper sx={{ p: 4, textAlign: "center", borderRadius: 2 }}>
//               <Typography color="text.secondary">
//                 No notes found matching your search.
//               </Typography>
//             </Paper>
//           </Grid>
//         )}
//       </Grid>

//       {/* Modal for Creating Note */}
//       <Dialog
//         open={openModal}
//         onClose={() => setOpenModal(false)}
//         fullWidth
//         maxWidth="sm"
//       >
//         <Box component="form" onSubmit={handleAddNote}>
//           <DialogTitle>Create New Note</DialogTitle>
//           <DialogContent
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               gap: 2,
//               pt: "8px !important",
//             }}
//           >
//             <TextField
//               label="Title"
//               fullWidth
//               required
//               value={newNote.title}
//               onChange={(e) =>
//                 setNewNote({ ...newNote, title: e.target.value })
//               }
//             />
//             <TextField
//               select
//               label="Category"
//               fullWidth
//               value={newNote.category}
//               onChange={(e) =>
//                 setNewNote({ ...newNote, category: e.target.value })
//               }
//             >
//               <MenuItem value="Work">Work</MenuItem>
//               <MenuItem value="Announcement">Announcement</MenuItem>
//               <MenuItem value="Personal">Personal</MenuItem>
//             </TextField>
//             <TextField
//               label="Content"
//               fullWidth
//               multiline
//               rows={4}
//               required
//               value={newNote.content}
//               onChange={(e) =>
//                 setNewNote({ ...newNote, content: e.target.value })
//               }
//             />
//           </DialogContent>
//           <DialogActions sx={{ px: 3, pb: 2 }}>
//             <Button onClick={() => setOpenModal(false)}>Cancel</Button>
//             <Button type="submit" variant="contained">
//               Save Note
//             </Button>
//           </DialogActions>
//         </Box>
//       </Dialog>
//     </Container>
//   );
// };

// export default Notes;


import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  MenuItem,
  InputAdornment,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

const INITIAL_NOTES = [
  {
    id: 1,
    title: "Sprint Review Guidelines",
    content: "Please ensure all Todo tasks are assigned and updated before Friday 5 PM.",
    category: "Work",
    pinned: true,
    date: "2026-03-20",
  },
  {
    id: 2,
    title: "System Maintenance Notice",
    content: "Backend APIs will undergo scheduled maintenance on Sunday from 2 AM to 4 AM IST.",
    category: "Announcement",
    pinned: false,
    date: "2026-03-22",
  },
];

export const Notes = () => {
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    category: "Work",
  });

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.title.trim() || !newNote.content.trim()) return;

    const noteObj = {
      id: Date.now(),
      title: newNote.title,
      content: newNote.content,
      category: newNote.category,
      pinned: false,
      date: new Date().toISOString().split("T")[0],
    };

    setNotes([noteObj, ...notes]);
    setNewNote({ title: "", content: "", category: "Work" });
    setOpenModal(false);
  };

  const togglePin = (id) => {
    setNotes(notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)));
  };

  const handleDelete = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  const sortedNotes = [...notes].sort((a, b) => b.pinned - a.pinned);

  const filteredNotes = sortedNotes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase()) ||
      n.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Notes & Announcements
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Keep track of team documentation and system updates.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenModal(true)} sx={{ borderRadius: 2 }}>
          Create Note
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <TextField
          placeholder="Search notes by title, content, or category..."
          size="small"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ bgcolor: "background.paper", borderRadius: 2 }}
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
      </Box>

      <Grid container spacing={3}>
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <Grid item xs={12} sm={6} md={4} key={note.id}>
              <Card
                elevation={note.pinned ? 4 : 1}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  transition: "all 0.2s ease-in-out",
                  border: note.pinned ? "1.5px solid #1976d2" : "1px solid #e0e0e0",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Chip
                      label={note.category}
                      size="small"
                      color={note.category === "Announcement" ? "secondary" : "primary"}
                      variant="outlined"
                      sx={{ fontWeight: 600 }}
                    />
                    <IconButton size="small" onClick={() => togglePin(note.id)}>
                      {note.pinned ? <PushPinIcon color="primary" fontSize="small" /> : <PushPinOutlinedIcon fontSize="small" />}
                    </IconButton>
                  </Box>
                  <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 1 }}>
                    {note.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {note.content}
                  </Typography>
                  <Typography variant="caption" color="text.disabled" display="block" mt={2}>
                    Created: {note.date}
                  </Typography>
                </CardContent>

                <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 1.5 }}>
                  <IconButton color="error" size="small" onClick={() => handleDelete(note.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Paper sx={{ p: 4, textAlign: "center", borderRadius: 2 }}>
              <Typography color="text.secondary">No notes found matching your search.</Typography>
            </Paper>
          </Grid>
        )}
      </Grid>

      <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="sm">
        <Box component="form" onSubmit={handleAddNote}>
          <DialogTitle>Create New Note</DialogTitle>
          <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: "8px !important" }}>
            <TextField label="Title" fullWidth required value={newNote.title} onChange={(e) => setNewNote({ ...newNote, title: e.target.value })} />
            <TextField select label="Category" fullWidth value={newNote.category} onChange={(e) => setNewNote({ ...newNote, category: e.target.value })}>
              <MenuItem value="Work">Work</MenuItem>
              <MenuItem value="Announcement">Announcement</MenuItem>
              <MenuItem value="Personal">Personal</MenuItem>
            </TextField>
            <TextField label="Content" fullWidth multiline rows={4} required value={newNote.content} onChange={(e) => setNewNote({ ...newNote, content: e.target.value })} />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
            <Button type="submit" variant="contained">Save Note</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Container>
  );
};

export default Notes;