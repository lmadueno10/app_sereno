const express = require('express')
const morgan = require('morgan');
const path= require('path');
const cors = require('cors');
const multer = require ('multer');
const {swagerUiServe,swaggerUiSetUp}=require('./routes/swagger.router');

const app = express();

app.use(morgan('dev'));

app.use(express.urlencoded({extended:false}));
app.use(express.json());
const storage=multer.diskStorage({
    destination:path.join(__dirname,'public','evidencia'),
    filename(req,file,callback){
        callback(null,new Date().getTime()+path.extname(file.originalname));
    }
});
app.use(multer({storage}).fields([{name:'video',maxCount:1},{name:'audio',maxCount:1},{name:'image',maxCount:1}]));
app.use(cors());
app.use(express.static(path.join(__dirname,'public')));

app.use('/api/seguridad',require('./routes/seguridad.router'));
app.use('/api/auth',require('./routes/auth.routes'));
app.use('/api/usuarios',require('./routes/usuario.routes'));
app.use('/api/incidencias',require('./routes/incidencia.routes'));
app.use('/api/clasificacion',require('./routes/clasificacioninidencia.routes'));
app.use('/api/tipo',require('./routes/tipoincidencia.routes'));
app.use('/api/subtipo',require('./routes/subtipoincidencia.routes'));
app.use('/api/personal-campo',require('./routes/personalcampo.routes'));
app.use('/api/accion-incidencia',require('./routes/accionincidencia.routes'));
app.use('/api/tipo-accion',require('./routes/tipoaccion.routes'));
app.use('/',swagerUiServe,swaggerUiSetUp);

module.exports= app;