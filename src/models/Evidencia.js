const { pool } = require('../database.js');
/**
 * Class representing Evidencia Model.
 *
 * @class
 */
class Evidencia {

	/**
	 * 
	 * @returns Array<JSONObject>
	 */
	static async getAll() {
        const query=`select * from evidencia`
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
		const queryResult = await pool.query(`select * from evidencia where id_evidencia =$1`, [id]);
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
	 * @param {Number} id Number
	 * @returns {JSONObject}
	 */
	static async getEvidenciasByIdIncidencia(id) {
		const queryResult = await pool.query(`select * from evidencia where id_incidencia = $1`, [id]);
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
	 * @param {JSONObject} Evidencia
	 * @returns {JSONObject}
	 */
     static async create(evidencia) {
		
		const keys = Object.keys(evidencia);
		const values = Object.values(evidencia);
		let query = 'INSERT INTO evidencia(';
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
	 * @param {JSONObject} Evidencia 
	 * @param {Number} id 
	 * @returns JSONObject
	 */
     static async update(evidencia, id) {

		const keys = Object.keys(evidencia);
		const values = Object.values(evidencia);
		let query = 'UPDATE evidencia SET ';
		let index = 0;
		keys.forEach(key => {
			query += `${key}=$${index + 1}, `;
			index++;
		})
		query = query.substr(0, query.length - 2);
		query += ` WHERE id_evidencia=$${index + 1} RETURNING *;`;
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
		const queryResult = await pool.query(`DELETE from evidencia where id_evidencia =$1`, [id]);
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


module.exports = Evidencia;