const {Pool} = require('pg');

const pool = new Pool({
	host:(process.env.HOST_DB||"localhost"),
	user:(process.env.USER_DB||"postgres"),
	password:(process.env.PASSWORD_DB||"admin"),
	database:(process.env.DATABASE||'colaboraccion'),
	port:(process.env.PORT_DB||"5432")
});

module.exports={pool};