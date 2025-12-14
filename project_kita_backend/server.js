// server.js

require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 

const app = express();
const port = process.env.PORT || 5000;

// Buat Middleware
app.use(cors()); 
app.use(express.json()); 

// Koneksi Database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected Successfully.');
    } catch (error) {
        console.error('Database Connection Error:', error.message);
        process.exit(1);
    }
};
connectDB();

// --- Area Routes (Akan diisi di Langkah 7) ---
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});