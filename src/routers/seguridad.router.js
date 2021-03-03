const {Router} =require('express')
const router = Router();

const SeguridadController = require('../controllers/seguridad.controller');
//const Seguridad= require('../models/Seguridad');

const seg = new SeguridadController();

/**
 * @swagger
 * /seguridad:
 *   get:
 *     summary: Retrieve a welcome message.
 *     description: Retrieve a welcome message for testing app_sereno
*/
router.get('/',(req,resp)=>seg.getAll(req,resp,null));
/**
 * @swagger
 * /seguridad/testingdb:
 *   get:
 *     summary: Retrieve an object from database query.
 *     description: Retrieve an object from database query for testing database connection
*/
router.get('/testingdb',(req,resp)=>seg.testingDB(req,resp,null));
router.get('/:id',(req,resp)=>seg.getById(req,resp,null));
router.post('/',(req,resp)=>seg.create(req,resp,null,'Seguridad'));
router.put('/:id',(req,resp)=>seg.update(req,resp,null,'Seguridad'));
router.delete('/:id',(req,res)=>seg.delete(req,res,null,'Seguridad'));

module.exports=router;