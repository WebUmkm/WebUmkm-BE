const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');

const app = express();
app.use(express.json());

app.use(cors());

app.use('/api/auth', authRoutes);

app.listen(8080, () => {
    console.log(`listening on port 8080`);
});