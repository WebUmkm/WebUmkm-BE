const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes.js');
const productRoutes = require('./routes/productRoutes.js');
const cartRoutes = require('./routes/cartRoutes.js');


const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
