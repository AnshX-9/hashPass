
require('dotenv').config();
const express = require('express');
const connectDB = require('./db/db');

const authRoutes = require('./routes/authRoutes')


const app = express();

connectDB();


app.use('/auth', authRoutes);



app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
