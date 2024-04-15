require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path'); // Add path module
const connectDB = require('./db/db');

const apiRoutes = require('./routes/api');

const app = express();

const PORT = process.env.PORT || 8080; 

app.use(cors({
    origin: process.env.FRONTEND_URL  
}));
app.use(express.json());  

app.use('/api', apiRoutes);

app.use(express.static(path.join(__dirname, '../../frontend/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).send({ error: err.message });
});

connectDB().then(() => {
    console.log('Connected to MongoDB through db module');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(error => {
    console.error('Failed to connect to MongoDB:', error);
});
