const express = require('express');
const app = express();
const mongodb = require('./db/connect');
const PORT = process.env.PORT || 3300;

// Middleware for JSON parsing
app.use(express.json());

// (Optional) Enable CORS if our frontend is separate
// const cors = require('cors');
// app.use(cors());

app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
});