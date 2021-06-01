const {Router} =require('express');
const VideoController = require('../controllers/video.controller');
const Video = require('../models/Video');
const router = Router();

const vc =new VideoController();

/**
 * @swagger
 * /api/video:
 *   get:
 *     summary: Retrieve a video list.
 *     description: Retrieve a video list
 *     tags: [Video]
 *     responses:
 *       '200':
 *         description: A successful response.
*/
router.get('/',(req,resp)=>vc.getAll(req,resp,Video));
/**
 * @swagger
 * /api/video/{id}:
 *   get:
 *     summary: Get a video by id.
 *     description: Gets a video json object by id
 *     tags: [Video]
 *     responses:
 *       '200':
 *         description: A successful response.
*/
router.get('/:id',(req,resp)=>vc.getById(req,resp,Video));
router.post('/',(req,resp)=>vc.create(req,resp,Video));
router.put('/:id',(req,resp)=>vc.update(req,resp,Video));
router.delete('/:id',(req,res)=>vc.delete(req,res,Video));

module.exports=router;