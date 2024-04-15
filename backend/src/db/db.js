require('dotenv').config({path: '../.env'});
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI
console.log(process.env.MONGODB_URI)

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        throw err;  
    }
};

module.exports = connectDB;
