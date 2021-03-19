const bcrypt = require('bcryptjs');
const {pool} = require('../database.js');
/**
 * Class representing Usuario Model.
 *
 * @class
 */
class Usuario{

	/**
	 * @param {string} password string
	 * 
	 */
	static encryptPassword=async (password)=>{
		const salt = await bcrypt.genSalt(10)
		return await bcrypt.hash(password,salt)
	}
	/**
	 * @param {string} password string
	 * @param {string} password2 string
	 * @returns {boolean}
	 */
	static comparePassword=async (password,password2)=>{
		return await bcrypt.compare(password,password2);
	}
	/**
	 * @param {string} id string
	 * @returns {JSONObject}
	 */
	static async getUserById(id){
		const queryResult = await pool.query(`select id, usuario, nombres_apellidos,contrasena, profile_id from v_usuarios where id =$1`,[id]);
		if(queryResult){
			if(queryResult.rows[0]){
				return queryResult.rows[0];
			}else{
				return undefined;
			}
		}else{
			return undefined;
		}
	}

	/**
	 * @param {string} username string
	 * @returns {JSONObject}
	 */
	static async getUserByUserName(userName){
			const queryResult = await pool.query(`select id, usuario, nombres_apellidos,contrasena, profile_id from v_usuarios where usuario =$1`,[userName]);
			if(queryResult){
				const userFound=queryResult.rows[0];
				if(userFound){
					return userFound;
				}else{
					return undefined;
				}
			}else{
				return undefined;
			}
	}
}


module.exports=Usuario;