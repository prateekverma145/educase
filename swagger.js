// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'School Management API',
      version: '1.0.0',
      description: 'Add/list schools sorted by proximity',
    },
    servers: [
      { url: 'https://educase-zp18.onrender.com/api' }
    ],
  },
  apis: ['./routes.js','./controller.js'],  // adjust path if different
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = app => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
