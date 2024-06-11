const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes.js');
const productRoutes = require('./routes/productRoutes.js');
const cartRoutes = require('./routes/cartRoutes.js');
const cors = require('cors');
const fs = require('fs');
const path = require('path');


const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

app.use(
    cors({
      origin: ["http://localhost:5000"],
      methods: ["GET", "POST", "PUT", "OPTIONS", "DELETE"],
      credentials: true,
      optionsSuccessStatus: 200,
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);

const imageRoutes = require('./routes/imageRoutes.js');
app.use(express.static('img'));
app.use('/', imageRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
