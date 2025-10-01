const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const { connectDb } = require('./db/connect');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

dotenv.config();

//middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//Routes Mount
app.use('/auth', authRoutes);
app.use('/user', userRoutes);


const PORT = process.env.PORT || 3300;

// Middleware for JSON parsing
app.use(express.json());

// (Optional) Enable CORS if our frontend is separate
// const cors = require('cors');
// app.use(cors());

app.use('/', require('./routes'));


connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB:', err.message);
  });

