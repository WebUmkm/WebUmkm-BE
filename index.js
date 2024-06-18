const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const authRoutes = require('./routes/authRoutes.js');
const productRoutes = require('./routes/productRoutes.js');
const cartRoutes = require('./routes/cartRoutes.js');
const imageRoutes = require('./routes/imageRoutes.js');
const metodRoutes = require('./routes/metodRoutes.js');

const MetodePembayaran = require('./models/metode_pembayaran.js'); 

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// CORS Configuration
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "OPTIONS", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Route Handling
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);
app.use(express.static('img'));
app.use('/', imageRoutes);
app.use('/api/payments', metodRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);


});
