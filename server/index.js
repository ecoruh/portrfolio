// server/index.js
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3001;

// Enable CORS so our React app (running on a different port) can access our endpoints
app.use(cors());
app.use(express.json());

// --- Sample Data ---
// For now we hardcode some album names and image file names.
// Later, you might replace this with dynamic logic.
const albums = {
  "Monochrome": ["L1030306.jpg", "L1030313.jpg", "L1030999.jpg"],
  "Japan": ["R0000197.jpg", "R0000606.jpg", "R0000805.jpg"]
};

// Endpoint to return the list of album names
app.get('/api/albums', (req, res) => {
  res.json(Object.keys(albums));
});

// Endpoint to return the list of images for a given album
app.get('/api/album/:albumName', (req, res) => {
  const albumName = req.params.albumName;
  const images = albums[albumName];
  if (images) {
    res.json(images);
  } else {
    res.status(404).json({ error: 'Album not found' });
  }
});

// --- Serve Image Files ---
// Place your image files under server/public/<AlbumName>/
// For example: server/public/Monochrome/image1.jpg
app.use(
  '/api/image',
  express.static(path.join(__dirname, 'public'), {
    // Cache control: instruct browsers/clients to cache images for 1 day
    maxAge: 0, // '1d'
  })
);

app.listen(port, () => {
  console.log(`Express server running on http://localhost:${port}`);
});