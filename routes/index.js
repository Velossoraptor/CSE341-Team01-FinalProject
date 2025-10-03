const express = require('express');
const router = express.Router(); // Create a router instance

router.get('/', (req, res) => {
  res.send('Hello World! type /api-docs to see documentation');
});

module.exports = router;
