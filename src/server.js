if(process.env.NODE_ENV !=='production'){
	require('dotenv').config();
}

const app= require('./app');

app.set('port',process.env.PORT||3000);

module.exports=app.listen(app.get('port'),()=>{
	console.log('Servidor en puerto:',app.get('port'));
})