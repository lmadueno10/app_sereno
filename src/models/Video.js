const { pool } = require('../database.js');
const sc=process.env.SCHEMA?process.env.SCHEMA+'.':'';
/**
 * Class representing Video Model.
 *
 * @class
 */
class Video {

	/**
	 * 
	 * @returns Array<JSONObject>
	 */
	static async getAll(filter) {
        let query=`select v.id_video,v.nombre_video,v.fecha,v.hora,concat(v.fecha,' ',v.hora) fecha_hora,pc.id_personal,u.nombres_apellidos from ${sc}video v inner join ${sc}personal_campo pc on v.id_personal=pc.id_personal `+
                    `inner join ${sc}usuario u on pc.id_usuario=u.id_usuario `;
        let options=[];
        const {fecha_inicial,fecha_final,hora,sereno}=filter
        if(fecha_inicial&&fecha_final&&hora&&sereno){
            query+=`where v.fecha>=$1 and v.fecha<=$2 and v.hora >= $3 and v.id_personal=$4`;
            options=[fecha_inicial,fecha_final,hora,sereno];
        }else if(fecha_inicial&&fecha_final&&hora){
            query+=`where v.fecha>=$1 and v.fecha<=$2 and v.hora >= $3`;
            options=[fecha_inicial,fecha_final,hora];
        }else if(fecha_inicial&&fecha_final&&sereno){
            query+=`where v.fecha>=$1 and v.fecha<=$2 and v.id_personal=$3`;
            options=[fecha_inicial,fecha_final,sereno];
        }else if(fecha_inicial&&fecha_final){
            query+=`where v.fecha>=$1 and v.fecha<=$2`;
            options=[fecha_inicial,fecha_final];
        }
        else if(hora&&sereno){
            query+=`where v.hora>=$1 and v.id_personal=$2`;
            options=[hora,sereno];
        }else if(hora){
            query+=`where v.hora>=$1`;
            options=[hora];
        }else if(sereno){
            query+=`where v.id_personal=$1`;
            options=[sereno];
        }
        query +=` order by 1 desc`;
		console.log(query);
		const queryResult = await pool.query(query,options);
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
		const queryResult = await pool.query(`select v.id_video,v.nombre_video,v.fecha,v.hora,concat(v.fecha,' ',v.hora) fecha_hora,pc.id_personal,u.nombres_apellidos from ${sc}video v `+
        `inner join ${sc}personal_campo pc on v.id_personal=pc.id_personal `+
        `inner join ${sc}usuario u on pc.id_usuario=u.id_usuario where v.id_video=$1`, [id]);
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
	 * @param {JSONObject} Video
	 * @returns {JSONObject}
	 */
     static async create(video) {
		
		const keys = Object.keys(video);
		const values = Object.values(video);
		let query = `INSERT INTO ${sc}video(`;
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
	 * @param {JSONObject} video 
	 * @param {Number} id 
	 * @returns JSONObject
	 */
     static async update(video, id) {

		const keys = Object.keys(video);
		const values = Object.values(video);
		let query = `UPDATE ${sc}video SET `;
		let index = 0;
		keys.forEach(key => {
			query += `${key}=$${index + 1}, `;
			index++;
		})
		query = query.substr(0, query.length - 2);
		query += ` WHERE id_video=$${index + 1} RETURNING *;`;
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
		const queryResult = await pool.query(`DELETE from ${sc}video where id_video =$1`, [id]);
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


module.exports = Video;