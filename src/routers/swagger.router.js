const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for app_sereno',
    version: '1.0.0',
  },
  servers:[{
  	url:'http://localhost:3000',
  	description:'Development server',
  },
  {
    url:'https://app-sereno.herokuapp.com/',
    description:'Demo server',
  },
  ]
};

const swaggerOption={
	swaggerDefinition,
	apis: ['./src/routers/*.js'],
}

const swaggerDocs=swaggerJSDoc(swaggerOption);
const swagerUiServe=swaggerUI.serve;
const swaggerUiSetUp=swaggerUI.setup(swaggerDocs);

module.exports={swagerUiServe,swaggerUiSetUp};