if(process.env.NODE_ENV !=='production'){
	require('dotenv').config();
}
const app= require('./app');
const servidor=require('./socket');
module.exports=servidor.listen(app.get('port'),()=>{
	console.log('Servidor en puerto:',app.get('port'));
})