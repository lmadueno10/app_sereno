const { pool } = require('../database.js');
const Incidencia=require('./Incidencia');
const sc=process.env.SCHEMA?process.env.SCHEMA+'.':'';
/**
 * Class representing AccionIncidencia Model.
 *
 * @class
 */
class AccionIncidencia {

	/**
	 * 
	 * @returns Array<JSONObject>
	 */
	static async getAll() {
        const query=`select * from ${sc}accion_incidencia`
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
	 * @param {string} id Number
	 * @returns {JSONObject}
	 */
	static async getById(id) {
		const queryResult = await pool.query(`select * from ${sc}accion_incidencia where id_tipo_accion =$1`, [id]);
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
	 * @param {JSONObject} AccionIncidencia
	 * @returns {JSONObject}
	 */
     static async create(accionIncidencia) {
		
		const keys = Object.keys(accionIncidencia);
		const values = Object.values(accionIncidencia);
		let query = `INSERT INTO ${sc}accion_incidencia(`;
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
			const u= Incidencia.update({estado:2},accionIncidencia.id_incidencia);
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
	 * @param {JSONObject} accionIncidencia 
	 * @param {Number} id 
	 * @returns JSONObject
	 */
	static async update(accionIncidencia, id) {
		const keys = Object.keys(accionIncidencia);
		const values = Object.values(accionIncidencia);
		let query = `UPDATE ${sc}accion_incidencia SET `;
		let index = 0;
		keys.forEach(key => {
			query += `${key}=$${index + 1}, `;
			index++;
		})
		query = query.substr(0, query.length - 2);
		query += ` WHERE id_accion_incidencia=$${index + 1} RETURNING *;`;
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
		const queryResult = await pool.query(`DELETE from ${sc}tipo_accion where id_accion_incidencia =$1`, [id]);
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


module.exports = AccionIncidencia;