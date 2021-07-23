const { pool } = require('../database.js');
const sc=process.env.SCHEMA?process.env.SCHEMA+'.':'';
/**
 * Class representing Grupo Model.
 *
 * @class
 */
class Grupo {

	/**
	 * 
	 * @returns Array<JSONObject>
	 */
	static async getAll() {
        const query=`SELECT g.id_grupo,g.nombre_grupo,g.id_personal,u.nombres_apellidos AS jefe_grupo FROM ${sc}grupo g INNER JOIN `+
        `${sc}personal_campo p ON g.id_personal=p.id_personal INNER JOIN `+
        `${sc}usuario u ON p.id_usuario=u.id_usuario ORDER BY 1 desc;`;
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
	 * 
	 * @returns Array<JSONObject>
	 */
	static async getPersonalDisponibleByIdgrupo(idGrupo) {
        const query=`SELECT pc.id_personal,u.nombres_apellidos FROM ${sc}personal_campo pc `+
        `INNER JOIN ${sc}usuario u ON pc.id_usuario=u.id_usuario `+
        `WHERE pc.id_personal NOT IN(SELECT gs.id_personal FROM ${sc}grupo_sereno gs WHERE gs.id_grupo=$1)`;
		console.log(query);
		const queryResult = await pool.query(query,[idGrupo]);
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
	 * 
	 * @returns Array<JSONObject>
	 */
	static async getPersonalAsignadoByIdgrupo(idGrupo) {
        const query=`SELECT pc.id_personal,u.nombres_apellidos,g.nombre_grupo FROM ${sc}usuario u `+
        `INNER  JOIN  ${sc}personal_campo pc ON u.id_usuario =pc.id_usuario `+
        `INNER JOIN ${sc}grupo_sereno gs ON pc.id_personal=gs.id_personal `+
        `INNER JOIN ${sc}grupo g ON gs.id_grupo=g.id_grupo WHERE gs.id_grupo=$1`;
		console.log(query);
		const queryResult = await pool.query(query,[idGrupo]);
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
		const query=`SELECT g.id_grupo,g.nombre_grupo,g.id_personal,u.nombres_apellidos AS jefe_grupo FROM ${sc}grupo g INNER JOIN `+
        `${sc}personal_campo p ON g.id_personal=p.id_personal INNER JOIN `+
        `${sc}usuario u ON p.id_usuario=u.id_usuario WHERE g.id_grupo=$1`;
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
	 * @param {JSONObject} grupo
	 * @returns {JSONObject}
	 */
     static async create(grupo) {
		
		const keys = Object.keys(grupo);
		const values = Object.values(grupo);
		let query = `INSERT INTO ${sc}grupo(`;
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
	 * @param {JSONObject} grupo
	 * @returns {JSONObject}
	 */
     static async asignarPersonal(grupo) {
		
		const keys = Object.keys(grupo);
		const values = Object.values(grupo);
		let query = `INSERT INTO ${sc}grupo_sereno(`;
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
	 * @param {JSONObject} grupo 
	 * @param {Number} id 
	 * @returns JSONObject
	 */
	static async update(grupo, id) {
		const keys = Object.keys(grupo);
		const values = Object.values(grupo);
		let query = `UPDATE ${sc}grupo SET `;
		let index = 0;
		keys.forEach(key => {
			query += `${key}=$${index + 1}, `;
			index++;
		})
		query = query.substr(0, query.length - 2);
		query += ` WHERE id_grupo=$${index + 1} RETURNING *;`;
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
		const queryResult = await pool.query(`DELETE from ${sc}grupo WHERE id_grupo =$1`, [id]);
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
	 * 
	 * @param {Number} id 
	 * 
	 */
	static async deletePersonalGrupo(idGrupo,idPersonal) {
		const queryResult = await pool.query(`DELETE from ${sc}grupo_sereno WHERE id_grupo =$1 and id_personal=$2`,
         [idGrupo,idPersonal]);
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


module.exports = Grupo;