const {Router} =require('express');
const AccionIncidenciaController= require('../controllers/accionincidencia.controller');
const signVideo = require('../middlewares/signVideo');
const AccionIncidencia = require('../models/AccionIncidencia');

const router = Router();

const ac =new AccionIncidenciaController();

/**
 * @swagger
 * /api/accion-incidencia:
 *   get:
 *     summary: Retrieve an accion-incidencia list.
 *     description: Retrieve an accion-incidencia list
 *     tags: [Accion Incidencias]
 *     responses:
 *       '200':
 *         description: A siccessful response.
*/
router.get('/',(req,resp)=>ac.getAll(req,resp,AccionIncidencia));
router.get('/:id',(req,resp)=>ac.getById(req,resp,AccionIncidencia));
router.post('/',[signVideo],(req,resp)=>ac.create(req,resp));
router.put('/:id',(req,resp)=>ac.update(req,resp,AccionIncidencia));
router.delete('/:id',(req,res)=>ac.delete(req,res,AccionIncidencia));

module.exports=router;