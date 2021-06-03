const bcrypt = require('bcryptjs');
const { pool } = require('../database.js');
const sc=process.env.SCHEMA?process.env.SCHEMA+'.':'';
/**
 * Class representing TipoAccion Model.
 *
 * @class
 */
class TipoAccion {

	/**
	 * 
	 * @returns Array<JSONObject>
	 */
	static async getAll() {
        const query=`select * from ${sc}tipo_accion order by 2`
		console.log(query);
		const queryResult = await pool.query(query,[]);
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
		const query=`select * from ${sc}tipo_accion where id_tipo_accion =$1`;
		console.log(query);
		const queryResult = await pool.query(query, [id]);
		if (queryResult) {
			const result=queryResult.rows[0];
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
	 * @param {JSONObject} tipoAccion
	 * @returns {JSONObject}
	 */
     static async create(tipoAccion) {
		
		const keys = Object.keys(tipoAccion);
		const values = Object.values(tipoAccion);
		let query = `INSERT INTO ${sc}tipo_accion(`;
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
	 * @param {JSONObject} tipoAccion 
	 * @param {Number} id 
	 * @returns JSONObject
	 */
	static async update(tipoAccion, id) {
		const keys = Object.keys(tipoAccion);
		const values = Object.values(tipoAccion);
		let query = `UPDATE ${sc}tipo_accion SET `;
		let index = 0;
		keys.forEach(key => {
			query += `${key}=$${index + 1}, `;
			index++;
		})
		query = query.substr(0, query.length - 2);
		query += ` WHERE id_tipo_accion=$${index + 1} RETURNING *;`;
		values.push(id);
		console.log(query)
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
	 * @param {Number} id 
	 * 
	 */
	static async delete(id) {
		const queryResult = await pool.query(`DELETE from ${sc}tipo_accion where id_tipo_accion =$1`, [id]);
		if (queryResult) {
			const result=queryResult.rows[0];
			if (result) {
				return result;
			} else {
				return undefined;
			}
		} else {
			return undefined;
		}
	}
}


module.exports = TipoAccion;