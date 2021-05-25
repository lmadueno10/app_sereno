const {Router} =require('express');
const PersonalCampoController = require('../controllers/personalcampo.controller');
const Usuario = require('../models/Usuario');
const personalcampo= require('../models/PersonalCampo');
const PersonalCampo = require('../models/PersonalCampo');
const router = Router();

const pc =new PersonalCampoController();

/**
 * @swagger
 * /api/personal-campo:
 *   get:
 *     summary: Retrieve a user list.
 *     description: Retrieve a user list for app_sereno
 *     tags: [Personal Campo]
 *     responses:
 *       '200':
 *         description: A successful response.
*/
router.get('/',(req,resp)=>pc.getAll(req,resp,PersonalCampo));
/**
 * @swagger
 * /api/personal-campo/{id}:
 *   get:
 *     summary: Get a user by id.
 *     description: Gets a user json object by userid
 *     tags: [Personal Campo]
 *     responses:
 *       '200':
 *         description: A successful response.
*/
router.get('/:id',(req,resp)=>pc.getById(req,resp,PersonalCampo));
router.post('/',(req,resp)=>pc.create(req,resp,Usuario,PersonalCampo));
router.put('/:id',(req,resp)=>pc.update(req,resp,Usuario,PersonalCampo));
router.delete('/:id',(req,res)=>pc.delete(req,res,PersonalCampo));

module.exports=router;