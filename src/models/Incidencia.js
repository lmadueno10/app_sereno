const bcrypt = require('bcryptjs');
const { pool } = require('../database.js');
const sc=process.env.SCHEMA?process.env.SCHEMA+'.':'';
/**
 * Class representing Incidencia Model.
 *
 * @class
 */
class Incidencia {

	/**
	 * 
	 * @returns Array<JSONObject>
	 */
	static async getAll() {
        const query=`SELECT DISTINCT  i.id_incidencia,CONCAT(i.fecha,' ',i.hora) fecha_hora,i.fecha,i.hora,i.id_sereno_asignado,u.nombres_apellidos,i.nombre_ciudadano,i.telefono_ciudadano,
        s.valor clasificacion,s.multitabla_id id_clasificacion , ss.valor tipo,ss.multitabla_id id_tipo,ssc.valor subtipo,ssc.multitabla_id id_subtipo,
		i.interior,i.lote,i.referencia,i.descripcion,i.nro_direccion,i.direccion,i.estado,
		(select e.url_evidencia from ${sc}evidencia e where e.id_incidencia=i.id_incidencia and e.tipo='video') video,
		(select e.url_evidencia from ${sc}evidencia e where e.id_incidencia=i.id_incidencia and e.tipo='audio') audio,
		(select e.url_evidencia from ${sc}evidencia e where e.id_incidencia=i.id_incidencia and e.tipo='image') image,
		ai.ev_video,ai.ev_audio,ai.ev_image,ai.descripcion a_descripcion
          FROM ${sc}incidencia i 
        INNER JOIN ${sc}ssc_multitabla s ON i.id_clasificacion = s.multitabla_id 
        INNER JOIN ${sc}ssc_multitabla ss ON i.id_tipo = ss.multitabla_id 
        INNER JOIN ${sc}ssc_multitabla ssc ON i.id_subtipo = ssc.multitabla_id 
        LEFT JOIN ${sc}personal_campo p ON p.id_personal = i.id_sereno_asignado 
        LEFT JOIN ${sc}usuario u ON u.id_usuario = p.id_usuario `+
		`LEFT JOIN ${sc}accion_incidencia ai ON i.id_incidencia=ai.id_incidencia `+
		//LEFT JOIN evidencia e ON i.id_incidencia=e.id_incidencia
		`WHERE s.tabla='ssc_clasificacion_inc' AND ss.tabla='ssc_tipo_inc' AND ssc.tabla='ssc_subtipo_inc'
		ORDER BY 1 DESC;`
		const q2=`select * from ${sc}incidencia`;
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
		const queryResult = await pool.query(`select * from ${sc}Incidencia where id_incidencia =$1`, [id]);
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
		const queryResult = await pool.query(`select * from ${sc}Incidencia where nombre_ciudadano LIKE $1`, [name]);
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
	 * @param {Number} id Number
	 * @returns {JSONObject}
	 */
	 static async getIncidentByIdPersonalAsignado(id) {
		const query=`SELECT DISTINCT  i.id_incidencia,CONCAT(i.fecha,' ',i.hora) fecha_hora,i.fecha,i.hora,i.id_sereno_asignado,u.nombres_apellidos,i.nombre_ciudadano,i.telefono_ciudadano,
        s.valor clasificacion,s.multitabla_id id_clasificacion , ss.valor tipo,ss.multitabla_id id_tipo,ssc.valor subtipo,ssc.multitabla_id id_subtipo,
		i.interior,i.lote,i.referencia,i.descripcion,i.nro_direccion,i.direccion,i.estado,
		i.id_usuario_rep,
		(select e.url_evidencia from ${sc}evidencia e where e.id_incidencia=i.id_incidencia and e.tipo='video') video,
		(select e.url_evidencia from ${sc}evidencia e where e.id_incidencia=i.id_incidencia and e.tipo='audio') audio,
		(select e.url_evidencia from ${sc}evidencia e where e.id_incidencia=i.id_incidencia and e.tipo='image') image
          FROM ${sc}incidencia i 
        INNER JOIN ${sc}ssc_multitabla s ON i.id_clasificacion = s.multitabla_id 
        INNER JOIN ${sc}ssc_multitabla ss ON i.id_tipo = ss.multitabla_id 
        INNER JOIN ${sc}ssc_multitabla ssc ON i.id_subtipo = ssc.multitabla_id 
        INNER JOIN ${sc}personal_campo p ON p.id_personal = i.id_sereno_asignado 
        INNER JOIN ${sc}usuario u ON u.id_usuario = p.id_usuario `+
		//LEFT JOIN evidencia e ON i.id_incidencia=e.id_incidencia
		`WHERE s.tabla='ssc_clasificacion_inc' AND ss.tabla='ssc_tipo_inc' AND ssc.tabla='ssc_subtipo_inc'
		AND i.id_sereno_asignado =$1 AND i.estado=1 AND i.id_usuario_rep<>$1 
		ORDER BY 1 DESC;`
		const queryResult = await pool.query(query, [id]);
		if (queryResult) {
			const result = queryResult.rows;
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
	 static async getIncidentByIdUserReporter(id) {
		const query=`SELECT DISTINCT  i.id_incidencia,CONCAT(i.fecha,' ',i.hora) fecha_hora,i.fecha,i.hora,i.id_sereno_asignado,u.nombres_apellidos,i.nombre_ciudadano,i.telefono_ciudadano,
        s.valor clasificacion,s.multitabla_id id_clasificacion , ss.valor tipo,ss.multitabla_id id_tipo,ssc.valor subtipo,ssc.multitabla_id id_subtipo,
		i.interior,i.lote,i.referencia,i.descripcion,i.nro_direccion,i.direccion,i.estado,
		i.id_usuario_rep,
		(select e.url_evidencia from ${sc}evidencia e where e.id_incidencia=i.id_incidencia and e.tipo='video') video,
		(select e.url_evidencia from ${sc}evidencia e where e.id_incidencia=i.id_incidencia and e.tipo='audio') audio,
		(select e.url_evidencia from ${sc}evidencia e where e.id_incidencia=i.id_incidencia and e.tipo='image') image
          FROM ${sc}incidencia i 
        INNER JOIN ${sc}ssc_multitabla s ON i.id_clasificacion = s.multitabla_id 
        INNER JOIN ${sc}ssc_multitabla ss ON i.id_tipo = ss.multitabla_id 
        INNER JOIN ${sc}ssc_multitabla ssc ON i.id_subtipo = ssc.multitabla_id 
        LEFT JOIN ${sc}personal_campo p ON p.id_personal = i.id_sereno_asignado 
        LEFT JOIN ${sc}usuario u ON u.id_usuario = p.id_usuario `+
		`WHERE s.tabla='ssc_clasificacion_inc' AND ss.tabla='ssc_tipo_inc' AND ssc.tabla='ssc_subtipo_inc'
		AND i.id_usuario_rep =$1 AND i.estado=1
		ORDER BY 1 DESC;`
		const queryResult = await pool.query(query, [id]);
		if (queryResult) {
			const result = queryResult.rows;
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
	 static async getCountIncidenciasByIdSerenoAsignado(id) {
		const query=`SELECT count(*) FROM ${sc}incidencia i `+
		`WHERE i.id_sereno_asignado =$1 AND i.estado=1 AND  i.id_usuario_rep<>$1;`;
		const queryResult = await pool.query(query, [id]);
		if (queryResult) {
			const result = queryResult.rows;
			if (result) {
				return result[0];
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
		 static async getCountIncidenciasByIdUsuarioRep(id) {
			const query=`SELECT count(*) FROM ${sc}incidencia i `+
			`WHERE i.id_usuario_rep =$1 AND i.estado=1;`;
			const queryResult = await pool.query(query, [id]);
			if (queryResult) {
				const result = queryResult.rows;
				if (result) {
					return result[0];
				} else {
					return undefined;
				}
			} else {
				return undefined;
			}
		}

	/**
	 * @param {JSONObject} incidencia
	 * @returns {JSONObject}
	 */
	static async create(incidencia) {
		const keys = Object.keys(incidencia);
		const values = Object.values(incidencia);
		let query = `INSERT INTO ${sc}incidencia(`;
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
	 * @param {JSONObject} incidencia 
	 * @param {Number} id 
	 * @returns JSONObject
	 */
	static async update(incidencia, id) {
		const keys = Object.keys(incidencia);
		const values = Object.values(incidencia);
		let query = `UPDATE ${sc}incidencia SET `;
		let index = 0;
		keys.forEach(key => {
			query += `${key}=$${index + 1}, `;
			index++;
		})
		query = query.substr(0, query.length - 2);
		query += ` WHERE id_incidencia=$${index + 1} RETURNING *;`;
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
		const queryResult = await pool.query(`DELETE from ${sc}Incidencia where id_Incidencia =$1`, [id]);
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


module.exports = Incidencia;