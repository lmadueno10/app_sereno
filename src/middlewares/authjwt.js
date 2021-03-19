const jwt = require('jsonwebtoken');
const Usuario=require('../models/Usuario');
const Perfil= require('../models/Perfil');
/**
 * @param {object} req HttpRequest Object
 * @param {object} res HttpResponse Object
 * @param {object} next Object
 * 
 */
const verifyToken=async (req,res,next)=>{
	try{
		const token=req.headers['x-access-token'];
		if(!token) return res.status(403).json({message:'No se ha enviado un token'});
		const decoded =jwt.verify(token,process.env.KEY_TOKEN);
		req.usuarioId=decoded.id;
		const usu=await Usuario.getUserById(decoded.id);
		if(!usu) return res.status(404).json({message:'Usuario no encontrado'});
	}catch(err){
		switch(err.name){
			case 'TokenExpiredErro':
				return res.status(200).json({code:401,message:'Vuelva iniciar session'});
				break;
			default:
				return res.status(404).json({message:err.message});
				break;
		}
	}

	next();
}
module.exports={verifyToken};