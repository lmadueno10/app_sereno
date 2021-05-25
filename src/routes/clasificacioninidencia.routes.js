const {Router} =require('express');
const router = Router();
const ClasificacionIncidenciaController= require('../controllers/clasificacionincidencia.controller');
const ClasificacionIncidencia = require('../models/ClasificacionIncidencia');
const cc =new ClasificacionIncidenciaController();

/**
 * @swagger
 * /api/clasificacion:
 *   get:
 *     summary: Retrieve an clasification list.
 *     description: Retrieve an clasification list
 *     tags: [Clasificación Incidencias]
 *     responses:
 *       '200':
 *         description: A siccessful response.
*/
router.get('/',(req,resp)=>cc.getAll(req,resp,ClasificacionIncidencia));
router.get('/:id',(req,resp)=>cc.getById(req,resp,ClasificacionIncidencia));
router.post('/',(req,resp)=>cc.create(req,resp,ClasificacionIncidencia,));
router.put('/:id',(req,resp)=>cc.update(req,resp,ClasificacionIncidencia));
router.delete('/:id',(req,res)=>cc.delete(req,res,ClasificacionIncidencia));

module.exports=router;