const {Router} =require('express');
const TipoAccionController = require('../controllers/tipoaccion.controller');
const TipoAccion = require('../models/TipoAccion');
const router = Router();

const tc =new TipoAccionController();

/**
 * @swagger
 * /api/tipo-accion:
 *   get:
 *     summary: Retrieve a tipo-accion list.
 *     description: Retrieve a tipo-accion list
 *     tags: [Tipo Acción]
 *     responses:
 *       '200':
 *         description: A successful response.
*/
router.get('/',(req,resp)=>tc.getAll(req,resp,TipoAccion));
/**
 * @swagger
 * /api/tipo-accion/{id}:
 *   get:
 *     summary: Get a tipo-accion by id.
 *     description: Gets a tipo-accion json object by userid
 *     tags: [Tipo Acción]
 *     responses:
 *       '200':
 *         description: A successful response.
*/
router.get('/:id',(req,resp)=>tc.getById(req,resp,Usuario));
router.post('/',(req,resp)=>tc.create(req,resp,TipoAccion));
router.put('/:id',(req,resp)=>tc.update(req,resp,TipoAccion));
router.delete('/:id',(req,res)=>tc.delete(req,res,TipoAccion));

module.exports=router;