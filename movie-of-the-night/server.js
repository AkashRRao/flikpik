const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const movies = [
    { title: 'Movie Title 1', poster: 'movie1.jpg' },
    { title: 'Movie Title 2', poster: 'movie2.jpg' },
    { title: 'Movie Title 3', poster: 'movie3.jpg' }
];

// Serve static files (e.g., images, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/movie-of-the-night', (req, res) => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    const movie = movies[randomIndex];
    res.json(movie);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});