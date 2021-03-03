const express = require('express')
const morgan = require('morgan');
const path= require('path');
const cors = require('cors');
const {swagerUiServe,swaggerUiSetUp}=require('./routers/swagger.router');

const app = express();

app.use(morgan('dev'));

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname,'public')));

app.use('/api/seguridad',require('./routers/seguridad.router'));
app.use('/',swagerUiServe,swaggerUiSetUp);

module.exports= app;