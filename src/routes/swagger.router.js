const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for app_sereno',
    version: '1.0.0',
  },
  servers: [
    {
      url: `http://95.217.44.43:${process.env.PORT}`,
      description: 'Demo server',
    },
    {
      url: `http://localhost:${process.env.PORT}`,
      description: 'Development server',
    },
  ]
};

const swaggerOption = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'],
}

const swaggerDocs = swaggerJSDoc(swaggerOption);
const swagerUiServe = swaggerUI.serve;
const swaggerUiSetUp = swaggerUI.setup(swaggerDocs);

module.exports = { swagerUiServe, swaggerUiSetUp };