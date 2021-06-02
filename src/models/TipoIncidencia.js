const bcrypt = require('bcryptjs');
const { pool } = require('../database.js');
const sc=process.env.SCHEMA?process.env.SCHEMA+'.':'';
/**
 * Class representing Incidencia Model.
 *
 * @class
 */
class TipoIncidencia {

	/**
	 * 
	 * @returns Array<JSONObject>
	 */
	static async getAll() {
        const query=`select t.multitabla_id,t.tabla,t.sigla,t.valor,t.padre_id,t.estado,c.valor clasificacion from ${sc}ssc_multitabla t INNER JOIN ${sc}ssc_multitabla c on t.padre_id=c.multitabla_id where t.tabla=$1 and c.tabla=$2  ORDER BY 1;`
		const queryResult = await pool.query(query,['ssc_tipo_inc','ssc_clasificacion_inc']);
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
		const queryResult = await pool.query(`select * from ${sc}ssc_multitabla where multitabla_id =$1`, [id]);
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
		const queryResult = await pool.query(`select * from ${sc}ssc_multitabla where tabla="ssc_tipo_inc" AND valor LIKE $1`, [name]);
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
	 * 
	 * @returns Array<JSONObject>
	 */
	 static async getAllTipoByIdClasificacion(id) {
        const query=`select t.multitabla_id,t.tabla,t.sigla,t.valor,t.padre_id,t.estado,c.valor clasificacion from ${sc}ssc_multitabla t INNER JOIN ${sc}ssc_multitabla c on t.padre_id=c.multitabla_id where t.tabla=$1 and c.tabla=$2 and t.padre_id=$3 ORDER BY 4;`
		const queryResult = await pool.query(query,['ssc_tipo_inc','ssc_clasificacion_inc',id]);
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
	 * @param {JSONObject} tipo
	 * @returns {JSONObject}
	 */
	static async create(tipo){
        const values=Object.values(tipo);
		values.push('ssc_tipo_inc');
		let query = `INSERT INTO ${sc}ssc_multitabla (sigla,valor,padre_id,tabla) VALUES($1,$2,$3,$4) RETURNING *;`;
		console.log(query,"values",values);
		const queryResult = await pool.query(query,values);
		if (queryResult) {
			const result = queryResult.rows[0];
			console.log(result);
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
	 * @param {JSONObject} tipo 
	 * @param {Number} id 
	 * @returns JSONObject
	 */
	static async update(tipo, id) {
		const keys = Object.keys(tipo);
		const values = Object.values(tipo);
		let query = `UPDATE ${sc}ssc_multitabla SET `;
		let index = 0;
		keys.forEach(key => {
			query += `${key}=$${index + 1}, `;
			index++;
		})
		query = query.substr(0, query.length - 2);
		query += ` WHERE multitabla_id=$${index + 1} RETURNING *;`;
		values.push(id);
		
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
		const queryResult = await pool.query(`DELETE from ${sc}ssc_multitabla where multitabla_id =$1 AND tabla ='ssc_tipo_inc'`, [id]);
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


module.exports = TipoIncidencia;