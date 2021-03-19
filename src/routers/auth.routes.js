const {Router} = require('express');
const router = new Router();
const AuthController=require('../controllers/auth.controller');
const UsuarioController= require('../controllers/usuario.controller');

const uc= new UsuarioController();
const ac=new AuthController();
/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Refresh-token and access-token
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:      # Request body contents
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *               password:
 *                 type: string
 *             example:   # Sample object
 *               usuario: "10"
 *               password: "secret"
 *     responses:
 *       '201':
 *         description: OK
*/
router.post('/signin',ac.signIn);
/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     summary: Generate a new access-token
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:      # Request body contents
 *             type: object
 *             properties:
 *               refresh_token:
 *                 type: string
 *             example:   # Sample object
 *               refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXN1YXJpbyI6IjQ3NDU4NDYxIiwiaWF0IjoxNjE1ODg5NzkzLCJleHAiOjE2MTU4OTMzOTN9.Mnwg_dCQ6LB1vI7mW8_MnXAWfAnprBpEKH5LNhoCQmQ"
 *     responses:
 *       '201':
 *         description: OK
*/
router.post('/refresh-token',ac.refreshToken);
router.get('/createview',uc.createView);

module.exports=router;