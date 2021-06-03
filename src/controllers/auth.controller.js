const UsuarioController= require('./usuario.controller');
const Usuario = require('../models/Usuario');
const PersonalCampo = require('../models/PersonalCampo');
const jwt=require('jsonwebtoken');

/**
 * Class representing Controller.
 *
 * @class
 */
class AuthController{
	/**
	 * @param {object} req HttpRequest Object
	 * @param {object} res HttpResponse Object
	 * @returns {JSONObject}
	 */
	async signIn(req,res){
		try{
			const {usuario,password}=req.body;
			const userFound = await Usuario.getUserByUserName(usuario);
			console.log("CREDENCIALES",usuario,password);
			if(userFound){
				const matchPassword= await Usuario.comparePassword(password,userFound.contrasenia);
				
				if(!matchPassword) return res.status(200).json({code:204,token:null,message:'Usuario o contraseña incorrecto.'});
				const token=jwt.sign({id:userFound.id,usuario:userFound.usuario},process.env.KEY_TOKEN,{expiresIn:3600});
				const refresh_token=jwt.sign({id:userFound.id,usuario:userFound.usuario},process.env.KEY_REFRESH_TOKEN);
				userFound.contrasena=undefined;
				res.status(201).json({code:201,auth_token:token,refresh_token,user:userFound});
			}else{
				res.status(200).json({code:204,token:null,message:'Usuario o contraseña incorrecto.'});
			}
		}catch(err){
			console.error(err);
			res.status(500).json({code:500,message:'Internal Error'});
		}
	}

	/**
	 * @param {object} req HttpRequest Object
	 * @param {object} res HttpResponse Object
	 * @returns {JSONObject}
	 */
	 async signInPersonal(req,res){
		try{
			const {usuario,password}=req.body;
			const userFound = await PersonalCampo.getUserByUserName(usuario);
			console.log(userFound);
			if(userFound){
				const matchPassword= await PersonalCampo.comparePassword(password,userFound.contrasenia);
				
				if(!matchPassword) return res.status(200).json({code:204,token:null,message:'Usuario o contraseña incorrecto.'});
				const token=jwt.sign({id:userFound.id,usuario:userFound.usuario},process.env.KEY_TOKEN,{expiresIn:3600});
				const refresh_token=jwt.sign({id:userFound.id,usuario:userFound.usuario},process.env.KEY_REFRESH_TOKEN);
				userFound.contrasenia=undefined;
				res.status(201).json({code:201,auth_token:token,refresh_token,user:userFound});
			}else{
				res.status(200).json({code:204,token:null,message:'Usuario o contraseña incorrecto.'});
			}
		}catch(err){
			console.error(err);
			res.status(500).json({code:500,message:'Internal Error'});
		}
	}

	/**
	 * @param {object} req HttpRequest Object
	 * @param {object} res HttpResponse Object
	 * @returns {JSONObject}
	 */
	async refreshToken(req,res){
		try{
			const {refresh_token}=req.body;
			const user =jwt.verify(refresh_token ,process.env.KEY_REFRESH_TOKEN);
			if(user){
				const token=jwt.sign({id:user.id,usuario:user.usuario},process.env.KEY_TOKEN,{expiresIn:3600});
				res.status(201).json({code:201,token});
			}else{
				res.status(200).json({code:204,token:null,message:'Usuario o contraseña incorrecto.'});
			}
		}catch(err){
			console.error(err);
			res.status(500).json({code:500,message:'Invalid token'});
		}
	}
}

module.exports=AuthController;