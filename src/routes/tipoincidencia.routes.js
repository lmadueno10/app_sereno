const {Router} =require('express');
const router = Router();
const TipoIncidenciaController = require('../controllers/tipoinidencia.controller');
const TipoIncidencia = require('../models/TipoIncidencia');

const tc =new TipoIncidenciaController();

/**
 * @swagger
 * /api/tipo:
 *   get:
 *     summary: Retrieve a kind of incident list.
 *     description: Retrieve a kind of incident list
 *     tags: [Tipo Incidencias]
 *     responses:
 *       '200':
 *         description: A siccessful response.
*/
router.get('/',(req,resp)=>tc.getAll(req,resp,TipoIncidencia));
router.get('/:id',(req,resp)=>tc.getById(req,resp,TipoIncidencia));
router.get('/clasificacion/:id',(req,resp)=>tc.getAllTipoByIdClas(req,resp,TipoIncidencia));
router.post('/',(req,resp)=>tc.create(req,resp,TipoIncidencia,));
router.put('/:id',(req,resp)=>tc.update(req,resp,TipoIncidencia));
router.delete('/:id',(req,res)=>tc.delete(req,res,TipoIncidencia));

module.exports=router;