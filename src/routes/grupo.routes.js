const {Router} =require('express');
const router = Router();
const GrupoController= require('../controllers/grupo.controller');
const Grupo = require('../models/Grupo');
const FtpUtil = require('../utils/ftp.util');
const gc =new GrupoController();

/**
 * @swagger
 * /api/grupo:
 *   get:
 *     summary: Retrieve an grupo list.
 *     description: Retrieve an grupo list
 *     tags: [Grupo]
 *     responses:
 *       '200':
 *         description: A siccessful response.
*/
router.get('/',(req,resp)=>gc.getAll(req,resp,Grupo));
router.get('/:id/asignados',(req,resp)=>gc.getPersonalAsignadoByIdgrupo(req,resp,Grupo));
router.get('/:id/disponibles',(req,resp)=>gc.getPersonalDisponibleByIdgrupo(req,resp,Grupo));
router.get('/:id',(req,resp)=>gc.getById(req,resp,Grupo));
router.post('/',(req,resp)=>gc.create(req,resp,Grupo,));
router.post('/asignar',(req,resp)=>gc.asignarPersonalGrupo(req,resp,Grupo,));
router.put('/:id',(req,resp)=>gc.update(req,resp,Grupo));
router.delete('/:id',(req,res)=>gc.delete(req,res,Grupo));
router.delete('/remover/:idGrupo/:idPersonal',(req,res)=>gc.removePersonalGrupo(req,res,Grupo));
router.post('/ftp',(req,resp)=>{
    const name=req.body.name;
    const fecha=req.body.fecha;
    FtpUtil.onTranferVideoComplete(name,fecha,resp)
})

module.exports=router;