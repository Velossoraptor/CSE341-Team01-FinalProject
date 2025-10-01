const express = require('express');
require('dotenv').config();

const mongoose = require('mongoose');

const cors = require('cors');

const PORT = process.env.PORT || 3300;
const app = express();

app.use(cors()).use(express.json()).use('/', require('./routes'));

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
