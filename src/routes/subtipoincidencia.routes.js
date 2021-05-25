const {Router} =require('express');
const router = Router();
const SubtipoIncidenciaController = require('../controllers/subtipoincidencia.controller');
const SubtipoIncidencia = require('../models/SubtipoIncidencia');

const sc =new SubtipoIncidenciaController();

/**
 * @swagger
 * /api/subtipo:
 *   get:
 *     summary: Retrieve an sub type list.
 *     description: Retrieve an sub type list
 *     tags: [Subtipo Incidencias]
 *     responses:
 *       '200':
 *         description: A siccessful response.
*/
router.get('/',(req,resp)=>sc.getAll(req,resp,SubtipoIncidencia));
router.get('/:id',(req,resp)=>sc.getById(req,resp,SubtipoIncidencia));
router.get('/tipo/:id',(req,resp)=>sc.getAllSubtipoByIdTipo(req,resp,SubtipoIncidencia));
router.post('/',(req,resp)=>sc.create(req,resp,SubtipoIncidencia,));
router.put('/:id',(req,resp)=>sc.update(req,resp,SubtipoIncidencia));
router.delete('/:id',(req,res)=>sc.delete(req,res,SubtipoIncidencia));

module.exports=router;