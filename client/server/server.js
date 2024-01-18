// server.js (or app.js)
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/Emoji', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define your user routes
app.use('/api/users', userRoutes);

// Define a simple route for the root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to your server!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
