const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const connectDB = require('./config/mongo'); // Require the database connection

const app = express();

// Set the view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Add body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to the MongoDB database
connectDB();

// Define routes
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

// Start the server
const port = 3000; // Set the desired port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
