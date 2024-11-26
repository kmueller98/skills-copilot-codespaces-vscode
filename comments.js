// Create web server
const express = require('express');
const app = express();
const port = 3000;

// Create comments array
let comments = [];

// Set up the express server
app.use(express.json());

// Get all comments
app.get('/comments', (req, res) => {
  res.status(200).json(comments);
});

// Get a comment by id
app.get('/comments/:id', (req, res) => {
  const comment = comments.find((comment) => comment.id === parseInt(req.params.id));
  if (!comment) {
    return res.status(404).json({ message: `Comment with id ${req.params.id} not found` });
  }
  res.status(200).json(comment);
});

// Create a comment
app.post('/comments', (req, res) => {
  if (!req.body.author || !req.body.text) {
    return res.status(400).json({ message: 'Author and text are required' });
  }
  const comment = {
    id: comments.length + 1,