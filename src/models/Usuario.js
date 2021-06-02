const bcrypt = require('bcryptjs');
const { pool } = require('../database.js');
const sc=process.env.SCHEMA?process.env.SCHEMA+'.':'';
/**
 * Class representing Usuario Model.
 *
 * @class
 */
class Usuario {

	/**
	 * @param {string} password string
	 * 
	 */
	static encryptPassword = async (password) => {
		const salt = await bcrypt.genSalt(10)
		return await bcrypt.hash(password, salt)
	}
	/**
	 * @param {string} password string
	 * @param {string} password2 string
	 * @returns {boolean}
	 */
	static comparePassword = async (password, password2) => {
		return await bcrypt.compare(password, password2);
	}
	/**
	 * 
	 * @returns Array<JSONObject>
	 */
	static async getAll() {
		const queryResult = await pool.query(`select u.id_usuario,u.nombres_apellidos,u.dni,u.celular,u.codigo,u.id_supervisor,u.sector,u.usuario,u.estado from ${sc}usuario u 
		left join ${sc}personal_campo p on u.id_usuario=p.id_usuario where id_personal is null;`,[]);
		if (queryResult) {
			const result=queryResult.rows;
			if (result) {
				return result;
			} else {
				return undefined;
			}
		} else {
			return undefined;
		}
	}

	/**
	 * @param {string} id string
	 * @returns {JSONObject}
	 */
	static async getById(id) {
		const queryResult = await pool.query(`select * from ${sc}usuario where id_usuario =$1`, [id]);
		if (queryResult) {
			const result=queryResult.rows[0];
			if (result) {
				result.contrasenia=undefined;
				return result;
			} else {
				return undefined;
			}
		} else {
			return undefined;
		}
	}

	/**
	 * @param {string} username string
	 * @returns {JSONObject}
	 */
	static async getUserByUserName(userName) {
		const queryResult = await pool.query(`select * from ${sc}usuario where usuario =$1`, [userName]);
		if (queryResult) {
			const userFound = queryResult.rows[0];
			if (userFound) {
				return userFound;
			} else {
				return undefined;
			}
		} else {
			return undefined;
		}
	}

	/**
	 * @param {JSONObject} usuario
	 * @returns {JSONObject}
	 */
	static async create(usuario) {
		usuario.contrasenia = await this.encryptPassword(usuario.contrasenia);
		const keys = Object.keys(usuario);
		const values = Object.values(usuario);
		let query = `INSERT INTO ${sc}usuario(`;
		let queryValues = '';
		let index = 0;
		keys.forEach(key => {
			query += `${key},`;
			queryValues += `$${index + 1},`;
			index++;
		})
		query = query.substr(0, query.length - 1);
		queryValues = queryValues.substr(0, queryValues.length - 1);
		query += `) values(${queryValues}) RETURNING *;`;
		console.log(query);
		const queryResult = await pool.query(query, values);
		if (queryResult) {
			const result = queryResult.rows[0];
			if (result) {
				return { data: result };
			} else {
				return { data: undefined, message: 'No data retruned' };
			}
		} else {
			return { data: undefined, message: 'No data returned' };
		}
	}

	/**
	 * 
	 * @param {JSONObject} usuario 
	 * @param {Number} id 
	 * @returns JSONObject
	 */
	static async update(usuario, id) {
		
		if (usuario.contrasenia) {
			usuario.contrasenia = await this.encryptPassword(usuario.contrasenia);
		}
		const keys = Object.keys(usuario);
		const values = Object.values(usuario);
		let query = `UPDATE ${sc}usuario SET `;
		let index = 0;
		keys.forEach(key => {
			query += `${key}=$${index + 1}, `;
			index++;
		})
		query = query.substr(0, query.length - 2);
		query += ` WHERE id_usuario=$${index + 1} RETURNING *;`;
		values.push(id);
		
		const queryResult = await pool.query(query, values);
		if (queryResult) {
			const result = queryResult.rows[0];
			if (result) {
				result.contrasenia=undefined;
				return { data: result };
			} else {
				return { data: undefined, message: 'No data retruned' };
			}
		} else {
			return { data: undefined, message: 'No data returned' };
		}
	}
	/**
	 * 
	 * @param {Number} id 
	 * 
	 */
	static async delete(id) {
		const queryResult = await pool.query(`DELETE from ${sc}usuario where id_usuario =$1`, [id]);
		if (queryResult) {
			const result=queryResult.rows[0];
			if (result) {
				result.contrasenia=undefined;
				return result;
			} else {
				return undefined;
			}
		} else {
			return undefined;
		}
	}
}


module.exports = Usuario;