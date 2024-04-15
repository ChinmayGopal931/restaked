// Import required modules
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db');

// Import your Ethereum router, assuming the path is correct
const apiRoutes = require('./routes/api');

// Initialize express application
const app = express();

// Server listens on the port provided in the environment variables
const PORT = process.env.PORT;

// Middleware to handle CORS and JSON body parsing
app.use(cors({
    origin: process.env.FRONTEND_URL  // Make sure this matches your frontend URL
}));
app.use(express.json());  // For parsing application/json

// Use your Ethereum router with a base path
app.use('/api', apiRoutes);

// Error handling middleware (should be placed after other middleware and routes)
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).send({ error: err.message });
});

// Connect to MongoDB and start the server
connectDB().then(() => {
    console.log('Connected to MongoDB through db module');
    
    // Start the server only after MongoDB connection is successful
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(error => {
    console.error('Failed to connect to MongoDB:', error);
});



