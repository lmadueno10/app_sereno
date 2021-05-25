const bcrypt = require('bcryptjs');
const { pool } = require('../database.js');
/**
 * Class representing ClasificacionIncidencia Model.
 *
 * @class
 */
class ClasificacionIncidencia {

	/**
	 * 
	 * @returns Array<JSONObject>
	 */
	static async getAll() {
        const query=`select * from ssc_multitabla where tabla=$1;`
		const queryResult = await pool.query(query,['ssc_clasificacion_inc']);
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
		const queryResult = await pool.query(`select * from ssc_multitabla where multitabla_id =$1`, [id]);
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
	 * @param {string} name string
	 * @returns {JSONObject}
	 */
	static async getIncidentByReporterName(name) {
        name+='%';
		const queryResult = await pool.query(`select * from ssc_multitabla where valor LIKE $1`, [name]);
		if (queryResult) {
			const result = queryResult.rows[0];
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
	 * @param {JSONObject} clasificacion
	 * @returns {JSONObject}
	 */
	static async create(clasificacion){
        const values=Object.values(clasificacion);
		values.push('ssc_clasificacion_inc');
		console.log(values);
		let query = 'INSERT INTO "ssc_multitabla"  ("sigla","valor","tabla","padre_id") VALUES ($1,$2,$3,0) RETURNING *;';
		console.log(query)
		const queryResult = await pool.query(query,values);
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
	 * @param {JSONObject} clasificacion 
	 * @param {Number} id 
	 * @returns JSONObject
	 */
	static async update(clasificacion, id) {
		const keys = Object.keys(clasificacion);
		const values = Object.values(clasificacion);
		let query = 'UPDATE ssc_multitabla SET ';
		let index = 0;
		keys.forEach(key => {
			query += `${key}=$${index + 1}, `;
			index++;
		})
		query = query.substr(0, query.length - 2);
		query += ` WHERE multitabla_id=$${index + 1} RETURNING *;`;
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
		const queryResult = await pool.query(`DELETE from ssc_multitabla where multitabla_id =$1`, [id]);
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


module.exports = ClasificacionIncidencia;