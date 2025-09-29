const express = require('express');
const router = express.Router(); // Create a router instance
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

var options = {
  customCss: '.swagger-ui .topbar { display: none }',
};

router.get('/', (req, res) => {
  // Default Hello World so that we're friendly :)
    res.send('Hello World! type /api-docs to see documentation')
});

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument, options));

module.exports = router;