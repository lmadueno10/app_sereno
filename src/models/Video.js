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
		const {fecha_inicial,fecha_final,hora,sereno,inc,vid,evi}=filter
		let query=`select v.id_video,v.nombre_video,v.fecha,v.hora,concat(v.fecha,' ',v.hora) fecha_hora,pc.id_personal,u.nombres_apellidos,'Streaming' source from ${sc}video v `+
			`inner join ${sc}personal_campo pc on v.id_personal=pc.id_personal `+
			`inner join ${sc}usuario u on pc.id_usuario=u.id_usuario `;
		let query1=`select null, url_evidencia nombre_video, i.fecha fecha,i.hora hora,concat(i.fecha,' ',i.hora) fecha_hora,i.id_sereno_asignado id_personal, u.nombres_apellidos nombres_apellidos, 'Incidencia' source `+
			`from ${sc}evidencia e `+
			`inner join ${sc}incidencia i on e.id_incidencia=i.id_incidencia `+
			`inner join ${sc}personal_campo p on i.id_sereno_asignado=p.id_personal `+
			`inner join ${sc}usuario u on p.id_usuario=u.id_usuario `+
			`where e.tipo='video' `;
		let query2=`select null, ai.ev_video nombre_video,ai.fecha,ai.hora,concat(ai.fecha,' ',ai.hora) fecha_hora,i.id_sereno_asignado id_personal,u.nombres_apellidos nombres_apellidos,'Cierre caso' source from ${sc}accion_incidencia ai `+
			`inner join ${sc}incidencia i on ai.id_incidencia=i.id_incidencia `+
			`inner join ${sc}personal_campo p on i.id_sereno_asignado=p.id_personal `+
			`inner join ${sc}usuario u on p.id_usuario=u.id_usuario `+
			`where ev_video is not null`;

		let options=[];

		
        //let query=`select v.id_video,v.nombre_video,v.fecha,v.hora,concat(v.fecha,' ',v.hora) fecha_hora,pc.id_personal,u.nombres_apellidos,'Streaming' source from ${sc}video v inner join ${sc}personal_campo pc on v.id_personal=pc.id_personal `+
		//`inner join ${sc}usuario u on pc.id_usuario=u.id_usuario `;
        if(fecha_inicial&&fecha_final&&hora&&sereno){
			query+=`where v.fecha>=$1 and v.fecha<=$2 and v.hora >= $3 and v.id_personal=$4`;
			query1+=` and i.fecha>=$1 and i.fecha<=$2 and i.hora >= $3 and p.id_personal=$4`;
			query2+=` and ai.fecha>=$1 and ai.fecha<=$2 and ai.hora>=$3 and i.id_sereno_asignado=$4`;
            options=[fecha_inicial,fecha_final,hora,sereno];
        }else if(fecha_inicial&&fecha_final&&hora){
			query+=`where v.fecha>=$1 and v.fecha<=$2 and v.hora >= $3`;
			query1+=` and i.fecha>=$1 and i.fecha<=$2 and i.hora >= $3`;
			query2+=` and ai.fecha>=$1 and ai.fecha<=$2 and ai.hora>=$3`;
            options=[fecha_inicial,fecha_final,hora];
        }else if(fecha_inicial&&fecha_final&&sereno){
			query+=`where v.fecha>=$1 and v.fecha<=$2 and v.id_personal=$3`;
			query1+=` and i.fecha>=$1 and i.fecha<=$2 and p.id_personal=$3`;
			query2+=` and ai.fecha>=$1 and ai.fecha<=$2 and i.id_sereno_asignado=$3`;
            options=[fecha_inicial,fecha_final,sereno];
        }else if(fecha_inicial&&fecha_final){
			query+=`where v.fecha>=$1 and v.fecha<=$2`;
			query1+=` and i.fecha>=$1 and i.fecha<=$2`;
			query2+=` and ai.fecha>=$1 and ai.fecha<=$2`;
            options=[fecha_inicial,fecha_final];
        }
        else if(hora&&sereno){
			query+=`where v.hora>=$1 and v.id_personal=$2`;
			query1+=` and i.hora >= $1 and p.id_personal=$2`;
			query2+=` and ai.hora>=$1 and i.id_sereno_asignado=$2`;
            options=[hora,sereno];
        }else if(hora){
			query+=`where v.hora>=$1`;
			query1+=` and i.hora >= $1`;
			query2+=` and ai.hora>=$1`;
            options=[hora];
        }else if(sereno){
			query+=`where v.id_personal=$1`;
			query1+=` and p.id_personal=$1`;
			query2+=` and i.id_sereno_asignado=$1`;
            options=[sereno];
        } 
		let finalQuery='';
		if(inc&&vid&&evi){
			finalQuery=`${query} union(${query1}) union(${query2}) `;
		}else if(inc&&vid){
			finalQuery=`${query} union(${query1}) `;
		}else if(inc&&evi){
			finalQuery =`${query1} union(${query2}) `;
		}else if(vid&&evi){
			finalQuery=`${query} union(${query2})`;
		}else if(inc){
			finalQuery=query1;
		}else if(vid){
			finalQuery=query;
			
		}else if(evi){
			finalQuery=query2;
		}else{
			return undefined;
		}
		
        finalQuery +=` order by 3 desc, 4 desc`;
		console.log(finalQuery);
		const queryResult = await pool.query(finalQuery,options);
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