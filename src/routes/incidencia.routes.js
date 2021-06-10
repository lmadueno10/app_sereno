const {Router} =require('express');
const router = Router();
const IncidenciaController = require('../controllers/incidencia.controller');
const Incidencia = require('../models/Incidencia');
const EvidenciaController = require('../controllers/evidencia.controller');
const ic =new IncidenciaController();
const ec = new EvidenciaController();

/**
 * @swagger
 * /api/incidencias:
 *   get:
 *     summary: Retrieve an incidents list.
 *     description: Retrieve an incidents list
 *     tags: [Incidencias]
 *     responses:
 *       '200':
 *         description: A siccessful response.
*/
router.get('/',(req,resp)=>ic.getAll(req,resp,Incidencia));
/**
 * @swagger
 * /api/incidencias/{id}:
 *   get:
 *     summary: Get an incident by id.
 *     description: Gets an incident json object by incidentid
 *     tags: [Incidencias]
 *     responses:
 *       '200':
 *         description: A siccessful response.
*/
router.get('/:id',(req,resp)=>ic.getById(req,resp,Incidencia));
router.get('/sereno/:id',(req,resp)=>ic.getAllIncidenciaByIdPersonal(req,resp,Incidencia));
router.get('/usuario/:id',(req,resp)=>ic.getAllIncidenciaByIdUsuarioRep(req,resp,Incidencia));
router.get('/dashboard/count',(req,resp)=>ic.getDataDashboard(req,resp,Incidencia));
router.post('/',(req,resp)=>ic.create(req,resp,Incidencia,));
router.post('/sereno',(req,res)=>ec.create(req,res));
router.put('/:id',(req,resp)=>ic.update(req,resp,Incidencia));
router.delete('/:id',(req,res)=>ic.delete(req,res,Incidencia));

module.exports=router;