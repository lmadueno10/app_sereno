const {Pool} = require('pg');
/**
 * Pool Object
 * @type {{host: string,user: string,password: string,database: string,port: number}}
 */
const pool = new Pool({
	host:(process.env.HOST_DB),
	user:(process.env.USER_DB),
	password:(process.env.PASSWORD_DB),
	database:(process.env.DATABASE),
	port:(process.env.PORT_DB)
});

module.exports={pool};