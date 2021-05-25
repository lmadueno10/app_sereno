const {Router} =require('express');
const UsuarioController = require('../controllers/usuario.controller');
const Usuario = require('../models/Usuario');
const router = Router();

const uc =new UsuarioController();

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Retrieve a user list.
 *     description: Retrieve a user list for app_sereno
 *     tags: [Usuarios]
 *     responses:
 *       '200':
 *         description: A successful response.
*/
router.get('/',(req,resp)=>uc.getAll(req,resp,Usuario));
/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Get a user by id.
 *     description: Gets a user json object by userid
 *     tags: [Usuarios]
 *     responses:
 *       '200':
 *         description: A successful response.
*/
router.get('/:id',(req,resp)=>uc.getById(req,resp,Usuario));
router.post('/',(req,resp)=>uc.create(req,resp,Usuario,));
router.put('/:id',(req,resp)=>uc.update(req,resp,Usuario));
router.delete('/:id',(req,res)=>uc.delete(req,res,Usuario));

module.exports=router;