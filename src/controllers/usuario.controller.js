const jwt= require('jsonwebtoken');
const {pool} = require('../database.js');
const Usuario =require('../models/Usuario');
const GenericController = require('./generic/generic.controller.js');
/**
 * Class representing Controller.
 *
 * @class
 */
class UsuarioController extends GenericController{

	async createView(req,res){
		try{
			const temp = await pool.query(`create or replace view v_usuarios as select id, '4745846' || id as usuario, 'S' || floor(random() * 999 + 1)::int as codigo_usuario, floor(random() * 24 + 1)::int as sector_id,'Juan Perez' as nombres_apellidos,'9' || floor(random() * 99999999 + 1)::int as celular,'Brian Gomero' as supervisor,floor(random() * 2 + 1)::int as profile_id,'$2a$10$CBbo1r5Ji2dgKNqXYcmqmOuNh07ZrXLP7ivgUnYzilhm8ZZ7MIFKe' as contrasena from generate_series(1, 3) as id;`);
			res.status(200).json({data:temp.rows});
		}catch(err){
			console.error(err);
			res.status(500).json({message:'Internal Error',data:err});
		}
	}
	/**
	 * @param {object} req HttpRequest Object
	 * @param {object} res HttpResponse Object
	 * @returns {JSONObject}
	 */
	async getUserByUsername(req,res){
		try{
			const temp = await Usuario.getUserByUserName(req.body.usuario);
			res.status(200).json({code:200,usuario:temp});
		}catch(err){
			console.error(err);
			res.status(500).json({message:'Internal Error',data:err});
		}
	}
}

module.exports=UsuarioController;